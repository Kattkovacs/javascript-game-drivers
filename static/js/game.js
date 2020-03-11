let animId;
let gameOver;

// function getStyle(selector) {
//     const elem = document.querySelector(selector);
//     const style = getComputedStyle(elem);
//     return style;
// }

function myMove(line) {
    const elem = document.querySelector(line);
    const style = getComputedStyle(elem);
    let line_current_top = parseInt(style.top);
    if (line_current_top > 600) {
            line_current_top = -300;
        }
        elem.style.top = String(line_current_top + 3) + 'px';
}

function left() {
    const elem = document.querySelector('#player');
    const style = getComputedStyle(elem);
    if (gameOver === false && parseInt(style.left) > 0) {
        car.css('left', parseInt(car.css('left')) - 5);
        move_left = requestAnimationFrame(left);
    }
}

function right() {
    if (gameOver === false && parseInt(car.css('left')) < container_width - car_width) {
        car.css('left', parseInt(car.css('left')) + 5);
        move_right = requestAnimationFrame(right);
    }
}

function up() {
    if (gameOver === false && parseInt(car.css('top')) > 0) {
        car.css('top', parseInt(car.css('top')) - 3);
        move_up = requestAnimationFrame(up);
    }
}

function down() {
    if (gameOver === false && parseInt(car.css('top')) < container_height - car_height) {
        car.css('top', parseInt(car.css('top')) + 3);
        move_down = requestAnimationFrame(down);
    }
}

function repeat() {
    myMove('#line-1');
    myMove('#line-2');
    myMove('#line-3');
    animId = requestAnimationFrame(repeat);
}

function initGame() {
    animId = requestAnimationFrame(repeat);
}

initGame();