# Implementação do Leaflet.js no React Native

## Sobre a Implementação

Esta implementação usa `react-native-webview` para renderizar um mapa Leaflet.js dentro do React Native. O Leaflet.js é uma biblioteca JavaScript de código aberto para mapas interativos.

## Características

- ✅ Mapa interativo com Leaflet.js
- ✅ Suporte a marcadores
- ✅ Comunicação bidirecional entre WebView e React Native
- ✅ Eventos de clique no mapa
- ✅ Tiles do OpenStreetMap

## Como Funciona

1. **WebView**: Renderiza uma página HTML com Leaflet.js
2. **Comunicação**: Usa `postMessage` para comunicação entre WebView e React Native
3. **Eventos**: Captura eventos do mapa e os envia para o React Native

## Funcionalidades Implementadas

### Mapa Básico
- Visualização do mapa centrada em São Paulo (-23.5505, -46.6333)
- Zoom inicial de 13
- Tiles do OpenStreetMap

### Marcadores
- Exemplo de marcador na posição inicial
- Popup com informações do sensor

### Eventos
- Clique no mapa (retorna latitude e longitude)
- Comunicação via `postMessage`

## Como Adicionar Mais Funcionalidades

### Adicionar Marcadores Dinamicamente

```javascript
// No JavaScript do HTML
function addMarker(lat, lng, title, description) {
  var marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(`<b>${title}</b><br>${description}`);
}
```

### Adicionar Polígonos

```javascript
// Exemplo de polígono
var polygon = L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047]
]).addTo(map);
```

### Adicionar Círculos

```javascript
// Exemplo de círculo
var circle = L.circle([51.508, -0.11], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);
```

## Comunicação com React Native

### Enviar dados do mapa para React Native

```javascript
// No JavaScript do HTML
window.ReactNativeWebView.postMessage(JSON.stringify({
  type: 'markerClick',
  id: 'sensor1',
  data: { lat: -23.5505, lng: -46.6333 }
}));
```

### Receber dados no React Native

```javascript
// No componente React Native
const onMessage = (event) => {
  const data = JSON.parse(event.nativeEvent.data);
  
  switch(data.type) {
    case 'markerClick':
      console.log('Marcador clicado:', data.id);
      break;
    case 'mapClick':
      console.log('Mapa clicado:', data.lat, data.lng);
      break;
  }
};
```

## Dependências

- `react-native-webview`: Para renderizar o HTML com Leaflet.js
- Leaflet.js: Carregado via CDN (https://unpkg.com/leaflet@1.9.4/)

## Instalação

```bash
npm install react-native-webview
```

## Vantagens do Leaflet.js

1. **Gratuito**: Não requer chaves de API
2. **Flexível**: Altamente customizável
3. **Leve**: Biblioteca pequena e rápida
4. **Comunidade**: Grande comunidade e documentação
5. **Plugins**: Muitos plugins disponíveis

## Limitações

1. **Performance**: WebView pode ser mais lenta que componentes nativos
2. **Offline**: Requer conexão para carregar tiles (pode ser resolvido com tiles offline)
3. **Interação**: Algumas interações podem ser limitadas pela WebView

## Próximos Passos

1. Adicionar mais marcadores de sensores
2. Implementar busca de localização
3. Adicionar diferentes tipos de camadas de mapa
4. Implementar funcionalidades offline
5. Adicionar clustering de marcadores 