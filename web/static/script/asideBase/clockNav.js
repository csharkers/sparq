const clockTime = document.getElementById("clock-time");
const date = document.getElementById("date-day");

// Função para atualizar o horário
function updateTime() {
    const now = new Date(); // Cria nova data a cada chamada

    let H = now.getHours();
    let M = now.getMinutes();

    let hours = H < 10 ? '0' + H : H;
    let minutes = M < 10 ? '0' + M : M;

    clockTime.innerHTML = `${hours}:${minutes}`;
}

// Função para atualizar a data
function updateDay() {
    const now = new Date(); // Cria nova data a cada chamada

    let D = now.getDate();
    let M = now.getMonth() + 1; // Janeiro = 0, por isso somamos 1
    let year = now.getFullYear();

    let month = M < 10 ? '0' + M : M;
    let day = D < 10 ? '0' + D : D;

    date.innerHTML = `${day}/${month}/${year}`;
}

// Atualiza imediatamente ao carregar
updateTime();
updateDay();

// Atualiza a cada segundo
setInterval(updateTime, 1000);
setInterval(updateDay, 1000);