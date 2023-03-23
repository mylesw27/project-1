// DOM Selectors
const scoreboard = document.querySelector("#scoreboard")
const clock = document.querySelector("#clock")
const userScoreDisplay = document.querySelector("#userScore")
const compScoreDisplay = document.querySelector("#compScore")
const canvas = document.querySelector("canvas")
const joImg1 = document.querySelector("#joImg1")
const joImg2 = document.querySelector("#joImg2")
const joImg3 = document.querySelector("#joImg3")
const joImg4 = document.querySelector("#joImg4")
const defenderImg1 = document.querySelector("#defenderImg1")
const defenderImg2 = document.querySelector("#defenderImg2")
const defenderImg3 = document.querySelector("#defenderImg3")
const defenderImg4 = document.querySelector("#defenderImg4")
const defenderflippedImg1 = document.querySelector("#defenderImg1flipped")
const defenderflippedImg2 = document.querySelector("#defenderImg2flipped")
const defenderflippedImg3 = document.querySelector("#defenderImg3flipped")
const defenderflippedImg4 = document.querySelector("#defenderImg4flipped")
const defenderUpImg1 = document.querySelector("#defenderUp1")
const defenderUpImg2 = document.querySelector("#defenderUp2")
const defenderDownImg1 = document.querySelector("#defenderDown1")
const defenderDownImg2 = document.querySelector("#defenderDown2")
const teammateImg1 = document.querySelector("#teammate1")
const teammateImg2 = document.querySelector("#teammate2")

const arrowkeys = document.querySelector("#arrowkeys")

// Canvas Setup
const ctx = canvas.getContext("2d")
// Set canvas resolution (Current resolution = 500 x 1200)
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', 600)

let originX = 0
let originY = 0 
let isTouchdown = false
let isTackled = false
let isOutOfBounds = false
let userScore = 0
let compScore = 0
let totalGameTime = 120
let gameClockMinutes = Math.floor(totalGameTime / 60)
let gameClockSeconds = totalGameTime % 60
let gameActive = false
let touchDownActive = false
clock.innerText = `${gameClockMinutes} : ${gameClockSeconds}`
const joImgArray = [joImg1, joImg2, joImg3, joImg4]
const defenderImgArray = [defenderImg1, defenderImg2, defenderImg3, defenderImg4]
const defenderflippedImgArray = [defenderflippedImg1, defenderflippedImg2, defenderflippedImg3, defenderflippedImg4]
const defenderUpImgArray = [defenderUpImg1, defenderUpImg2]
const defenderDownImgArray = [defenderDownImg1, defenderDownImg2]
const teammateImgArray = [teammateImg1, teammateImg2]
let joCurrentImage = 0
let defenderCurrentImage = 0
let defenderVerticalImage = 0
let teammateCurrentImage = 0
let sideScrollActive = true
let titleScreenActive = true

const titleScreen = setInterval(function() {

    ctx.textAlign = "center"
    ctx.fillStyle = "White"
    ctx.font = "25px bungee"
    ctx.fillText ("Welcome to", 300, 100)
    ctx.font = "50px bungee"
    ctx.textAlign = "center"
    ctx.fillText ("MVP SUPERBACK", 300, 200)
    ctx.fillText ("FOOTBALL", 300, 300)
    ctx.drawImage (arrowkeys, 100, 300, 400, 600)
}, 60)



const clearTitleScreen =  function() {
    titleScreenActive = false
    clearInterval(titleScreen)
    scoreboard.style.display = "grid"
    joBackson.x = 150
    originX = 60
    const titleScreenTransition = setInterval(function() {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        renderField()
        renderPlayers()
        joBackson.x += 5
        originX -= 5
    }, 60)
    setTimeout(function() {
        clearInterval(titleScreenTransition)
        gameActive = true
    }, 720)
}

const joImgMove = function (){
    if (joCurrentImage >= joImgArray.length - 1){
        joCurrentImage = 0
    } else {
        joCurrentImage ++
    }    
}

