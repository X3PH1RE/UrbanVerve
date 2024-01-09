let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeref = document.querySelector(".time-display h3");
let int = null;
let north = east = west = south = 0;
let nNum = sNum = eNum = wNum = 0;
let nRage, sRage, eRage, wRage = 200;



// Timer Start Button
document.getElementById("start-btn").addEventListener("click", () => {
    if(int !== null){clearInterval(int);}
    let init = random04();
    if(init == 2){north=0, east=2, south=0, west=0;}
    else if(init == 3){north=0, east=0, south=2, west=0;}
    else if(init == 4){north=0, east=0, south=0, west=2;}
    else{north=2, east=0, south=0, west=0;}
    console.log(north, east, south, west);
    int = setInterval(Simulate, 10);
    setTimeout(setLight, 100);
    activateLights();
    });
       
// Timer Pause Button
document.getElementById("pause-btn").addEventListener("click", () =>{
    clearInterval(int);
})

// Timer Reset Button
document.getElementById("reset-btn").addEventListener("click", () =>{
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeref.innerHTML = "00 : 00 : 00 : 00";
    setTimeout(resetLights, 100);
    activateLights();
})

// Timer
function Simulate(){
    milliseconds += 10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds%1==0){
            addVehicle(nNum);
        }
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

//Random Number generator from 0 to 4
function random04() {return Math.floor(Math.random() * 5);}
//Random Number generator from 6 to 10
function random610() {return Math.floor(Math.random() * (10 - 6 + 1)) + 6;}

//Vehicle Count
function updateField(){}

function addVehicle(side){
    console.log(side);
    return side + random04();
}




//check Status
function checkGreen(){

}
function checkRed(){
    
}

//Start Rage
function rage(){
    if(init == 2){north=0, east=2, south=0, west=0;}
    else if(init == 3){north=0, east=0, south=2, west=0;}
    else if(init == 4){north=0, east=0, south=0, west=2;}
    else{north=2, east=0, south=0, west=0;}
}


//reset all lights to yellow
function resetLights() {
    console.log("Reset");
    north = east = west = south = 1;
    const lights = document.querySelectorAll('.light');
    const yellow = document.querySelectorAll('.yellow');
    lights.forEach(light => {light.style.backgroundColor = '#101010';});
    yellow.forEach(yellow => {yellow.style.backgroundColor = 'yellow'});
}

//Activate all lights
function activateLights(){
    console.log("###");
    const red = document.querySelectorAll('.red');
    const yellow = document.querySelectorAll('.yellow');
    const green = document.querySelectorAll('.green');
    red.forEach(red => {red.style.backgroundColor = '#ff0000'});
    yellow.forEach(yellow => {yellow.style.backgroundColor = '#ffff00'});
    green.forEach(green => {green.style.backgroundColor = '#00ff00'});
}

//Function to assign Lights
function setLight(){
    console.log("Set");
    const nLights = document.querySelectorAll('#nLight .light');
    const eLights = document.querySelectorAll('#eLight .light');
    const sLights = document.querySelectorAll('#sLight .light');
    const wLights = document.querySelectorAll('#wLight .light');
    //North Lights
    if(north == 2){
        nLights[0].style.backgroundColor = '#101010';
        nLights[1].style.backgroundColor = '#101010';
        nLights[2].style.backgroundColor = 'green';
    } else if(north == 0){
        nLights[0].style.backgroundColor = 'red';
        nLights[1].style.backgroundColor = '#101010';
        nLights[2].style.backgroundColor = '#101010';
    } else if(north == 1||4){
        nLights[0].style.backgroundColor = '#101010';
        nLights[1].style.backgroundColor = '#yellow';
        nLights[2].style.backgroundColor = '#101010';
    }
    //East Lights
    if(east == 2){
        eLights[0].style.backgroundColor = '#101010';
        eLights[1].style.backgroundColor = '#101010';
        eLights[2].style.backgroundColor = 'green';
    } else if(east == 0){
        eLights[0].style.backgroundColor = 'red';
        eLights[1].style.backgroundColor = '#101010';
        eLights[2].style.backgroundColor = '#101010';
    } else if(east == 1||4){
        eLights[0].style.backgroundColor = '#101010';
        eLights[1].style.backgroundColor = '#yellow';
        eLights[2].style.backgroundColor = '#101010';
    }
    //South Lights
    if(south == 2){
        sLights[0].style.backgroundColor = '#101010';
        sLights[1].style.backgroundColor = '#101010';
        sLights[2].style.backgroundColor = 'green';
    } else if(south == 0){
        sLights[0].style.backgroundColor = 'red';
        sLights[1].style.backgroundColor = '#101010';
        sLights[2].style.backgroundColor = '#101010';
    } else if(south == 1||4){
        sLights[0].style.backgroundColor = '#101010';
        sLights[1].style.backgroundColor = '#yellow';
        sLights[2].style.backgroundColor = '#101010';
    }
    //West Lights
    if(west == 2){
        wLights[0].style.backgroundColor = '#101010';
        wLights[1].style.backgroundColor = '#101010';
        wLights[2].style.backgroundColor = 'green';
    } else if(west == 0){
        wLights[0].style.backgroundColor = 'red';
        wLights[1].style.backgroundColor = '#101010';
        wLights[2].style.backgroundColor = '#101010';
    } else if(west == 1||4){
        wLights[0].style.backgroundColor = '#101010';
        wLights[1].style.backgroundColor = '#yellow';
        wLights[2].style.backgroundColor = '#101010';
    }
}