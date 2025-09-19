// Configuração do mapa (centralizado no Parque Estadual Carlos Botelho - SP)
const map = L.map('map').setView([-24.0130, -47.9133], 14.4);

// Mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Coordenadas centrais do Parque Estadual Carlos Botelho (SP)
const parkCoords = [-24.0130, -47.9133];

// Adiciona um polígono (contorno do parque) - simulado
const parkArea = L.polygon([
    [-24.005, -47.900],
    [-24.020, -47.905],
    [-24.025, -47.925],
    [-24.010, -47.930],
    [-23.995, -47.920]
], { 
    color: "blue", 
    fillOpacity: 0.1 
}).addTo(map);

// Adiciona um popup ao clicar no parque
parkArea.bindPopup(`
    <b>Parque Estadual Carlos Botelho</b><br>
    <small>Sete Barras - SP, Brasil</small><br>
    Unidade de conservação com rica biodiversidade e trilhas.
`);

// Círculos dentro do parque (representando zonas diferentes)
const zones = [
    { coords: [-24.0130, -47.9133], color: "green",  label: "Sensor 1 - Central" }, // Central
    { coords: [-24.0110, -47.9260], color: "yellow", label: "Sensor 2 - Oeste" },  // Oeste
    { coords: [-24.0220, -47.9153], color: "red",    label: "Sensor 3 - Sul" }     // Sul
];

// Adiciona os círculos ao mapa
zones.forEach(zone => {
    L.circle(zone.coords, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.5,
        radius: 500 // em metros
    }).bindPopup(`<b>${zone.label}</b>`).addTo(map);
});