const defenderImgMove = function (){
    if (defenderCurrentImage >= defenderImgArray.length - 1){
        defenderCurrentImage = 0
    } else {
        defenderCurrentImage ++
    }    
}

const defenderUpImgMove = function (){
    if (defenderVerticalImage >= defenderUpImgArray.length - 1){
        defenderVerticalImage = 0
    } else {
        defenderVerticalImage ++
    }    
}

const teammateImgMove = function (){
    if (teammateCurrentImage >= teammateImgArray.length - 1){
        teammateCurrentImage = 0
    } else {
        teammateCurrentImage ++
    }  
}

const joImgInterval = setInterval(joImgMove, 350)
const defenderImgInterval = setInterval(defenderImgMove, 350)
// const defenderflippedImgInterval = setInterval(defenderflippedImgMove, 350)
const defenderVerticalImageInterval = setInterval(defenderUpImgMove, 350)
const teammateImageInterval = setInterval(teammateImgMove, 350)

const clockTick = function(){
    // reduce clock by 1 second if game is active and total time is more than zero
    if (gameActive && totalGameTime > 0) {
        totalGameTime -= 1
        gameClockMinutes = Math.floor(totalGameTime / 60)
        gameClockSeconds = totalGameTime % 60
        // console.log("tick")
    } else if (totalGameTime > 0){
        gameClockMinutes = Math.floor(totalGameTime / 60)
        gameClockSeconds = totalGameTime % 60
    }  else if (totalGameTime <= 0) {
        gameClockMinutes = 0
        gameClockSeconds = 0
    }
    // Adds 0 to display when clock is less than 10 seconds 
    if (gameClockSeconds <= 9) {
        clock.innerText = `${gameClockMinutes} : 0${gameClockSeconds}`
    } else {
        clock.innerText = `${gameClockMinutes} : ${gameClockSeconds}`
    }
}
let renderField = function () {
    // Create End Zones
    ctx.fillStyle = "blue"
    ctx.fillRect(originX+15, originY+20, 100, 650) // Left End Zone
    ctx.fillStyle = "red"
    ctx.fillRect(originX+1080, originY+20, 100, 650) // Right End Zone


    // Create Side Lines
    ctx.fillStyle = "white"
    ctx.fillRect(originX+15, originY+10, 1180, 10) // Top Sideline
    ctx.fillRect(originX+15, originY+670, 1180, 10) // Bottom Sideline
    ctx.fillRect(originX+5, originY+10, 15, 670) // Back of end zone - Left End Zone
    ctx.fillRect(originX+1180, originY+20, 15, 650) // Back of end zone - Right End zone

    // Create Yardage Lines (Current field is 980 px wide by 460px tall, each line marked 98 pixels apart)
    ctx.fillRect (originX+115, originY+20, 1, 650) // goal line - Left End Zone
    ctx.fillRect (originX+208, originY+20, 1, 650) // 10 Yard Line
    ctx.fillRect (originX+306, originY+20, 1, 650) // 20 Yard Line
    ctx.fillRect (originX+404, originY+20, 1, 650) // 30 Yard Line
    ctx.fillRect (originX+502, originY+20, 1, 650) // 40 Yard Line
    ctx.fillRect (originX+600, originY+20, 1, 650) // 50 Yard Line
    ctx.fillRect (originX+698, originY+20, 1, 650) // opp 40 Yard Line
    ctx.fillRect (originX+796, originY+20, 1, 650) // opp 30 Yard Line
    ctx.fillRect (originX+894, originY+20, 1, 650) // opp 20 Yard Line
    ctx.fillRect (originX+992, originY+20, 1, 650) // opp 10 Yard Line
    ctx.fillRect (originX+1080, originY+20, 1, 650) // goal line - Right End Zone
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

let compDriveTime = 0
let compDriveYards = 0
let compDriveScore = 0

let computerDriveLogic = function() {
    if (totalGameTime > 0) {
        compDriveTime = getRandomInt(30)
        if (totalGameTime <= 0) {
            totalGameTime = 0
            clock.innerText = "0:00"
        } else {
            totalGameTime = totalGameTime - compDriveTime
        }
        clockTick()
        compDriveYards = getRandomInt (100)
        if (compDriveYards > 75) {
            compDriveScore = 7
            compScore = compScore + compDriveScore
            compScoreDisplay.innerText = compScore
        } else {
            compDriveScore = 0
        }
    } 
}

let renderComputerDriveSummary = function () {
    ctx.strokeStyle = "redorange"
    ctx.beginPath()
    ctx.roundRect(148, 48, 316, 466, 5)
    ctx.stroke()
    ctx.fillStyle = "orange"
    ctx.roundRect(150, 50, 300, 450, 5)
    ctx.fill()
    ctx.textAlign = "center"
    ctx.fillStyle = "black"
    ctx.font = "25px bungee"
    ctx.fillText ("Defender's", 300, 100)
    ctx.fillText ("Drive Summary", 300, 130)
    ctx.textAlign = "left"
    ctx.fillText ("Time :", 165, 200)
    ctx.fillText ("Yards :", 165, 300)
    ctx.fillText ("Points :", 165, 400)
    ctx.textAlign = "right"
    if (compDriveTime <= 9) {
        ctx.fillText (`0:0${compDriveTime}`, 425, 200)
    } else {
        ctx.fillText (`0:${compDriveTime}`, 425, 200)
    }
    ctx.fillText (`${compDriveYards}`, 425, 300)
    ctx.fillText (`${compDriveScore}`, 425, 400)
    if (gameClockSeconds <=9) {
        clock.innerText = `${gameClockMinutes} : 0${gameClockSeconds}`
    } else {
        clock.innerText = `${gameClockMinutes} : ${gameClockSeconds}`
    }
}


//Create Classes
// Overarching class for all football players
class fbPlayer {
    constructor(x, y, color) {
        this.x = x + originX
        this.y = y
        this.width = 25
        this.height = 60
        this.color = color
    }
    
    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x+originX, this.y+originY, this.width, this.height)
    }
}

