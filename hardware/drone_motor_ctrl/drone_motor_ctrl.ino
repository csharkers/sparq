#define in1 23
#define in2 22
#define in3 21
#define in4 19

const int pwmChannelA = 0;
const int pwmChannelB = 1;

const int freq = 30000;
const int resolution = 8;
int dutyCycle = 200;

void setup() {
  Serial.begin(115200);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

  digitalWrite(in2, LOW);
  digitalWrite(in4, LOW);

  delay(6000);
  ledcSetup(pwmChannelA, freq, resolution);
  ledcSetup(pwmChannelB, freq, resolution);
  ledcAttachPin(in1, pwmChannelA);
  //ledcAttachPin(in3, pwmChannelB);
}

void loop() {
  delay(2000);
  Serial.println("Running");
  ledcWrite(pwmChannelA, dutyCycle);
  //ledcWrite(pwmChannelB, dutyCycle);
  delay(600);
  ledcWrite(pwmChannelA, 0);
  //ledcWrite(pwmChannelB, 0);
  Serial.println("halt");
}
