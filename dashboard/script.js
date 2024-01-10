let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeref = document.querySelector(".time-display h3");
let int = null;
let init =random04();
let start = true;
let north = east = west = south = 0;
let nNum = sNum = eNum = wNum = 0;
let nRage = sRage = eRage = wRage = 0;
let nTime = sTime = eTime = wTime = 0;



// Timer Start Button
document.getElementById("start-btn").addEventListener("click", () => {
    if(int !== null){clearInterval(int);}
    if(start==true){
        if(init == 2){
            north=0, east=2, south=0, west=0;
            eNum = random12();
            eTime = checkTime(eNum);}
        else if(init == 3){
            north=0, east=0, south=2, west=0;
            sNum = random12();
            sTime = checkTime(sNum);}
        else if(init == 4){
            north=0, east=0, south=0, west=2;
            wNum = random12();
            wTime = checkTime(wNum);}
        else{
            north=2, east=0, south=0, west=0;
            nNum = random12();
            nTime = checkTime(nNum);}
            updateField();
        start = false;}
        int = setInterval(Simulate, 10);
        setTimeout(setLight, 100);
        activateLights();
        console.log(init);
        console.log("Light Status:", north, east, west, south);
        console.log("Vehicle Numbers:", nNum, eNum, wNum, sNum);
        console.log("Rage:", nRage, eRage, wRage, sRage);
        console.log("Time:", nTime, eTime, wTime, sTime);
    });
       
// Timer Pause Button
document.getElementById("pause-btn").addEventListener("click", () =>{
    clearInterval(int);
})

// Timer Reset Button
document.getElementById("reset-btn").addEventListener("click", () =>{
    clearInterval(int);
    start = true;
    nNum = sNum = eNum = wNum = nRage = sRage = eRage = wRage = nTime = sTime = eTime = wTime = 0;
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeref.innerHTML = "00 : 00 : 00 : 00";
    setTimeout(resetLights, 100);
    activateLights();
    updateField();
})

// Timer
function Simulate(){
    milliseconds += 10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        
        if(north==0){nRage = nRage+1;}
            else if(north==2){nTime = nTime-1;}
            if(east==0){eRage = eRage+1;}
            else if(east==2){eTime = eTime-1;}
            if(west==0){wRage = wRage+1;}
            else if(west==2){wTime = wTime-1;}
            if(south==0){sRage = sRage+1;}
            else if(south==2){sTime = sTime-1;}
        
        if(seconds%3==0){
            if(north==0){nNum = addVehicle(nNum);}
            else if(north==2){nNum = removeVehicle(nNum);}
            if(east==0){eNum = addVehicle(eNum);}
            else if(east==2){eNum = removeVehicle(eNum);}
            if(west==0){wNum = addVehicle(wNum);}
            else if(west==2){wNum = removeVehicle(wNum);}
            if(south==0){sNum = addVehicle(sNum);}
            else if(south==2){sNum = removeVehicle(sNum);}
            console.log(nNum, eNum, wNum, sNum);}

        if(seconds%5==0){
            if((north==2 && nNum==0)||(south==2 && sNum==0)||(west==2 && wNum==0)||(east==2 && eNum==0)){
                init=nextCycle();
            }
        }

        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }}
        updateField();}
    let h = hours < 10 ? "0" + hours: hours;
    let m = minutes < 10 ? "0" + minutes: minutes;
    let s = seconds < 10 ? "0" + seconds: seconds;
    let ms = milliseconds < 10 ? "00" : milliseconds < 100 ? "0" + milliseconds/10 : milliseconds/10 ;
    timeref.innerHTML = `${h} : ${m} : ${s} : ${ms}`;
}

//Random Number generator from 0 to 4
function random04() {return Math.floor(Math.random()*5);}
//Random Number generator from 1 to 5
function random15() {return Math.floor(Math.random()*5)+1;}
//Random Number generator from 10 to 20
function random12() {return Math.floor(Math.random()*(11)+10);}

//Vehicle Count
function addVehicle(side){
    return side + random04();
}
function removeVehicle(side){
    side = side - random15();
    if(side<0){side = 0;}
    return side;
}

//AssignTime
function checkTime(calc){
    let waitTime = 0;
    if(calc>20){waitTime = 60;}
    else if(10<calc<20){waitTime = 30;}
    else if(5<calc<10){waitTime = 15;}
    else if(calc<5){waitTime = 10;}
    else{waitTime=0;}
    return waitTime;
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
    } else if(north == 1){
        nLights[0].style.backgroundColor = '#101010';
        nLights[1].style.backgroundColor = '#ffff00';
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
    } else if(east == 1){
        eLights[0].style.backgroundColor = '#101010';
        eLights[1].style.backgroundColor = '#ffff00';
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
    } else if(south == 1){
        sLights[0].style.backgroundColor = '#101010';
        sLights[1].style.backgroundColor = '#ffff00';
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
    } else if(west == 1){
        wLights[0].style.backgroundColor = '#101010';
        wLights[1].style.backgroundColor = '#ffff00';
        wLights[2].style.backgroundColor = '#101010';
    }
}

function updateField(){
    console.log("....................");

    document.getElementById('nNo').innerHTML = `Number: ${nNum}`;
    document.getElementById('eNo').innerHTML = `Number: ${eNum}`;    
    document.getElementById('wNo').innerHTML = `Number: ${wNum}`;
    document.getElementById('sNo').innerHTML = `Number: ${sNum}`;

    document.getElementById('nRage').innerHTML = `Rage: ${nRage}`;
    document.getElementById('eRage').innerHTML = `Rage: ${eRage}`;    
    document.getElementById('wRage').innerHTML = `Rage: ${wRage}`;
    document.getElementById('sRage').innerHTML = `Rage: ${sRage}`;

    document.getElementById('nTime').innerHTML = `Time: ${nTime}`;
    document.getElementById('eTime').innerHTML = `Time: ${eTime}`;    
    document.getElementById('wTime').innerHTML = `Time: ${wTime}`;
    document.getElementById('sTime').innerHTML = `Time: ${sTime}`;

    //nEm.checked = true; 
}

//Next Cycle
function nextCycle(){
    console.log(init);
    if(east==2){
        east = west = 1;
        eRage = wRage = eTime = wTime = 0;
        setLight();
        wTime=checkTime(wNum);
        north=0, east=0, south=0, west=2;}
    else if(south == 2){
        north= south = 1;
        nRage = sRage= nTime = sTime = 0;
        setLight();
        nTime=checkTime(nNum);
        north=2, east=0, south=0, west=0;}
    else if(west == 2){
        west = south = 1;
        sRage = wRage = sTime = wTime = 0;
        setLight();
        sTime=checkTime(sNum);
        north=0, east=0, south=2, west=0;}
    else{
        north = east = 1;
        nRage = eRage = nTime = eTime = 0;
        setLight();
        eTime=checkTime(eNum);
        north=0, east=2, south=0, west=0;}
    setTimeout(setLight, 2000);
    console.log(init);
    console.log("Light Status:", north, east, west, south);
    console.log("Vehicle Numbers:", nNum, eNum, wNum, sNum);
    console.log("Rage:", nRage, eRage, wRage, sRage);
    console.log("Time:", nTime, eTime, wTime, sTime);
    return init;
}