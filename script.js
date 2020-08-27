// global Variable
let lv = 1
let score = 0
let randCirclePos = -1

// document selector
const resetButton = document.querySelector("#reset");
const mainTest = document.querySelector("#main-test")
document.getElementById("level").innerHTML = `level = ${lv}`;
// reset permainan
function reset() {
    lv = 1
    score = 1
    generateCircle(lv)
    document.getElementById("level").innerHTML = `level = ${lv}`;
}

// score Up
function scoreUp() {
    score++
    console.log(randCirclePos, "pos");
    console.log(score, "score");
    document.getElementById("score").innerHTML = `score = ${score}`;
    if (score > 5 * lv) {
        lv++
        // generateCircle(lv)
    }
    generateCircle(lv)
}
// generate circle
function generateCircle(lv = 1) {
    document.getElementById("level").innerHTML = `level = ${lv}`;
    let size = lv + 2
    // size = 3
    let red = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let green = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let blue = Math.round(Math.random() * 155) + 100; // returns a random integer from 100 to 245
    let alpha = (5 + Math.round(Math.random() * 4)) / 10;
    console.log(red, green, blue, alpha);

    function plusOrMinus() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    let delta = Math.round(Math.random() * 20) + 20
    let redAcc = red + (Math.round(Math.random() * delta * plusOrMinus()))
    let greenAcc = green - (Math.round(Math.random() * delta * plusOrMinus()))
    let blueAcc = blue - (Math.round(Math.random() * delta * plusOrMinus()))
    console.log(redAcc, greenAcc, blueAcc, delta);

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
    console.log(randCirclePos);

    for (let i = 0; i < circles.length; i++) {
        if (i === randCirclePos) {
            circles[randCirclePos].style.backgroundColor = `rgba(${redAcc}, ${greenAcc}, ${blueAcc}, ${alpha})`
            // score up
            circles[i].addEventListener('click', scoreUp, false);

        } else {
            circles[i].style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
            circles[i].addEventListener('click', reset, false);
        }
    }

}

// function button
resetButton.addEventListener("click", reset, false);

window.onload = (event) => {
    reset()
};
