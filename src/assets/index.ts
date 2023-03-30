//部屋を移動する処理
const left = document.querySelector(".left")!
const right = document.querySelector(".right")!
const rooms = {
    keyRoom: document.querySelector(".key-room")!,
    pianoRoom: document.querySelector(".piano-room")!,
    safeRoom: document.querySelector(".safe-room")!,
    woodRoom: document.querySelector(".wood-room")!
}

enum room {
    key,
    piano,
    safe,
    wood
}

function deleteDisplayAllRooms() {
    Object.values(rooms).forEach(room => {
        room!.classList.remove("display")
    })
}

let whereYouAreNow = room.key

function moveToRoom(roomName: string) {
    deleteDisplayAllRooms()
    rooms[roomName].classList.add("display")
    switch (roomName) {
        case "keyRoom":
            whereYouAreNow = room.key
            break
        case "pianoRoom":
            whereYouAreNow = room.piano
            break
        case "safeRoom":
            whereYouAreNow = room.safe
            break
        case "woodRoom":
            whereYouAreNow = room.wood
            break
        default:
            break
    }
}

left.addEventListener('click', () => {
    switch (whereYouAreNow) {
        case room.key:
            moveToRoom("woodRoom")
            break
        case room.wood:
            moveToRoom("safeRoom")
            break
        case room.safe:
            moveToRoom("pianoRoom")
            break
        case room.piano:
            moveToRoom("keyRoom")
            break
    }
    const message = document.querySelector(".message")!
    message.innerHTML = ""
})

right.addEventListener('click', () => {
    switch(whereYouAreNow) {
        case room.key:
            moveToRoom("pianoRoom")
            break
        case room.wood:
            moveToRoom("keyRoom")
            break
        case room.safe:
            moveToRoom("woodRoom")
            break
        case room.piano:
            moveToRoom("safeRoom")
            break
    }
    const message = document.querySelector(".message")!
    message.innerHTML = ""
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
    if (!haveKey) {
        showMessage("鍵穴から誰かがのぞいている")
    } else {
        const message = document.querySelector(".message")!
        message.innerHTML = "「もしかして、クリアしたってこと！？」<br>鍵穴から覗いていたのは奇妙な生き物だった"
        hatiware.classList.add("display")
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
    hint.classList.add("display")
    woodBlack.classList.add("display")
    showMessage("落書きだ、何のヒントにもならない")
})
woodBlack.addEventListener('click', () => {
    hint.classList.remove("display")
    woodBlack.classList.remove("display")
})

//ピアノの部屋の処理
const piano = document.querySelector('.piano') as HTMLElement
const keyboard = document.querySelector('.keyboard') as HTMLElement
const pianoBlack = document.querySelector('.piano-black') as HTMLElement
piano.addEventListener('click', () => {
    keyboard.classList.add("display")
    pianoBlack.classList.add("display")
    showMessage("どうみてもただの落書きだ")
})
pianoBlack.addEventListener('click', () => {
    keyboard.classList.remove("display")
    pianoBlack.classList.remove("display")
})

//金庫部屋の処理
const safe = document.querySelector('.safe') as HTMLElement
const form = document.querySelector('.form') as HTMLElement
const safeBlack = document.querySelector('.safe-black') as HTMLElement
safe.addEventListener('click', () => {
    if (!haveKey) {
        form.classList.add("display")
        safeBlack.classList.add("display")
        showMessage("この中には鍵が入っている気がする")
    }
})
safeBlack.addEventListener('click', () => {
    form.classList.remove("display")
    safeBlack.classList.remove("display")
})

let haveKey = false
function checkAnswer() {
    const correctAnswer = "5856"
    const answerInput = document.getElementById("answer") as HTMLInputElement
    let answer = answerInput.value
    if (answer === correctAnswer) {
        showMessage("中には鍵が入っていた。鍵を入手した")
        form.classList.remove("display")
        safeBlack.classList.remove("display")
        haveKey = true
    } else {
        showMessage("違うようだ")
        answerInput.value = ""
    }
    return false
}
