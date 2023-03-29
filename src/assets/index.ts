//部屋を移動する処理
const left = document.querySelector(".left")!
const right = document.querySelector(".right")!
enum room {
    key,
    piano,
    safe,
    wood
}

function moveToKeyRoom() {
    document.querySelector(".key-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".piano-room,.safe-room,.wood-room")!
    rooms.forEach(room => {
        room.classList.remove("display")
    }
    )
    whereYouAreNow = room.key
}

function moveToPianoRoom() {
    document.querySelector(".piano-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".key-room,.safe-room,.wood-room")!
    rooms.forEach(room => {
        room.classList.remove("display")
    }
    )
    whereYouAreNow = room.piano
}

function moveToSafeRoom() {
    document.querySelector(".safe-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".piano-room,.key-room,.wood-room")!
    rooms.forEach(room => {
        room.classList.remove("display")
    }
    )
    whereYouAreNow = room.safe
}

function moveToWoodRoom() {
    document.querySelector(".wood-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".piano-room,.safe-room,.key-room")!
    rooms.forEach(room => {
        room.classList.remove("display")
    }
    )
    whereYouAreNow = room.wood
}

let whereYouAreNow = room.key

left.addEventListener('click', function () {
    if (whereYouAreNow == room.key) {
        moveToWoodRoom()
    } else if (whereYouAreNow == room.wood) {
        moveToSafeRoom()
    } else if (whereYouAreNow == room.safe) {
        moveToPianoRoom()
    } else if (whereYouAreNow == room.piano) {
        moveToKeyRoom()
    }
    showMessage("")
})

right.addEventListener('click', function () {
    if (whereYouAreNow == room.key) {
        moveToPianoRoom()
    } else if (whereYouAreNow == room.wood) {
        moveToKeyRoom()
    } else if (whereYouAreNow == room.safe) {
        moveToWoodRoom()
    } else if (whereYouAreNow == room.piano) {
        moveToSafeRoom()
    }
    showMessage("")
})

let timeoutId: NodeJS.Timeout | undefined;

function showMessage(text) {
    const message = document.querySelector(".message")
    message!.textContent = `${text}`
    if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        message!.textContent = ""
        timeoutId = undefined;
    }, 3000)
}

//鍵部屋の処理
const keyHole = document.querySelector(".key-hole")!
keyHole.addEventListener('click', function () {
    showMessage("鍵穴から誰かがのぞいている")
})

//木の部屋の処理
const vase = document.querySelector('.vase') as HTMLElement
vase.addEventListener('click', function () {
    showMessage("この壺はどこかで見た事がある")
})
let isDragging = false
let startPosition = { x: 0, y: 0 }
let currentPositon = { x: 0, y: 0 }
vase.addEventListener('mousedown', (event: MouseEvent) => {
    isDragging = true
    startPosition = {
        x: event.clientX - vase.offsetLeft,
        y: event.clientY - vase.offsetTop
    }
})

vase.addEventListener('mousemove', (event: MouseEvent) => {
    if (isDragging) {
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
    isDragging = false
    showMessage("")
})

vase.addEventListener('mouseleave', () => {
    isDragging = false
})

const board = document.querySelector('.board') as HTMLElement
const hint = document.querySelector('.hint') as HTMLElement
const woodBlack = document.querySelector('.wood-black') as HTMLElement
board.addEventListener('click', () => {
    hint.classList.add("display")
    woodBlack.classList.add("display")
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
    let answer = answerInput.value;
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

