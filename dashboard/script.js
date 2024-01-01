let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeref = document.querySelector(".time-display h3");
let int = null;

// Timer Start Button
document.getElementById("start-btn").addEventListener("click", () => {
    if(int !== null){clearInterval(int);}
    int = setInterval(displayTimer, 10);
})

// Timer Pause Button
document.getElementById("pause-btn").addEventListener("click", () =>{
    clearInterval(int);
})

// Timer Reset Button
document.getElementById("reset-btn").addEventListener("click", () =>{
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeref.innerHTML = "00 : 00 : 00 : 00";
})

// Timer
function displayTimer(){
    milliseconds += 10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }}}
    let h = hours < 10 ? "0" + hours: hours;
    let m = minutes < 10 ? "0" + minutes: minutes;
    let s = seconds < 10 ? "0" + seconds: seconds;
    let ms = milliseconds < 10 ? "00" : milliseconds < 100 ? "0" + milliseconds/10 : milliseconds/10 ;
    timeref.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}