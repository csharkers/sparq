// update_data.js

function atualizarDadosSensores() {
    fetch('/api/get_sensor_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const co2Element = document.getElementById('co2-sensor1');
            if (co2Element) {
                co2Element.textContent = `CO2 ${data.co2_sensor1} ppm`;
            }

            const alertaContainer = document.querySelector('.content-notify-widget');
            if (alertaContainer) {
                if (data.alerta.status === 'ativo') {
                    alertaContainer.innerHTML = `
                        <i class="fa-solid fa-triangle-exclamation" style="color: #FFD43B; font-size: 2.5vw"></i>
                        <h3 class="text-alert">Alerta - ${data.alerta.name}: Nível de carbono superior a 500.</h3>
                    `;
                } else {
                    alertaContainer.innerHTML = `
                        <div class="content-none-notify-widget">
                            <i style="font-size: 2.5vw;" class="fa-solid fa-bell"></i>
                            <h2>Não há nada por aqui.</h2>
                        </div>
                    `;
                }
            }

            const sensorInfoName = document.getElementById('sensor-name-info');
            if (sensorInfoName) {
                sensorInfoName.textContent = `Informações do sensor - ${data.sensor_selecionado.name}`;
            }
            
            console.log("Dados atualizados com sucesso!");
        })
        .catch(error => {
            console.error('Houve um problema na atualização:', error);
        });
}

setInterval(atualizarDadosSensores, 22000);

document.addEventListener('DOMContentLoaded', atualizarDadosSensores);