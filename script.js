const screen = document.getElementById("textbox");
const cursor = document.getElementById("cursor");
const btn = document.getElementById("copy")
const popSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
let cursorPosLeft = 10;
let cursorPosTop = 7;
let numC = 0;
let historyL = [];
let historyT = [];

function typeletter(letter) {
    screen.value = screen.value + letter + ' ';

    numC = letter.length + 1;
    historyL.push(numC);
    cursorPosLeft += (numC * 7);
    cursor.style.left = cursorPosLeft + "px"; 
    btn.style.backgroundColor = "rgb(0, 155, 64)";
}

function addspace() {
    screen.value = screen.value + '  ';
    numC = 2;
    historyL.push(numC);
    cursorPosLeft += (numC * 7);
    cursor.style.left = cursorPosLeft + "px";
    btn.style.backgroundColor = "rgb(0, 155, 64)";
}

function backspace() {
    if (historyL.length > 0){
        const lastLetter = historyL.pop();
        screen.value = screen.value.slice(0 , -lastLetter);
        btn.style.backgroundColor = "rgb(0, 155, 64)";

        if (lastLetter > 1){
            cursorPosLeft-= (lastLetter* 7)
            cursor.style.left = cursorPosLeft + "px";
        }
        else {
            cursorPosLeft = historyT.pop();
            cursorPosTop -= 16 ;
            cursor.style.top = cursorPosTop + "px";
            cursor.style.left = cursorPosLeft + "px";
        }
    }
}

function enter() {
    screen.value = screen.value + "\n";
    numC = 1 ;
    btn.style.backgroundColor = "rgb(0, 155, 64)";
    historyL.push(numC);
    historyT.push(cursorPosLeft);
    cursorPosLeft = 10;
    cursor.style.left = cursorPosLeft +"px";
    cursorPosTop += 16 ;
    cursor.style.top = cursorPosTop +"px";
}

async function copy() {
    try {
        await navigator.clipboard.writeText(screen.value);
        btn.style.backgroundColor = "#00ff22";
    }
    catch (err) {
        console.error("Failed to copy text:", err)
        btn.style.backgroundColor = "#ff0202";
    }
}

btn.addEventListener('click', () => {
    popSound.currentTime = 0;
    popSound.play();
});