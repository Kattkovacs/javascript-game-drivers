let animId;
const player = document.querySelector('#player');
const car1 = document.querySelector('#car-1');
const car2 = document.querySelector('#car-2');
const car3 = document.querySelector('#car-3');
const restartDiv = document.querySelector('#restart-div');
const restartBtn = document.querySelector('#restart');
let audio1 = document.getElementById("audio");
let gameOver = false;
let scoreCounter = 0;
let score = document.querySelector('#score');
let speed = 1;
let lineSpeed = 5;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
if (!localStorage.highScore) {
    localStorage.highScore = 0;
}
document.querySelector('#high-score').innerHTML = localStorage.highScore;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
restartBtn.addEventListener('click', gameRestart);

function keyDownHandler(e) {
    if (gameOver === false) {
        let key = e.keyCode;
        if (key === 37 && moveLeft === false) {
            moveLeft = requestAnimationFrame(left);
        } else if (key === 39 && moveRight === false) {
            moveRight = requestAnimationFrame(right);
        } else if (key === 38 && moveUp === false) {
            moveUp = requestAnimationFrame(up);
        } else if (key === 40 && moveDown === false) {
            moveDown = requestAnimationFrame(down);
        }
    }
}

function keyUpHandler(e) {
            if (gameOver === false) {
            let key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(moveLeft);
                moveLeft = false;
            } else if (key === 39) {
                cancelAnimationFrame(moveRight);
                moveRight = false;
            } else if (key === 38) {
                cancelAnimationFrame(moveUp);
                moveUp = false;
            } else if (key === 40) {
                cancelAnimationFrame(moveDown);
                moveDown = false;
            }
        }
}

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
            let carLeft = parseInt(Math.random() * (300 - 55)); //road.width - car.width
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
    if (gameOver === false && leftPosition < 300 - 55) { //road.width - car.width
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
        moveUp = requestAnimationFrame(up);
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
    if (collision(player, car1) || collision(player, car2) || collision(player, car3)) {
        stopTheGame();
        return;
    }
    scoreCounter++;

    if (scoreCounter % 500 === 0) {
        speed++;
        lineSpeed++;
    }
    if (scoreCounter % 10 === 0) {
        score.innerHTML = String(scoreCounter / 10);
    }

    carMove('#car-1');
    carMove('#car-2');
    carMove('#car-3');
    lineMove('#line-1');
    lineMove('#line-2');
    lineMove('#line-3');
    animId = requestAnimationFrame(repeat);
}

function gameRestart() {
    location.reload();
    setHighScore();
}

function stopTheGame() {
    gameOver = true;
    cancelAnimationFrame(animId);
    cancelAnimationFrame(moveRight);
    cancelAnimationFrame(moveLeft);
    cancelAnimationFrame(moveUp);
    cancelAnimationFrame(moveDown);
    // resartDiv.slideDown();
    restartBtn.focus();
}

function sound(audio) {
    audio.play();
}

function setHighScore() {
    if (Number(localStorage.highScore) < scoreCounter / 10) {
        localStorage.highScore = Math.floor(scoreCounter / 10);
        document.querySelector('#high-score').innerHTML = localStorage.highScore;
    }
}

function collision(player, car) {
    let x1 = player.offsetLeft;
    let y1 = player.offsetTop;
    let h1 = player.offsetHeight;
    let w1 = player.offsetWidth;
    let b1 = y1 + h1;
    let r1 = x1 + w1;
    let x2 = car.offsetLeft;
    let y2 = car.offsetTop;
    let h2 = car.offsetHeight;
    let w2 = car.offsetWidth;
    let b2 = y2 + h2;
    let r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function initGame() {
    animId = requestAnimationFrame(repeat);
}

initGame();
