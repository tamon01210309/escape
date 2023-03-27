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
        room.classList.remove("display");
      }
    )
    whereYouAreNow = room.key
}

function moveToPianoRoom() {
    document.querySelector(".piano-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".key-room,.safe-room,.wood-room")!
    rooms.forEach(room => {
        room.classList.remove("display");
      }
    )
    whereYouAreNow = room.piano
}

function moveToSafeRoom() {
    document.querySelector(".safe-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".piano-room,.key-room,.wood-room")!
    rooms.forEach(room => {
        room.classList.remove("display");
      }
    )
    whereYouAreNow = room.safe
}

function moveToWoodRoom() {
    document.querySelector(".wood-room")!.classList.add("display")
    const rooms = document.querySelectorAll(".piano-room,.safe-room,.key-room")!
    rooms.forEach(room => {
        room.classList.remove("display");
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
})