// Child class of football players for user player
class userFBPlayer extends fbPlayer {
    constructor (x, y) {
        super(x, y)
        this.color = "white"
    }

    render() {
        ctx.fillStyle = this.color
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.ellipse(this.x+12, this.y+55, 15, 10, 0, 0, 2 * Math.PI)
        ctx.stroke()
        ctx.drawImage(joImgArray[joCurrentImage], this.x, this.y, 25, 60)
    }
}

// Child class of football players for teammates
class teammate extends fbPlayer {
    constructor (x, y) {
        super(x, y)
        this.color = "white"
    }

    render() {
        ctx.drawImage(teammateImgArray[teammateCurrentImage], this.x+originX, this.y+originY, 25, 60)
    }
}

// Child class of football players for defenders
class defender extends fbPlayer {
    constructor (x, y, color, number) {
        super(x, y, color)
        this.color = color
        this.playerNumber = `${number}`
    }

    render() {
        ctx.fillStyle = this.color
        // ctx.fillRect(this.x, this.y, this.width, this.height)
        if (joBackson.x < this.x+originX) {
            ctx.drawImage(defenderImgArray[defenderCurrentImage], this.x+originX, this.y+originY, 25, 60)
        } else if (joBackson.x > this.x+originX) {
            ctx.drawImage(defenderflippedImgArray[defenderCurrentImage], this.x+originX, this.y+originY, 25, 60)
        } else if (joBackson.x === this.x+originX && joBackson.y < this.y+originY) {
            ctx.drawImage(defenderUpImgArray[defenderVerticalImage], this.x+originX, this.y+originY, 25, 60)
        } else if (joBackson.x === this.x+originX && joBackson.y > this.y+originY) {
            ctx.drawImage(defenderDownImgArray[defenderVerticalImage], this.x+originX, this.y+originY, 25, 60)
        }
    }
}


