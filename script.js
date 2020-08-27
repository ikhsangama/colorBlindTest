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

window.onload = (event) => {
    let circles = document.getElementsByClassName("circles")
    // console.log(circle)
    // buat random circle
    let randCirclePos = Math.floor(Math.random() * circles.length)
    console.log(randCirclePos, delta);
    for (let i = 0; i < circles.length; i++) {
        if (i === randCirclePos) {
            circles[randCirclePos].style.backgroundColor = `rgba(${redAcc}, ${greenAcc}, ${blueAcc}, ${alpha})`
        } else {
            circles[i].style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
        }
    }
};