//部屋を移動する処理
const left = document.querySelector(".left")!
const right = document.querySelector(".right")!
const rooms : {[key:string]:HTMLElement}= {
    keyRoom: document.querySelector(".key-room")!,
    pianoRoom: document.querySelector(".piano-room")!,
    safeRoom: document.querySelector(".safe-room")!,
    woodRoom: document.querySelector(".wood-room")!
}

enum Room {
    Key,
    Piano,
    Safe,
    Wood
}

function deleteDisplayAllRooms() {
    Object.values(rooms).forEach((room:HTMLElement) => {
      hide(room)
    })
}

let whereYouAreNow = Room.Key

let message = document.querySelector(".message")!

function moveToRoom(roomName: string) {
    deleteDisplayAllRooms()
    display(rooms[roomName])
    switch (roomName) {
        case "keyRoom":
            whereYouAreNow = Room.Key
            break
        case "pianoRoom":
            whereYouAreNow = Room.Piano
            break
        case "safeRoom":
            whereYouAreNow = Room.Safe
            break
        case "woodRoom":
            whereYouAreNow = Room.Wood
            break
        default:
            break
    }
}

function messageReset(){
  message.innerHTML = ""
}

function display(element:HTMLElement){
  element.classList.add("display")
}

function hide(element:HTMLElement){
  element.classList.remove("display")
}

left.addEventListener('click', () => {
    switch (whereYouAreNow) {
        case Room.Key:
            moveToRoom("woodRoom")
            break
        case Room.Wood:
            moveToRoom("safeRoom")
            break
        case Room.Safe:
            moveToRoom("pianoRoom")
            break
        case Room.Piano:
            moveToRoom("keyRoom")
            break
    }
    messageReset()
})

right.addEventListener('click', () => {
    switch(whereYouAreNow) {
        case Room.Key:
            moveToRoom("pianoRoom")
            break
        case Room.Wood:
            moveToRoom("keyRoom")
            break
        case Room.Safe:
            moveToRoom("woodRoom")
            break
        case Room.Piano:
            moveToRoom("safeRoom")
            break
    }
})

let showMessageTaskId: NodeJS.Timeout | undefined

function showMessage(text) {
    const message = document.querySelector(".message")!
    message.innerHTML = `${text}`
    if (showMessageTaskId) {
        clearTimeout(showMessageTaskId)
    }
    showMessageTaskId = setTimeout(() => {
        if (!haveKey) {
            message.textContent = ""
        }
        showMessageTaskId = undefined
    }, 3000)
}

//鍵部屋の処理
const keyHole = document.querySelector(".key-hole")!
const hatiware = document.querySelector('.hatiware') as HTMLElement
keyHole.addEventListener('click', () => {
    if (haveKey) {
      const message = document.querySelector(".message")!
      message.innerHTML = "「もしかして、クリアしたってこと！？」<br>鍵穴から覗いていたのは奇妙な生き物だった"
      display(hatiware)
    } else {
        showMessage("鍵穴から誰かがのぞいている")
    }
})

//木の部屋の処理
const vase = document.querySelector('.vase') as HTMLElement
vase.addEventListener('click', () => {
    showMessage("この壺はどこかで見た事がある")
})
let vaseIsDragging = false
let startPosition = { x: 0, y: 0 }
let currentPositon = { x: 0, y: 0 }
vase.addEventListener('mousedown', (event: MouseEvent) => {
    vaseIsDragging = true
    startPosition = {
        x: event.clientX - vase.offsetLeft,
        y: event.clientY - vase.offsetTop
    }
})

vase.addEventListener('mousemove', (event: MouseEvent) => {
    if (vaseIsDragging) {
        event.preventDefault()
        currentPositon = {
            x: event.clientX - startPosition.x,
            y: event.clientY - startPosition.y
        }

        if (currentPositon.x < 0) {
            currentPositon.x = 0
        } else if (currentPositon.x > 450 - vase.offsetWidth) {
            currentPositon.x = 450 - vase.offsetWidth
        }

        vase.style.left = currentPositon.x + 'px'
    }
})

vase.addEventListener('mouseup', () => {
    vaseIsDragging = false
    showMessage("")
})

vase.addEventListener('mouseleave', () => {
    vaseIsDragging = false
})

const board = document.querySelector('.board') as HTMLElement
const hint = document.querySelector('.hint') as HTMLElement
const woodBlack = document.querySelector('.wood-black') as HTMLElement
board.addEventListener('click', () => {
    display(hint)
    display(woodBlack)
    showMessage("落書きだ、何のヒントにもならない")
})
woodBlack.addEventListener('click', () => {
    hide(hint)
    hide(woodBlack)
})

//ピアノの部屋の処理
const piano = document.querySelector('.piano') as HTMLElement
const keyboard = document.querySelector('.keyboard') as HTMLElement
const pianoBlack = document.querySelector('.piano-black') as HTMLElement
piano.addEventListener('click', () => {
    display(keyboard)
    display(pianoBlack)
    showMessage("どうみてもただの落書きだ")
})
pianoBlack.addEventListener('click', () => {
    hide(keyboard)
    hide(pianoBlack)
})

//金庫部屋の処理
const safe = document.querySelector('.safe') as HTMLElement
const form = document.querySelector('.form') as HTMLElement
const safeBlack = document.querySelector('.safe-black') as HTMLElement
safe.addEventListener('click', () => {
    if (!haveKey) {
        display(form)
        display(safeBlack)
        showMessage("この中には鍵が入っている気がする")
    }
})
safeBlack.addEventListener('click', () => {
    hide(form)
    hide(safeBlack)
})

let haveKey = false
function checkAnswer() {
    const correctAnswer = "5856"
    const answerInput = document.getElementById("answer") as HTMLInputElement
    let answer = answerInput.value
    if (answer === correctAnswer) {
        showMessage("中には鍵が入っていた。鍵を入手した")
        hide(form)
        hide(safeBlack)
        haveKey = true
    } else {
        showMessage("違うようだ")
        answerInput.value = ""
    }
    return false
}
