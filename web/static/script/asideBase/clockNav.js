const clockTime = document.getElementById("clock-time");
const date = document.getElementById('date-day')

const today = new Date();

clockTime.innerHTML = "00:00"

function updateTime(){

 let H = today.getHours();
 let M = today.getMinutes();

 hours = H < 10 ? '0' + H : H;
 minutes = M < 10 ? '0' + M : M;

 clockTime.innerHTML = `${hours}:${minutes}`;

}

function updateday(){

    D = today.getDate();
    M = today.getMonth();
    year = today.getFullYear();

     M =  M + 1;
 
     month = M < 10 ? '0' + M : M;
     day = D < 10? '0' + D : D;

    date.innerHTML = `${day}/${month}/${year}`;

}

updateTime()
updateday()

setInterval(updateday, 1000);
setInterval(updateTime, 1000);
