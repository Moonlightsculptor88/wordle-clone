'use strict'


//losers panel
//rule set should be displayed as soon as the website loads
//light and dark mode
//add all 5 letter words


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

let gameEnd = false






window.addEventListener('keydown' , handleKeydown)

function handleKeydown(e){



    if(e.ctrlKey || e.altKey){
        return
    }
    handleKey(e.key)
    
}



let panel = document.querySelector(".endgame")
let ruleset = document.querySelector(".rule-wrapper")

let cross = panel.querySelector(".cross")
let crossRule = ruleset.querySelector(".cross")

let info = document.getElementById('info')

info.addEventListener('click', ()=>{
    ruleset.style.opacity = "1"
    ruleset.style.pointerEvents = "all"
})

cross.addEventListener('click',()=>{
    panel.style.transform = "translateY(-200%)"
})

crossRule.addEventListener('click',()=>{
    ruleset.style.opacity = "0";
    ruleset.style.pointerEvents = "none"
})

function callEndGamePanel(isLose){
    let heading = document.createElement('h1')
    let subHeading = document.createElement('h3')
    let iframe = document.createElement('lottie-player')
    
    heading.classList.add('game-end-h1')
    subHeading.classList.add('game-end-h3')

    if(isLose){
        heading.textContent = "You Actually lost"
        subHeading.textContent = "damn we got a sore loser here"
        let text = document.createElement('p')
        text.textContent = "the secret word is '" + secret + "' :P" 
        panel.appendChild(text)
        iframe.setAttribute("src", "https://assets4.lottiefiles.com/packages/lf20_hfkrvixt.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop", "")
        iframe.setAttribute("autoplay", "")
    }

    else{
    if(attempts.length === 1){
        heading.textContent = "You Won"
        subHeading.textContent = "I wish you put in this effort into studying"
        iframe.setAttribute("src", "https://assets4.lottiefiles.com/packages/lf20_fixmre.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop", "")
        iframe.setAttribute("autoplay", "")
    }
    if(attempts.length === 2){
        heading.textContent = "You Won"
        subHeading.textContent = "Sending the money to your account, please give details"
        iframe.setAttribute("src", "https://assets4.lottiefiles.com/packages/lf20_lhvzRK.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop", "")
        iframe.setAttribute("autoplay", "")
    }
    if(attempts.length === 3){
        heading.textContent = "You Won"
        subHeading.textContent = "Need your bank details to send the gift card"
        iframe.setAttribute("src", "https://assets4.lottiefiles.com/packages/lf20_yBeV8a.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop", "")
        iframe.setAttribute("autoplay", "")
    }
    if(attempts.length === 4){
        heading.textContent = "You Won"
        subHeading.textContent = "There you go you won a whole castle"
        iframe.setAttribute("src", "https://assets4.lottiefiles.com/packages/lf20_KH7hdA.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop", "")
        iframe.setAttribute("autoplay", "")
    }
    if(attempts.length === 5){
        heading.textContent = "You Won"
        subHeading.textContent = "A glass of wine is what you get"
        iframe.setAttribute("src", "https://assets10.lottiefiles.com/packages/lf20_menpm2u0.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop","")
        iframe.setAttribute("autoplay","")
    }
    if(attempts.length === 6){
        heading.textContent = "You Won"
        subHeading.textContent = "Cutting it close now aren't we"
        iframe.setAttribute("src", "https://assets10.lottiefiles.com/private_files/lf30_kvdn44jg.json");
        iframe.setAttribute("background", "transparent");
        iframe.setAttribute("speed", "1");
        iframe.setAttribute("loop","")
        iframe.setAttribute("autoplay","")
    }
}
    panel.appendChild(iframe)
    panel.appendChild(heading)
    panel.appendChild(subHeading)
    
    panel.style.transform = "translateY(-50%)"
}

function winGame(){
    callEndGamePanel(false)
    
    gameEnd = true
    localStorage.removeItem('data')
}

function endGame(){
    callEndGamePanel(true)
}



function clearData(){
    localStorage.removeItem(data)
}



function handleKey(key){
    
    let letter = key.toLowerCase()

    if(gameEnd){
        return
    }

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

window.onload = function () {
    if (localStorage.getItem("hasCodeRunBefore") === null) {
        ruleset.style.opacity = 1;
        ruleset.style.pointerEvents = 'all';
        localStorage.setItem("hasCodeRunBefore", true);
    }
}



//Dark mode toggle

let darkToggle = document.getElementById('dark-toggle')

darkToggle.addEventListener('click', ()=>{
    darkToggle.classList.toggle('fa-sun')
    darkToggle.classList.toggle('fa-moon')

})