// Game objects
// const newPlayer = new fbPlayer(256, 220, "purple")  // Test Player 
const joBackson = new userFBPlayer(210,220)
const defender1 = new defender(580, 75, 1) // CB (top of screen)
const defender2 = new defender(1000, 186, 2) // Safety (top of screen)
const defender3 = new defender(450, 150, 3) // DE (top of screen)
const defender4 = new defender(800, 150, 4) // OLB (top of screen)
const defender5 = new defender(450, 220, 5) // DT (top of screen)
const defender6 = new defender(700, 250, 6) // MLB
const defender7 = new defender(450, 300, 7) // DT (bottom of screen)
const defender8 = new defender(700, 350, 8) // OLB (bottom of screen)
const defender9 = new defender(450, 400, 9) // (DE (bottom of screen)
const defender10 = new defender(1000, 400, 10) // Safety (bottom of screen)
const defender11 = new defender(580, 525, 11) // CB (bottom of screen)
const teammate1 = new teammate(295, 220)
const teammate2 = new teammate(300, 75)
const teammate3 = new teammate(310, 170)
const teammate4 = new teammate(310, 190)
const teammate5 = new teammate(310, 210)
const teammate6 = new teammate(310, 230)
const teammate7 = new teammate(310, 250)
const teammate8 = new teammate(310, 275)
const teammate9 = new teammate(300, 420)
const teammate10 = new teammate(300, 475)

// console.log(teammateImgArr)

const renderPlayers = function(){
    // newPlayer.render() // Test Player
    joBackson.render()
    defenderArray.forEach(function(i){
        i.render()
    })
    teammateArray.forEach(function(i){
        i.render()
    })
}

const gameLoopInterval = setInterval(gameLoop, 60)
const clockTickInterval = setInterval(clockTick, 1000)
const defenderArray = [defender1, defender2, defender3, defender4, defender5, defender6, defender7, defender8, defender9, defender10, defender11,]
const defenderOriginX = [580, 1000, 450, 800, 450, 700, 450, 700, 450, 1000, 580]
const defenderOriginY = [75, 186, 150, 150, 220, 250, 300, 350, 400, 400, 525]
const teammateArray = [teammate1, teammate2, teammate3, teammate4, teammate5, teammate6, teammate7, teammate8, teammate9, teammate10]
const teammateOriginX = [295, 300, 310, 310, 310, 310, 310, 310, 300, 300]
const teammateOriginY = [220, 75, 170, 190, 210, 230, 250, 275, 420, 475]


// Check for touchdown collision
const touchdownCheck = function() {
    if (joBackson.x + joBackson.width > 1080 + originX) {
        gameActive = false
        userScore += 7
        userScoreDisplay.innerText = `${userScore}`
        ctx.font = "50px bungee"
        ctx.textAlign = "left"
        ctx.fillText ("TOUCHDOWN", 50, 100+originY)
        setTimeout(touchdownTimeout, 1000)
        console.log("Touchdown")
    }
}

const printOutOfBounds = function() {
    ctx.font = "50px bungee"
    ctx.textAlign = "left"
    ctx.fillText ("Out of Bounds", 20, 100+originY)
}

const outOfBoundsCheck = function() {
    if (joBackson.y <= 50 && originY >= 80) {
        gameActive = false
        printOutOfBounds()
        setTimeout(outOfBoundsTimeout, 1000)
    } else if (joBackson.y + joBackson.height > 670) {
        gameActive = false
        printOutOfBounds()
        setTimeout(outOfBoundsTimeout, 1000)
    }
}

const gameResult = function() {
    if (userScore > compScore) {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "black"
        ctx.font = "25px bungee"
        ctx.textAlign = "center"
        ctx.fillText ("CONGRATULATIONS!!", 300, 100)
        ctx.fillText ("You have won the Canvas Bowl", 300, 300)
    } else if (userScore < compScore) {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.fillStyle = "black"
        ctx.font = "25px bungee"
        ctx.textAlign = "center"
        ctx.fillText ("Sorry", 300, 100)
        ctx.fillText ("You have lost the Canvas Bowl", 300, 300)
    } else {
        totalGameTime = 30
        gameActive = true
    }
}
const reset = function () {
    originX = 0
    originY = 0
    isTackled = false
    const resetDefenders = defenderArray.forEach(function(defenderArray,i) {
        defenderArray.x = defenderOriginX[i]
        defenderArray.y = defenderOriginY[i]
    })
    const resetTeammates = teammateArray.forEach(function(teammateArray,i) {
        teammateArray.x = teammateOriginX[i]
        teammateArray.y = teammateOriginY[i]
    })
    joBackson.x = 210
    joBackson.y = 220
    sideScrollActive = true
    if (totalGameTime > 0) {
        gameActive = true
    } else {
        gameResult()
    }
}

