import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function Map({navigation}) {
  // HTML com Leaflet.js
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mapa de Sensores</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          height: 100vh; 
          width: 100vw; 
        }
        #map { 
          height: 100%; 
          width: 100%; 
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Inicializar o mapa
        var map = L.map('map').setView([-23.5505, -46.6333], 13);
        
        // Adicionar camada de tiles do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Exemplo de marcador (você pode adicionar mais conforme necessário)
        var marker = L.marker([-23.5505, -46.6333]).addTo(map);
        marker.bindPopup("<b>Sensor 1</b><br>Localização: São Paulo, SP").openPopup();
        
        // Função para comunicação com React Native
        function sendToReactNative(data) {
          window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }
        
        // Exemplo de evento de clique no mapa
        map.on('click', function(e) {
          sendToReactNative({
            type: 'mapClick',
            lat: e.latlng.lat,
            lng: e.latlng.lng
          });
        });
      </script>
    </body>
    </html>
  `;

  // Função para lidar com mensagens da WebView
  const onMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('Mensagem do mapa:', data);
      
      // Aqui você pode adicionar lógica para lidar com eventos do mapa
      if (data.type === 'mapClick') {
        console.log('Clique no mapa:', data.lat, data.lng);
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Mapa de Sensores</Text>
      </View>
      
      <WebView
        style={styles.map}
        source={{ html: leafletHTML }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        mixedContentMode="compatibility"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  nav: {
    backgroundColor: '#111111',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  navTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
});
