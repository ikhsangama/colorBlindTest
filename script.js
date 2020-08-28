// global Variable
let lv = 0
let score = 0
let combo = 0
let players = {}
let player = { name: "", score: 0 }
let circleSize = 0
let randCirclePos = -1
let arrHighScore = []
// play sound
backsound = document.getElementById("backsound");

// document selector
const resetButton = document.querySelector("#reset");
const mainTest = document.querySelector("#main-test")
const theTimer = document.querySelector("#timer")
var timer = 30;
var interval;
var timerRunning = false;

// toggle element
function toggleEl(el) {
    console.log(el);
    var x = document.querySelector(el);
    console.log(x);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function hideEl(el) {
    var x = document.querySelector(el);
    x.style.display = "none";
}

function showEl(el) {
    var x = document.querySelector(el);
    x.style.display = "block";
}

// function savePlayer
function savePlayer() {
    playerName = document.querySelector("#playerName").value;

    player = {}
    player.name = playerName;
    player.score = score
    arrHighScore.push(player)
    // sort by value
    arrHighScore.sort(function (a, b) {
        return b.score - a.score;
    });
    updateTable()
}

// reset permainan
function reset() {
    lv = 0
    score = 0
    combo = 0
    // hilangkan form
    hideEl(".hidden-form")
    showEl("#main-test")
    // toggleEl(".hidden-form")
    // toggleEl("#main-test")

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
        backsound.volume = 0.2;
    }
    if (timerRunning) {
        combo++
        score += combo
        playSound("correct_sound")
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

}

function noScore() {
    if (timerRunning) {
        lv = 1
        combo = 0;
        playSound("wrong_sound")
        generateCircle(lv)
    }
}

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(bilangan) {
    if (bilangan <= 9) {
        bilangan = "0" + bilangan;
    }
    return bilangan;
}

// Run a standard seconds timer:
function startTimer() {
    let currentTimer = leadingZero(timer) + " Sec"
    theTimer.innerHTML = currentTimer;
    // 30 detik = 0,30,0,timer[3] = centiS*100 + S*60*100 + M*30*60
    if (timer > 0) {
        timer--;
        playSound("clock_ticking")
    } else {
        timerRunning = false
        clearInterval(interval);
        interval = null;
        // let muncul = document.querySelector(".hidden-form")
        // muncul.classList.remove("hide");
        // muncul.classList.add("visible");
        // console.log(muncul);
        // play sound
        endGame()
        playSound("time_over")
    }
}

function endGame() {
    hideEl("#main-test")
    showEl(".hidden-form")
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
    if (size <= 5) circleSize = 10 / (1.5 + (lv / 5))
    // if (size > 5) 
    console.log(circleSize, "circlesize");
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
// [{name: "ikhsan", score: 24},..]
function updateTable() {
    // hapus table
    var x = document.getElementById("players")
    x.innerHTML = `
        <tr>
          <th style="width: 33.3%">PLACE</th>
          <th style="width: 33.3%">PLAYER NAME</th>
          <th style="width: 33.3%">HIGHEST SCORE</th>
        </tr>
        `
    // isi tabel
    for (let i = 0; i < arrHighScore.length; i++) {
        let row = document.createElement("tr")
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${arrHighScore[i]["name"]}</td>
        <td>${arrHighScore[i]["score"]}</td>
        `
        x.append(row)
    }
    reset()
}
// voice pack
function playSound(sound, vol, autoplay) {
    let x = document.getElementById(sound);
    x.autoplay = true;
    if (vol) {
        x.volume = vol
    }
    if (autoplay) {
        x.autoplay
    }
    console.log(x);
    x.load();
    return x
}


// function button
resetButton.addEventListener("click", reset, false);

window.onload = (event) => {
    reset()
    hideEl(".hidden-form")
};
