// Configuração do mapa (centralizado no Parque Estadual da Serra do Mar - SP)
const map = L.map('map').setView([-23.8069, -45.4306], 14);

// Mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Coordenadas do Parque Estadual da Serra do Mar (SP)
const parkCoords = [-23.8069, -45.4306];

// Adiciona um polígono (contorno do parque) - simulado
const parkArea = L.polygon([
    [-23.80, -45.42],
    [-23.81, -45.43],
    [-23.82, -45.44],
    [-23.80, -45.45]
], { 
    color: "blue", 
    fillOpacity: 0.1 
}).addTo(map);

// Adiciona um popup ao clicar no parque
parkArea.bindPopup(`
    <b>Parque Estadual da Serra do Mar</b><br>
    <small>SP - Brasil</small><br>
    Área de preservação ambiental com trilhas e biodiversidade.
`);

// Círculos dentro do parque (representando zonas diferentes)
const zones = [
    { coords: [-23.804, -45.430], color: "green",  label: "Sensor 1" },
    { coords: [-23.806, -45.445], color: "yellow", label: "Sensor 2" },
    { coords: [-23.815, -45.440], color: "red",    label: "Sensor 3" }
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