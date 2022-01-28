'use strict'



let wordList = [
   'horse',
   'house',
   'kitty',
   'piano',
   'phone',
   'tesla',
   'cream',
   'juice',
   'panic',
   'pivot',
   'dense',
   'brain',
   'house',
   'about',
   'boobs'
   
]



let index = Math.floor(Math.random() * wordList.length)
let secret = wordList[index]

let attempts = []
let currAttempt = ''




window.addEventListener('keydown' , handleKeydown)

function handleKeydown(e){
    if(e.ctrlKey || e.altKey){
        return
    }
    handleKey(e.key)
    
}

function endGame(){
    alert(secret)
}

function handleKey(key){
    
    let letter = key.toLowerCase()

    if(letter === 'enter' ){
        if(currAttempt.length < 5){
            return
        }
        if(!wordList.includes(currAttempt)){
            alert('Not in List')
            return
        }
        if(attempts.length === 5 && currAttempt !== secret){
            endGame()
        }
        attempts.push(currAttempt)
        currAttempt = ''
        updateKeyboard()
    } else if (letter === 'backspace'){
        currAttempt = currAttempt.slice(0, currAttempt.length - 1)
    } else if(/[a-z]/.test && (letter.length === 1)){
        if(currAttempt.length < 5){
            currAttempt += letter
        }
    }
    updateGrid();
}

function buildGrid(){
    for(let i = 0; i < 6; i++){
        let row = document.createElement('div');
        row.className = "row";
        for(let j = 0; j < 5; j++){
            let cell = document.createElement('div');
            cell.className = "cell";
            cell.textContent = "";
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
}

function updateGrid(){
    let row = grid.children[0];
    for(let attempt of attempts){
        drawAttempt(row, attempt, false)
        row = row.nextSibling
    }
    drawAttempt(row, currAttempt, true)
}

function drawAttempt(row, attempt, isCurrAttempt){

    for(let i = 0; i < 5; i++){
        let cell = row.children[i]
        cell.textContent = attempt[i] 
        if(isCurrAttempt){
            cell.style.backgroundColor = "#111"
        }
        else{
            let cell = row.children[i]
            cell.textContent = attempt[i]
            cell.style.backgroundColor = getColor(attempt , i)
    } 
    }
    
     
}

let green = "#538d4e"
let grey = "#333333"
let yellow = "#b59f3b"


function getColor(attempt, i){
    let correctLetter = secret[i]
    let attemptLetter = attempt[i]

    

    if(secret.indexOf(attemptLetter) === -1){
        return grey
    }
    if(correctLetter === attemptLetter){
        return green
    }
    return yellow

}

function buildKeyboard(){
    buildKeyboardRow('qwertyuiop', false)
    buildKeyboardRow('asdfghjkl', false)
    buildKeyboardRow('zxcvbnm', true)

}

function buildKeyboardRow(letters, isLast){
    let row = document.createElement('div')
    if(isLast){
        let button = document.createElement('button')
        button.classList.add("keyboard-button")
        button.classList.add("enter-button")
        button.textContent = "Enter"
        button.onclick = ()=>{
            handleKey('enter')
        };
        row.appendChild(button)
    }
    row.classList.add('keyboard-row')
    for(let letter of letters){
        let button = document.createElement('button')
        button.classList.add("keyboard-button")
        button.textContent = letter
        button.onclick = ()=>{
            handleKey(letter)
        };
        keyboardButtons.set(letter, button)
        row.appendChild(button)
    }
    if(isLast){
        let button = document.createElement('button')
        button.classList.add("keyboard-button")
        button.classList.add("backspace-button")
        button.textContent = "backspace"
        button.onclick = ()=>{
            handleKey('backspace')
        };
        row.appendChild(button)
    }
    keyboard.appendChild(row)
}

function getBetterColor(a, b){
    if(a === green || b === green){
        return green
    }
    if(a === yellow || b === yellow){
        return yellow
    }
    return grey
}

function updateKeyboard(){
    let bestColors = new Map()
    for(let attempt of attempts){
        for(let i = 0; i < 5; i++){
            let color = getColor(attempt, i)
            let key = attempt[i]
            let bestColor = bestColors.get(key)
            bestColors.set(key, getBetterColor(color, bestColor))
        }
    }
    for(let [key,button] of keyboardButtons){
        button.style.backgroundColor = bestColors.get(key)
    }
}

let grid = document.querySelector('#grid')
let keyboard = document.querySelector('#keyboard')
let keyboardButtons = new Map()
buildGrid()
buildKeyboard();
updateGrid()