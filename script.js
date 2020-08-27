// global Variable
let lv = 1

// document selector
const resetButton = document.querySelector("#reset");
const mainTest = document.querySelector("#main-test")

document.getElementById("level").innerHTML = `level = ${lv}`;
// reset permainan
function reset() {
    lv = 1
    generateCircle(lv)
}

// generate circle
function generateCircle(lv = 1) {
    document.getElementById("level").innerHTML = `level = ${lv}`;
    let size = lv + 2

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

    // bersihkan mainTest

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
    let randCirclePos = Math.floor(Math.random() * size * size)
    console.log(randCirclePos, delta);

    for (let i = 0; i < circles.length; i++) {
        if (i === randCirclePos) {
            circles[randCirclePos].style.backgroundColor = `rgba(${redAcc}, ${greenAcc}, ${blueAcc}, ${alpha})`
        } else {
            circles[i].style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
        }
    }

}

// function button
resetButton.addEventListener("click", reset, false);

window.onload = (event) => {
    reset()
};