function timeOutTemplate() {
    ctx.clearRect(0,0, canvas.width, canvas.height)
    originX = -300
    originY = 0
    renderField() 
    ctx.strokeStyle = "redorange"
    ctx.beginPath()
    ctx.roundRect(148, 48, 316, 466, 5)
    ctx.stroke()
    ctx.fillStyle = "orange"
    ctx.roundRect(150, 50, 300, 450, 5)
    ctx.fill()
}

function tackledTimeout() {
    timeOutTemplate()
    ctx.textAlign = "center"
    ctx.fillStyle = "black"
    ctx.font = "50px bungee"
    ctx.fillText ("Ouch!", 300, 100)
    ctx.font = "20px bungee"
    ctx.fillText ("Tackled on the play!", 300, 175)
    ctx.fillText ("Defender's Turn!", 300, 300)
    setTimeout(computerDriveTimeout, 3000)
}

function outOfBoundsTimeout() {
    timeOutTemplate()
    ctx.textAlign = "center"
    ctx.fillStyle = "black"
    ctx.font = "50px bungee"
    ctx.fillText ("Careful!", 300, 100)
    ctx.font = "20px bungee"
    ctx.fillText ("Stepped out of bounds!", 300, 175)
    ctx.fillText ("Defender's Turn!", 300, 300)
    setTimeout(computerDriveTimeout, 3000)
}

function touchdownTimeout () {
    timeOutTemplate()
    ctx.textAlign = "center"
    ctx.fillStyle = "black"
    ctx.font = "35px bungee"
    ctx.fillText ("Touchdown!!", 300, 100)
    setTimeout(computerDriveTimeout, 3000)
}

function computerDriveTimeout() {
    if (totalGameTime > 0) {
        ctx.clearRect(0,0, canvas.width, canvas.height)
        originX = -300
        originY = 0
        renderField() 
        computerDriveLogic()
        renderComputerDriveSummary()
        setTimeout(reset, 3000)
    } else {
        reset()
    }
}


// const sideScroll = setInterval(function () {
//         if (originX >= -610 && sideScrollActive) {
//             originX -= 5
//             }
//         }, 300)

// sideScroll() 



// Map Keys (function handleKeyPressEvent with switch)
function handleKeyPressEvent(e) {
    const speed = 20
    switch(e.key) {
        case "w":
        case "ArrowUp":
            e.preventDefault()
            if (joBackson.y < 50) {
                originY += speed
                console.log(originY)
            } else {
                joBackson.y -= speed
            }
            sideScrollActive = false
            // joImgMove()
            break
        case "s":
        case "ArrowDown":
            e.preventDefault()
            if (originY > 0) {
                originY -= speed
            } else {
                joBackson.y += speed
            }
            sideScrollActive = false
            // joImgMove()
            break
        case "a":
        case "ArrowLeft":
            e.preventDefault()
            if (joBackson.x <= 30) {
            console.log(joBackson.x)
            } else if (joBackson.x <= 210 && originX >= 0 ) {
                joBackson.x -= speed
            } else if (joBackson.x > 210 && originX <= -600){
                joBackson.x -= speed
            } else if (originX > 0) {
                joBackson.x -= speed
            } else {
                originX += speed
            }
            sideScrollActive = false
            console.log(originY)
            // joImgMove()
            break
        case "d":
        case "ArrowRight":
            e.preventDefault()
            if (joBackson.x < 210 && originX >= 0) {
                joBackson.x += speed
            } else if (joBackson.x >= 210 && originX <= -600) {
                joBackson.x += speed
            }
            else {
                originX -= speed
            }
            sideScrollActive = false
            // joImgMove()
            break
        case "Enter":
            if (titleScreenActive) {
                clearTitleScreen()
            }
            break
        case "*":                                            // ***** CODE FOR TESTING. REMOVE BEFORE FINALIZING GAME *****
            e.preventDefault()
            totalGameTime = 5
            break
        case "-":
            e.preventDefault
            gameActive = false 
    }
}

