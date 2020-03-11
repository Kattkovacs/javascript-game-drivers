let animId;



function myMove(line) {
    const elem = document.getElementById(line);
    const style = getComputedStyle(elem);
    let line_current_top = parseInt(style.top);
    if (line_current_top > 600) {
            line_current_top = -300;
        }
        elem.style.top = String(line_current_top + 3) + 'px';
}

function repeat() {
    myMove('line-1');
    myMove('line-2');
    myMove('line-3');
    animId = requestAnimationFrame(repeat);
}

function initGame() {
    animId = requestAnimationFrame(repeat);
}

initGame();