const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//States
let reqAnimation; //Will be used for requesting and clearing animation


//Size
const size = Math.floor(window.innerWidth/32); //grid cell size; 32 cells per row

//Snake
//Snake will represent an array of snake parts where snake[0] will be head and snake[i] will be tail
let snake = [
    {x: 0, y: 0}
];

//Apples
//Or let then call obsticles; When snakes head coordinates are equal to apple coordinates => snake eat apple
let apple = {};
let bonusApple = {};

//Direction & speed
//When the game starts it will be nice to set some movement speed and starting direction in which will snake go by default
let direction = 'right';
let speed = 200;

//Apple functions
//First function will be simple, it will take two numbers and randomly output value between them
function random(min, max){
    return Math.random() * (max - min) + min;
} 

//Because of frequent use of below expression I decided to put it in function
function getAppleCoordinates (min, max){
    return Math.round(random(min, max) / min) * min; //expression
}

//Secound will generate coordinates for apple object
function createApple(){
    //Here we need to give apple object some coordinates so it can be drawn in canvas
    apple.x = getAppleCoordinates(size, canvas.width - size);
    apple.y = getAppleCoordinates(size, canvas.height - size);


    //Also, here we can prevent apple spawning on any position that snake takes
    for(let i = 0; i < snake.length; i += 1){
        let s = snake[i];
        if(s.x === apple.x && s.y === apple.y){
            apple.x = getAppleCoordinates(size, canvas.width - size);
            apple.y = getAppleCoordinates(size, canvas.height - size);
        }
    }
}

//Here will be defined draw function which is going to redraw canvas and make some animation
function draw(){
    //Firstly, lets clear whole canvas and afte that lets draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height); //this will be clearing canvas

    //Draw apple
    ctx.fillStyle = '#B70431';
    ctx.fillRect(apple.x, apple.y, size, size);

    //Draw snake. Actually, here we need to walk through sanke array and draw part by part
    for(let i = 0; i < snake.length; i += 1){
        let s = snake[i];
        ctx.fillStyle = '#FFF'; //this will gives color to snake
        ctx.fillRect(s.x, s.y, size, size); //this will draw snake part
    }

}

//Calling createApple function so it can generate coordinates
createApple();
//Requesting animation
reqAnimation = requestAnimationFrame(draw);
