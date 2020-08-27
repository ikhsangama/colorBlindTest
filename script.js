// global Variable
let lv = 0
let score = 0
let combo = 0
let randCirclePos = -1

// document selector
const resetButton = document.querySelector("#reset");
const mainTest = document.querySelector("#main-test")
const theTimer = document.querySelector("#timer")
var timer = 30;
var interval;
var timerRunning = false;

// reset permainan
function reset() {
    lv = 0
    score = 0

    // stop timer
    clearInterval(interval);
    interval = null;
    timerRunning = false;
    timer = 30;


    generateCircle(lv)
    document.getElementById("level").innerHTML = `Level = ${leadingZero(lv)}`;
    document.getElementById("score").innerHTML = `Score = ${leadingZero(score)}`;
    document.getElementById("combo").innerHTML = `Combo = ${leadingZero(combo)}`;
    document.getElementById("timer").innerHTML = `30 Sec`;
}

// score Up
function scoreUp() {
    if (score === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval((handler = startTimer), (timeout = 1000));
    }
    combo++
    score += combo
    // console.log();
    console.log(score, "score");
    document.getElementById("level").innerHTML = `Level = ${leadingZero(lv)}`;
    document.getElementById("score").innerHTML = `Score = ${leadingZero(score)}`;
    document.getElementById("combo").innerHTML = `Combo = ${leadingZero(combo)}`;
    if (combo % 3 === 0) {
        lv++
        // generateCircle(lv)
    }
    generateCircle(lv)
}

function noScore() {
    lv = 1
    combo = 0;
    generateCircle(lv)
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(bilangan) {
    if (bilangan <= 9) {
        bilangan = "0" + bilangan;
    }
    return bilangan;
}

// Run a standard minute/second/hundredths timer:
function startTimer() {
    let currentTimer = leadingZero(timer) + " Sec"
    theTimer.innerHTML = currentTimer;
    // 30 detik = 0,30,0,timer[3] = centiS*100 + S*60*100 + M*30*60
    if (timer > 0) {
        timer--;
    }
}

// generate circle
function generateCircle(lv = 1) {
    document.getElementById("level").innerHTML = `level = ${lv}`;
    let size = lv + 2
    if (size >= 5) size = 5
    // size = 3
    let red = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let green = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let blue = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let alpha = (5 + Math.round(Math.random() * 4)) / 10;
    console.log(red, green, blue, alpha);

    function plusOrMinus() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    // tuning warna aksen,
    // semakin besar return delta, semakin berbeda warnanya, semakin besar levelnya, semakin susah perbedaannya
    function delta(lv) {
        return Math.round(Math.random() * (20 - (lv * 2))) + 15
    }

    let redAcc = red + (Math.round(Math.random() * delta(lv) * plusOrMinus()))
    let greenAcc = green - (Math.round(Math.random() * delta(lv) * plusOrMinus()))
    let blueAcc = blue - (Math.round(Math.random() * delta(lv) * plusOrMinus()))
    console.log(redAcc, greenAcc, blueAcc);

    // membuat dimensi div circles
    // bersihkan mainTest
    mainTest.innerHTML = ''
    for (let i = 0; i < size; i++) {
        // append row
        var nodeRow = document.createElement("div");                 // Create a <div> node
        nodeRow.setAttribute("class", "row")
        mainTest.appendChild(nodeRow)
        for (let j = 0; j < size; j++) {
            // append circles
            var nodeCircles = document.createElement("div");                 // Create a <div> node
            // get parrent
            nodeCircles.setAttribute("class", "circles")
            nodeRow.appendChild(nodeCircles)
        }
    }

    let circles = document.getElementsByClassName("circles")
    // console.log(circle)
    // buat random circle position
    randCirclePos = Math.floor(Math.random() * size * size)
    console.log(randCirclePos, "pos");
    let circleSize = 10 / (1.5 + (lv / 5))
    console.log(circleSize);
    for (let i = 0; i < circles.length; i++) {
        if (i === randCirclePos) {
            circles[i].style.cssText = `width: ${circleSize}em; height: ${circleSize}em; background-color: rgba(${red}, ${green}, ${blue}, ${alpha})`
            // score up
            circles[i].addEventListener('click', scoreUp, false);
        } else {
            // console.log(Boolean(circles[i].style.cssText = `width: 6em; background-color: rgba(${redAcc}, ${greenAcc}, ${blueAcc}, ${alpha})`));
            circles[i].style.cssText = `width: ${circleSize}em; height: ${circleSize}em; background-color: rgba(${redAcc}, ${greenAcc}, ${blueAcc}, ${alpha})`
            circles[i].addEventListener('click', noScore, false);
        }
    }

}

// function button
resetButton.addEventListener("click", reset, false);

window.onload = (event) => {
    reset()
};
