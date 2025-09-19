// Configuração do mapa
const map = L.map('map').setView([-23.550520, -46.633308], 12);

// Adiciona a camada de mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Lógica para buscar as áreas dos parques (polígonos) do banco de dados
fetch('/api/areas')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados de áreas da API');
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados de áreas dos parques recebidos:", data);
        data.forEach(parque => {
            try {
                const geoJsonData = JSON.parse(parque.geojson);
                L.geoJSON(geoJsonData, {
                    style: function(feature) {
                        return {
                            color: "#007BFF",
                            weight: 3,
                            opacity: 0.65,
                            fillColor: "#007BFF",
                            fillOpacity: 0.2
                        };
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup("<b>" + parque.nome + "</b>");
                    }
                }).addTo(map);
            } catch (e) {
                console.error("Erro ao processar GeoJSON para o parque:", parque.nome, e);
            }
        });
    })
    .catch(error => {
        console.error("Erro ao carregar dados dos parques:", error);
    });

// Lógica para buscar os sensores (marcadores) do banco de dados
fetch('/api/sensores')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar dados de sensores da API');
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados dos sensores recebidos:", data);
        data.forEach(sensor => {
            const marker = L.marker([sensor.latitude, sensor.longitude]).addTo(map)
                .bindPopup("<b>" + sensor.nome + "</b>");
        });
    })
    .catch(error => {
        console.error("Erro ao carregar dados dos sensores:", error);
    });