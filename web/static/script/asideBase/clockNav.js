const clockTime = document.getElementsByClassName("clock-time");

function updateTime(){

 const today = new Date();

 let H = today.getHours();
 let M = today.getMinutes();

 console.log( H, M );
}

updateTime()