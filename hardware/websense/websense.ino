#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include <Wire.h>
#include <Adafruit_AMG88xx.h>
#include <AHTxx.h>

const char* ssid = "iruMobil";
const char* password = "hexit564";

// SENSOR STUFF START
Adafruit_AMG88xx amg;
AHTxx aht20;

const int ledPin = 2;
float ahtTemp = 1;
float ahtHum = 0;
float thermopixels[AMG88xx_PIXEL_ARRAY_SIZE];

void TCA9548A(uint8_t bus){
  Wire.beginTransmission(0x70); // Address for multiplexer
  Wire.write(1 << bus);
  Wire.endTransmission();
  Serial.print(bus);
}

// SENSOR STUFF END

//SERVER STUFF START

// Creates a server on port 80 with prefix ws
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html>
    <head>
        <title>Sparcq Websense</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/png" href="favicon.png">
        <style>
            html {
                font-family: Arial, Helvetica, sans-serif;
                display: inline-block;
                text-align: center;
            }
            h1 {
                font-size: 1.8rem;
                color: white;
            }
            .topnav {
                overflow: hidden;
                background-color: #280a0a;
            }
            body {
                margin: 0;
            }
            .content {
                padding: 50px;
            }
            .card-grid {
                max-width: 800px;
                margin: 0 auto;
                display: grid;
                grid-gap: 2rem;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
            .card {
                background-color: white;
                box-shadow: 2px 2px 12px 1px rgba(140,140,140,.5);
            }
            .card-title {
                font-size: 1.2rem;
                font-weight: bold;
                color: #034078
            }
            .reading {
                font-size: 1.2rem;
                color: #1282A2;
            }
        </style>
    </head>
    <body>
        <div class="topnav">
            <h1>SPARCQ Websense - Websocket Sensors</h1>
        </div>
        <div class="content">
            <div class="card-grid">
                <div class="card">
                    <p class="card-title"><i class="fas fa-thermometer-threequarters" style="color:#059e8a;"></i> Temperature</p>
                    <p class="reading"><span id="temperature">%TEMPERATURE%</span> &deg;C</p>
                </div>
                <div class="card">
                    <p class="card-title">Humidity</p>
                    <p class="reading"><span id="humidity">%HUMIDITY%</span> &percnt;</p>
                </div>
                <p>Connection: <span id="connection-status">Disconnected</span></p>
                <p><button id="button" class="button">Update</button></p>
            </div>
        </div>
        <script>
            var gateway = `ws://${window.location.hostname}/ws`;
            var websocket;
            window.addEventListener('load', onLoad);
            function initWebSocket() {
                console.log('Trying to open a WebSocket connection...');
                websocket = new WebSocket(gateway);
                websocket.onopen = onOpen;
                websocket.onclose = onClose;
                websocket.onmessage = onMessage; 
            }
            function onOpen(event) {
                console.log('Connection opened');
                document.getElementById('connection-status').textContent = 'Connected';
            }
            function onClose(event) {
                console.log('Connection closed');
                document.getElementById('connection-status').textContent = 'Disconnected';
                setTimeout(initWebSocket, 2000);
            }
            function onMessage(event) {
                const data = JSON.parse(event.data);
                
                // Update sensor readings
                document.getElementById('temperature').innerHTML = data.temp.toFixed(2);
                document.getElementById('humidity').innerHTML = data.hum.toFixed(2);
            }
            function onLoad(event) {
                initWebSocket();
                initButton();
            }
            function initButton() {
                document.getElementById('button').addEventListener('click', toggle);
            }
            function toggle(){
                websocket.send('toggle');
            }
        </script>
    </body>
</html>
)rawliteral";

void notifyClients() {
  String json;
  json.reserve(64); // Pre-allocate memory to prevent fragmentation
  
  json = "{";
  json += "\"temp\":";
  
  if (ahtTemp != AHTXX_ERROR) {
    json += String(ahtTemp, 2); // 2 decimal places
  } else {
    json += "null";
  }
  
  json += ",\"hum\":";
  
  if (ahtHum != AHTXX_ERROR) {
    json += String(ahtHum, 2); // 2 decimal places
  } else {
    json += "null";
  }
  
  json += "}";
  
  ws.textAll(json);
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    if (strcmp((char*)data, "toggle") == 0) {
      digitalWrite(ledPin, HIGH);
      delay(500); // Not good practice; to be removed.
      digitalWrite(ledPin, LOW);
      TCA9548A(2);
      ahtTemp = aht20.readTemperature();
      delay(1200);
      ahtHum = aht20.readHumidity();
      TCA9548A(3);
      float pixels[AMG88xx_PIXEL_ARRAY_SIZE];
      amg.readPixels(pixels);
      ret = "[";
      for(int i = 0; i < AMG88xx_PIXEL_ARRAY_SIZE; i++) {
        if( i % 8 == 0 ) ret += "\r\n";
        ret += pixels[i];
        if (i != AMG88xx_PIXEL_ARRAY_SIZE - 1) ret += ", ";
      }
      ret += "\r\n]\r\n";
      thermopixels = ret;
      Serial.println("Sensor read");
      notifyClients();
    }
  }
}

void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type,
             void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

String processor(const String& var){
  // Serial.println("Response:");
  // Serial.println(var);
  // if(var == "STATE"){
  //   if (ledState){
  //     return "ON";
  //   }
  //   else{
  //     return "OFF";
  //   }
  // }
  return String();
}
// SERVER STUFF END

void setup(){
  Serial.begin(115200);
  Wire.begin();
  // SENSOR STUFF START
  TCA9548A(2);
  if (!aht20.begin(0x38)) {
    Serial.println("Could not find a valid aht21 sensor on bus 2, check wiring!");
    while(1); //Halt program
  }
  TCA9548A(3);
  if (!amg.begin(0x69)) {
    Serial.println("Could not find a valid AMG8833 sensor on bus 3, check wiring!");
    //while(1) //Halt program
  }
  // SENSOR STUFF END
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, LOW);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println(WiFi.localIP());
  initWebSocket();
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", index_html, processor);
  });
  server.begin();
}

void loop() {
  ws.cleanupClients();
}
