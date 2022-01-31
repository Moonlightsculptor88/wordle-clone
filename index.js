'use strict'


//Animations
//Ending the game on getting the right word
//losers panel
//rule set should be displayed as soon as the website loads


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

function winGame(){
    alert('Game over, Good JOB hobbo')
}

function clearData(){
    localStorage.clear()
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
        if(currAttempt === secret){
           const time = setTimeout(winGame, 1000)
            
        }
        if((attempts.length === 5 && currAttempt !== secret)){
            const time = setTimeout(endGame, 500)
        }
        attempts.push(currAttempt)
        currAttempt = ''
        
        updateKeyboard()
        flipAnimate()
        saveGame()
        if(attempts.length === 6){
            clearData()
        }
    } else if (letter === 'backspace'){
        currAttempt = currAttempt.slice(0, currAttempt.length - 1)
    } else if(/[a-zA-Z]/.test(letter) && (letter.length === 1)){
        if(currAttempt.length < 5){
            currAttempt += letter
        }
    }
    
    updateGrid()
    
}

function addClasses(i, row){
    for(let j = 0; j < 5; j++){
        row[i].children[j].children[1].classList.add("back-flip" + (j+1))
        row[i].children[j].children[0].classList.add("front-flip" + (j+1))
    }
}

function flipAnimate(isCurrAttempt){

    let row = grid.children

    if(attempts.length ){
        for(let i = 0; i < attempts.length; i++){
            addClasses(i, row)
        }
    }

    if(isCurrAttempt){
        let rowIndex = attempts.length - 1


        addClasses(rowIndex, row)
    }
    
}

function getBackRow(){
    let row = grid.children

    
}


function buildGrid(){
    for(let i = 0; i < 6; i++){
        let row = document.createElement('div');
        row.className = "row";
        for(let j = 0; j < 5; j++){
            let cell = document.createElement('div');
            cell.className = "cell";
            let front = document.createElement('div')
            let back = document.createElement('div')
            front.className = "front-cell"
            back.className = "back-cell"
            cell.appendChild(front)
            cell.appendChild(back)
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
    if(row){
        drawAttempt(row, currAttempt, true)
        
    }
}

function drawAttempt(row, attempt, isCurrAttempt){
    for(let i = 0; i < 5; i++){
        let cell = row.children[i]
        let front = cell.children[0]
        let back = cell.children[1]
        front.textContent = attempt[i] 
        back.textContent = attempt[i] 
        if(front.textContent === attempt[i]){
            front.style.border = '2px solid rgb(110, 110, 110)'
            front.classList.add("cell-animate")
        }
        else{
            front.style.border = '2px solid rgb(66, 66, 66)'
            front.classList.remove("cell-animate")
        }
        if(!isCurrAttempt){
            back.textContent = attempt[i]
            back.style.backgroundColor = getColor(attempt , i)
            back.style.border = 'none'
            flipAnimate(false)
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

function loadGame(){
    console.log('hello');
    let data 
    try{
        data = JSON.parse(localStorage.getItem('data'))
    }catch{}
    if(data !== null){
        secret = data.secret
        attempts = data.attempts
        
    }
    
}

function saveGame(){
    let data =JSON.stringify({
        secret,
        attempts
    })
    try{
        localStorage.setItem('data', data)
    }catch{ 
    }
    
}


let grid = document.querySelector('#grid')
let keyboard = document.querySelector('#keyboard')
let keyboardButtons = new Map()

loadGame()
buildGrid()
buildKeyboard()
updateGrid()
updateKeyboard()