let animId;
let gameOver = false;
let scoreCounter = 0;
let score = document.querySelector('#score');
let speed = 1;
let lineSpeed = 5;
let moveLeft;
let moveRight;
let moveUP;
let moveDown;
//const player = document.querySelector('#player');

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(e) {
    if (gameOver === false) {
        let key = e.keyCode;
        if (key === 37 && moveLeft === false) {
            moveLeft = requestAnimationFrame(left);
        } else if (key === 39 && moveRight === false) {
            moveRight = requestAnimationFrame(right);
        } else if (key === 38 && moveUP === false) {
            moveUP = requestAnimationFrame(up);
        } else if (key === 40 && moveDown === false) {
            moveDown = requestAnimationFrame(down);
        }
    }
}


// function getStyle(selector) {
//     const elem = document.querySelector(selector);
//     const style = getComputedStyle(elem);
//     return style;
// }

function lineMove(line) {
    const elem = document.querySelector(line);
    const style = getComputedStyle(elem);
    let lineCurrentTop = parseInt(style.top);
    if (lineCurrentTop > 600) {
            lineCurrentTop = -300;
        }
        elem.style.top = String(lineCurrentTop + lineSpeed) + 'px';
}

function carMove(car) {
    const elem = document.querySelector(car);
    const style = getComputedStyle(elem);
        let carCurrentTop = parseInt(style.top);
        if (carCurrentTop > 600) { //road.height
            carCurrentTop = -300;
            let carLeft = parseInt(Math.random() * (300 - 70)); //road.width - car.width
            elem.style.left = String(carLeft) + 'px';
        }
        elem.style.top = String(carCurrentTop + speed) + 'px';
    }

function left() {
    const elem = document.querySelector('#player');
    const style = getComputedStyle(elem);
    let leftPosition = parseInt(style.left);
    if (gameOver === false && leftPosition > 0) {
        elem.style.left = String(leftPosition - 5) + 'px';
        moveLeft = requestAnimationFrame(left);
    }
}

function right() {
    const elem = document.querySelector('#player');
    const style = getComputedStyle(elem);
    let leftPosition = parseInt(style.left);
    if (gameOver === false && leftPosition < 300 - 70) { //road.width - car.width
        elem.style.left = String(leftPosition + 5) + 'px';
        moveRight = requestAnimationFrame(right);
    }
}

function up() {
    const elem = document.querySelector('#player');
    const style = getComputedStyle(elem);
    let topPosition = parseInt(style.top);
    if (gameOver === false && topPosition > 0) {
        elem.style.top = String(topPosition - 3) + 'px';
        moveUP = requestAnimationFrame(up);
    }
}

function down() {
    const elem = document.querySelector('#player');
    const style = getComputedStyle(elem);
    let topPosition = parseInt(style.top);
    if (gameOver === false && topPosition < 600 - 100) { //container.height - car.height
        elem.style.top = String(topPosition + 3) + 'px';
        moveDown = requestAnimationFrame(down);
    }
}

function repeat() {
    scoreCounter ++;
    if (scoreCounter % 500 === 0) {
            speed++;
            lineSpeed++;
        }
    // if (scoreCounter % 20 == 0) {
    //         score.text = parseInt(score.text()) + 1);
    //     }
    carMove('#car-1');
    carMove('#car-2');
    carMove('#car-3');
    lineMove('#line-1');
    lineMove('#line-2');
    lineMove('#line-3');
    animId = requestAnimationFrame(repeat);
}

function initGame() {
    animId = requestAnimationFrame(repeat);
}

initGame();