document.addEventListener("keydown", handleKeyPressEvent)

// Game Loop
function gameLoop () {
    if (gameActive) {
        // clear off render
        ctx.clearRect(0,0, canvas.width, canvas.height)
        // do all of the rendering
        renderField()
        renderPlayers()
        if (totalGameTime <= 0) {
            ctx.textAlign = "center"
            ctx.font = "20px bungee"
            ctx.fillText ("Last Play", 300, 50)
        }
        // check for collision
            // touchdown
            touchdownCheck()
            // out of bounds
            outOfBoundsCheck ()
            // tackle
            const tackleCheck = defenderArray.forEach(function (i) {
                const left = i.x + originX +10 <= joBackson.width + joBackson.x
                const right = i.x + i.width + originX - 10>= joBackson.x
                const top = i.y + originY + 20<= joBackson.y + joBackson.height
                const bottom = i.y + i.height + originY - 20>= joBackson.y
                if (left && right && top && bottom && isTackled == false) {
                    isTackled = true
                    ctx.font = "50px bungee"
                    ctx.textAlign = "left"
                    ctx.fillText ("TACKLED", 20, 100+originY)
                    gameActive = false
                    setTimeout(tackledTimeout, 1000)
                }
            
            })
        // Move defensive players
        const moveDefense = defenderArray.forEach(function(defender, i) {
            const defenderSpeed = 1


            // Check for block by offense
            // Map offense X positions to new array
            const teammateXMap = teammateArray.map(function(teammate){
                return teammate.x
            })
            // Map defense Y positions to new array
            const teammateYMap = teammateArray.map(function(teammate) {
                return teammate.y
            })
            // iterate over each x position
            const blockCheck = teammateXMap.forEach(function(teammate, j){
                // if defender x position is with offensive player x position
                if (teammate < defender.x && teammate + 25 >= defender.x) {
                    // Check if defender y position is also within offensive player y position
                    if (teammateYMap[j] < defender.y && teammateYMap[j]+40 >= defender.y) {
                        // move the defender and the offensive player
                        defender.x += 2
                        teammateArray[j].x -= 2
                        console.log(`${teammateArray[j].x} :${teammateArray[j].y} , ${defender.x}: ${defender.y}`)
                    }
                }
            })

            // Check for running into eachother - copy block check code and check for defenders instead
            const defenseXMap = defenderArray.map(function(defense){
                return defense.x
            })
            const defenseYMap = defenderArray.map(function(defense) {
                return defense.y
            })
            const defenderCollisionCheck = defenseXMap.forEach(function(defense, j){
                if (defense < defender.x && defense + 25 >= defender.x) {
                    if (defenseYMap[j] < defender.y && defenseYMap[j]+40 >= defender.y) {
                        defender.x += 1
                        defender.y += 2
                    }
                }
            })

            // move defenders according to Jo's position
             if (defender.x + originX > joBackson.x){
                defender.x -= defenderSpeed
            } else if (defender.x + originX < joBackson.x){
                defender.x += defenderSpeed
            }
            if (defender.y + originY> joBackson.y){
                defender.y -= defenderSpeed*2
            } else if (defender.y +originY< joBackson.y){
                defender.y += defenderSpeed*2
            }
        })
        const moveTeammates = teammateArray.forEach(function(i) {
            i.x += 1
        })
        // console.log(`${defender9.x}: ${defender9.y} , ${teammate3.x + teammate3.width}: ${teammate3.y}`)
    }
}




// Console log mouse location for testing
canvas.addEventListener("click", e => {
    console.log(`x: ${e.offsetX}, y: ${e.offsetY}`)
})
// Console log for testing
// console.log(defenderOriginX)