let timerInterval;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function start() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
    }
}

function stop() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    lapTimes = []; 
    updateDisplay();
    updateLapTimes(); 
}

function lap() {
    if (timerInterval) {
        const lapTime = Date.now() - startTime; 
        lapTimes.push(formatTime(lapTime)); 
        updateLapTimes(); 
    }
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.querySelector('.timerdisplay').textContent = formattedTime;
}

function updateLapTimes() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = ''; 

    lapTimes.forEach((lapTime, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapList.appendChild(li);
    });
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0') +
        ':' +
        String(millisecondsFormatted).padStart(2, '0')
    );
}
