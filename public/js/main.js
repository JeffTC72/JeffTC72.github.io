const garage = document.querySelector(".garage");
const displayCar = document.getElementById("displayCar");
const race = document.querySelector(".race");

const body = document.querySelectorAll(".body");
const paint = document.querySelectorAll(".paint");
const wheel = document.querySelectorAll(".wheel");
const special = document.querySelector("#sp");
const startBtn = document.querySelector(".startBtn");

const bodyAll = ["oc", "do", "ty"];
const paintAll = ["no", "fl", "wi"];
const wheelAll = ["di", "be", "vo"];
const random = document.querySelector(".random");


const raceCar1 = document.querySelector(".raceCar1");
const raceCar2 = document.querySelector(".raceCar2");
const pedal = document.querySelector(".pedal");
const pedalBtn = document.querySelector(".pedalBtn");
const barMeter = document.querySelector(".barMeter");
const announcer = document.querySelector(".announcer");
const announcerImg = document.querySelector(".announcerImg");

let wins = 0;


//** CAR CREATOR **//

let partBody = 'oc'; let partPaint = 'no'; let partWheel = 'di'; let car;


body.forEach(element => {
    element.addEventListener('click', () => {
        partBody = event.srcElement.id;

        // FIX CAR SIZES
        
        if (partBody == "oc") {
            displayCar.style=("height: 12em");
            raceCar1.style=("height: 6em");
        } else {
            displayCar.style=("height: 10em");
            raceCar1.style=("height: 5em");
        };

        car = partBody+partPaint+partWheel

        displayCar.src = `public/img/rlracer-cars/${car}.png`;
        raceCar1.src = `public/img/rlracer-cars/${car}.png`;
    });
});

paint.forEach(element => {
    element.addEventListener('click', () => {
        partPaint = event.srcElement.id;

        car = partBody+partPaint+partWheel

        displayCar.src = `public/img/rlracer-cars/${car}.png`;
        raceCar1.src = `public/img/rlracer-cars/${car}.png`;
    });
});

wheel.forEach(element => {
    element.addEventListener('click', () => {
        partWheel = event.srcElement.id;

        // SPECIAL WHEELS FOR UNLOCKING

        if (partWheel == "sp" && wins < 10) {
            partWheel = "di";
            window.alert(`You have not unlocked these wheels yet. Your current number of wins is ${wins}`);
        };

        car = partBody+partPaint+partWheel

        displayCar.src = `public/img/rlracer-cars/${car}.png`;
        raceCar1.src = `public/img/rlracer-cars/${car}.png`;
    });
});

random.addEventListener('click', () => {

    let bodyNmbr = Math.floor(Math.random() * 3);
    partBody = bodyAll[bodyNmbr];

    let paintNmbr = Math.floor(Math.random() * 3);
    partPaint = paintAll[paintNmbr];

    let wheelNmbr = Math.floor(Math.random() * 3);
    partWheel = wheelAll[wheelNmbr];

    // FIX CAR SIZES

    if (partBody == "oc") {
        displayCar.style=("height: 12em");
        raceCar1.style=("height: 6em");
    } else {
        displayCar.style=("height: 10em");
        raceCar1.style=("height: 5em");
    };

    car = partBody+partPaint+partWheel

    displayCar.src = `public/img/rlracer-cars/${car}.png`;
    raceCar1.src = `public/img/rlracer-cars/${car}.png`;
});

new Audio('audio_file.mp3').play();

displayCar.onmouseover = () => {
    if (partBody == "oc") {
        new Audio('public/sound/oc.mp3').play();
    } else if (partBody == "do") {
        new Audio('public/sound/do.mp3').play();
    } else {
        new Audio('public/sound/ty.mp3').play(); 
    }
}


//** RACE GAME **//

let clickedTime; let createdTime; let reactionTime; let turnsPlayed; let playerPos; let cpuPos; let cpuChance;


function game() {
    if (turnsPlayed > 4) {
        console.log("Race ended");

        if (playerPos > cpuPos) {
            console.log('winner');

            announcer.classList.remove("hidden");
            announcerImg.src = `public/img/win.png`;

            wins = wins + 1;
        } else {
            console.log('Better luck next time');

            announcer.classList.remove("hidden");
            announcerImg.src = `public/img/lose.png`;
        }

        setTimeout( () => {
        garage.classList.remove("hidden");
        race.classList.add("hidden");
        return;
        }, 5000);
    } else {
        turnsPlayed = turnsPlayed + 1;
        console.log(`This is turn ${turnsPlayed}`);
        
        let time=Math.random();
        time=time*3000 + 2000;

        barMeter.style.left = '0%';
    
        setTimeout( () => {
            createdTime=Date.now();

            barMeter.style.left = '100%';

        }, time);
    }
};

pedalBtn.addEventListener('click', () => {
    clickedTime=Date.now();

    reactionTime=(clickedTime-createdTime)/1000;

    if (reactionTime > 0.85 && reactionTime < 1) {
        playerPos = playerPos + 2;
    } else if (reactionTime > 0.6 && reactionTime <1.25) {
        playerPos = playerPos + 1;
    } else {
        playerPos = playerPos - 1;
    };

    // ENEMY CAR
    cpuChance = Math.floor(Math.random() * 4 - 1);
    cpuPos = cpuPos + cpuChance;

    console.log(`Your position ${playerPos}`);
    console.log(`Enemy position ${cpuPos}`);

    raceCar1.style.left = `${playerPos * 5 + 10}%`;
    raceCar2.style.left = `${cpuPos * 5 + 10}%`;

    game();
});


//** START BUTTON **//

let cpuBody; let cpuPaint; let cpuWheel; let cpuCar

startBtn.addEventListener('click', () => {
    
    // RACE SETUP

    garage.classList.add("hidden");
    race.classList.remove("hidden");
    announcer.classList.add("hidden");

    playerPos = 0;
    cpuPos = 0;

    raceCar1.style.left = '10%';
    raceCar2.style.left = '10%';

    // RANDOMIZE ENEMY CAR

    cpuBody = bodyAll[Math.floor(Math.random() * 3)];
    cpuPaint = paintAll[Math.floor(Math.random() * 3)];
    cpuWheel = wheelAll[Math.floor(Math.random() * 3)];

    if (cpuBody == "oc") {
        raceCar2.style=("height: 6em");
    } else {
        raceCar2.style=("height: 5em");
    };

    cpuCar = cpuBody + cpuPaint + cpuWheel;

    raceCar2.src = `public/img/rlracer-cars/${cpuCar}.png`;

    setTimeout( () => {
        turnsPlayed = 0;

        console.log("Race started");

        game();
    }, 1000);    
});