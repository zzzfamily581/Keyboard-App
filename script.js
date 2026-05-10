const screen = document.getElementById("textbox");
const cursor = document.getElementById("cursor");
const cbtn = document.getElementById("copy")
const popSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
let cursorPosLeft = 17;
let cursorPosTop = 11;
let numC = 0;
let historyL = [];
let historyT = [];

function typeletter(letter) {
    screen.value = screen.value + letter + ' ';

    numC = letter.length + 1;
    historyL.push(numC);
    cursorPosLeft += (numC * 8);
    cursor.style.left = cursorPosLeft + "px"; 
    cbtn.style.backgroundColor = "#e0fb3b";
}

function addspace() {
    screen.value = screen.value + '  ';
    numC = 2;
    historyL.push(numC);
    cursorPosLeft += (numC * 8);
    cursor.style.left = cursorPosLeft + "px";
    cbtn.style.backgroundColor = "#e0fb3b";
}

function backspace() {
    if (historyL.length > 0){
        const lastLetter = historyL.pop();
        screen.value = screen.value.slice(0 , -lastLetter);
        cbtn.style.backgroundColor = "#e0fb3b";

        if (lastLetter > 1){
            cursorPosLeft-= (lastLetter* 8)
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
    cbtn.style.backgroundColor = "#e0fb3b";
    historyL.push(numC);
    historyT.push(cursorPosLeft);
    cursorPosLeft = 17;
    cursor.style.left = cursorPosLeft +"px";
    cursorPosTop += 16 ;
    cursor.style.top = cursorPosTop +"px";
}

async function copy() {
    try {
        await navigator.clipboard.writeText(screen.value);
        cbtn.style.backgroundColor = "#00ff22";
    }
    catch (err) {
        console.error("Failed to copy text:", err)
        cbtn.style.backgroundColor = "#ff0202";
    }
}

cbtn.addEventListener('click', () => {
    popSound.currentTime = 0;
    popSound.play();
});