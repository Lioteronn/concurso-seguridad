var timer = document.getElementById("timer");
var time = 900; // 15 minutes in seconds

function startTimer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    
    timer.innerHTML = minutes + ":" + seconds;
    
    if (time > 0) {
        time--;
        setTimeout(startTimer, 1000);
    } else {
        alert("Time's up! Please proceed to the next room.");
    }
}

startTimer();

