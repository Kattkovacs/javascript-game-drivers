function initGame() {
    myMove('line-1');
    myMove('line-2');
    myMove('line-3');
}

function myMove(line) {
    const elem = document.getElementById(line);
    const style = getComputedStyle(elem);
    console.log(style.top);
    let position = parseInt(style.top);
    const id = setInterval(frame, 10);
    function frame() {
    if (position === 1000) {
        clearInterval(id);
    } else {
        position++;
        elem.style.top = position + 'px';
    }
  }
}


initGame();