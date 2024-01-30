let timeInMinutes;
let currentTime;
let deadLine;
let timeInterval;
let restartValue;
let Hrs = document.getElementById("display-hrs");
let Min = document.getElementById("display-min");
let Sec = document.getElementById("display-sec");

function startTimer(){
    timeInMinutes = document.getElementById("timeInMinute").value;
    if(timeInMinutes > 0){
        currentTime = Date.parse(new Date());
        deadLine = new Date(currentTime + (timeInMinutes * 60 * 1000));
        restartValue = deadLine;
        document.getElementById("timer").style.display = "flex";
        document.getElementById("timeExpired").style.display = "none";
        runClock(deadLine);

    }
    else{
        alert("Enter a valid time");
    }
}

function timeRemaining(endtime){
    let time = Date.parse(endtime) - Date.parse(new Date());

    let seconds = Math.floor((time/1000) % 60);
    let minutes = Math.floor( (time/1000/60) % 60 );
	let hours = Math.floor( (time/(1000*60*60)) % 24 );
    return {'total':time, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
}

function runClock(endTime){
    function updateClock(){
        let t = timeRemaining(endTime);
        Hrs.innerHTML = ("0"+t.hours).slice(-2);
        Min.innerHTML = ("0"+t.minutes).slice(-2);
        Sec.innerHTML = ("0"+t.seconds).slice(-2);
        if(t.total <= 0){ timeEnded() }
    }
    updateClock();
    timeInterval = setInterval(updateClock, 1000);
}

let paused = false;
let timeLeft;

function pauseClock(){
    if(!paused){
        document.getElementById("pause").style.display = "none";
        document.getElementById("start").style.display = "block";
        paused = true;
        clearInterval(timeInterval);
        timeLeft = timeRemaining(deadLine).total;
    }
}

function resumeClock(){
    if(paused){
        document.getElementById("pause").style.display = "block";
        document.getElementById("start").style.display = "none";
        paused = false;
        deadLine = new Date(Date.parse(new Date()) + timeLeft);
        runClock(deadLine); 
    }
}

function restartClock(){
    clearInterval(timeInterval);
    document.getElementById("timer").style.display = "flex";
    document.getElementById("timeExpired").style.display = "none";
    startTimer();
}

function stopClock(){
    clearInterval(timeInterval);
    document.getElementById("timeInMinute").value = "";
    Hrs.innerHTML = "00";
    Min.innerHTML = "00";
    Sec.innerHTML = "00";

}

function timeEnded(){
    clearInterval(timeInterval);
    document.getElementById("timer").style.display = "none";
    document.getElementById("timeExpired").style.display = "block";
}