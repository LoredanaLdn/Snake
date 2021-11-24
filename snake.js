const cvs = document.getElementById("snakeGame");
const ctx = cvs.getContext("2d");
const box = 32;
let score = 0;

const ground = new Image();
const foodImg = new Image();
const island1Img = new Image();
const island2Img = new Image();
ground.src = "img/ground.png";
foodImg.src = "img/food.png";
island1Img.src = "img/island.png"
island2Img.src = "img/island.png"

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

let food = {
    x : Math.floor(Math.random()*15+1) * box,
    y : Math.floor(Math.random()*13+3) * box
}

let island1 = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let island2 = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if ( key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    }
}
 
function collision(head, array) {
    //for (let i = 0; i < array.length; i++) {
        //if (head.x == array[i].x && head.y == array[i].y) {
            //return true;
        //}
    //}
    //return false;
}

function draw() {
    ctx.drawImage(ground, 0, 0);
    for ( let i = 0; i < snake.length ; ++i){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(island1Img, island1.x, island1.y);
    ctx.drawImage(island2Img, island2.x, island2.y);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if ( d == "LEFT") snakeX -= box;
    if ( d == "UP") snakeY -= box;
    if ( d == "RIGHT") snakeX += box;
    if ( d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*15+1) * box,
            y : Math.floor(Math.random()*13+3) * box
        }
        if (score % 5 == 0) {
            island1 = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
            island2 = {
                x : Math.floor(Math.random()*17+1) * box,
                y : Math.floor(Math.random()*15+3) * box
            }
        }
    } else {
        snake.pop();
    }
     
    let newHead = {
        x : snakeX,
        y : snakeY
    }
     
    if (snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead, snake)){
        clearInterval(game);
        dead.play();
    }
    if ((snakeX == island1.x && snakeY == island1.y) || (snakeX == island2.x && snakeY == island2.y)) {
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

let game = setInterval(draw,200);