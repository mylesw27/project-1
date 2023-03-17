// DOM Selectors
const clock = document.querySelector("#clock")
const userScore = document.querySelector("#userScore")
const compScore = document.querySelector("#compScore")
const canvas = document.querySelector("canvas")

// Canvas Setup
const ctx = canvas.getContext("2d")
// Set canvas resolution (Current resolution = 500 x 1200)
canvas.setAttribute('height', getComputedStyle(canvas).height)
canvas.setAttribute('width', getComputedStyle(canvas).width)

// Create End Zones
ctx.fillStyle = "blue"
ctx.fillRect(10, 10, 100, 480)
ctx.fillStyle = "red"
ctx.fillRect(1090, 10, 100, 480)


// Create Side Lines
ctx.fillStyle = "white"
ctx.fillRect(10, 10, 1180, 10)
ctx.fillRect(10, 480, 1180, 10)
ctx.fillRect(0, 10, 10, 480)
ctx.fillRect(1190, 10, 10, 480)

// Create Yardage Lines (Current field is 980 px wide by 460px tall, each line marked 98 pixels apart)
ctx.fillRect (110, 20, 1, 460) // goal line - Left End Zone
ctx.fillRect (208, 20, 1, 460) // 10 Yard Line
ctx.fillRect (306, 20, 1, 460) // 20 Yard Line
ctx.fillRect (404, 20, 1, 460) // 30 Yard Line
ctx.fillRect (502, 20, 1, 460) // 40 Yard Line
ctx.fillRect (600, 20, 1, 460) // 50 Yard Line
ctx.fillRect (698, 20, 1, 460) // opp 40 Yard Line
ctx.fillRect (796, 20, 1, 460) // opp 30 Yard Line
ctx.fillRect (894, 20, 1, 460) // opp 20 Yard Line
ctx.fillRect (992, 20, 1, 460) // opp 10 Yard Line
ctx.fillRect (1090, 20, 1, 460) // goal line - Right End Zone



//Create Classes
// Overarching class for all football players
class fbPLayer {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    render() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

// Child class of football players for user player

// Child class of football players for teammates

// Child class of football players for defenders


// Game objects
// const user = new fbPlayer()



// Console log for testing
console.log(ctx)