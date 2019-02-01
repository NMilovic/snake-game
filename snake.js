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

//Here will be defined draw function which is going to redraw canvas and make some animation
function draw(){
    //Firstly, lets clear whole canvas and afte that lets draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height); //this will be clearing canvas

    //Draw snake. Actually, here we need to walk through sanke array and draw part by part
    for(let i = 0; i < snake.length; i += 1){
        let s = snake[i];
        ctx.fillStyle = '#FFF'; //this will gives color to snake
        ctx.fillRect(s.x, s.y, size, size); //this will draw snake part
    }

}

//Requesting animation
reqAnimation = requestAnimationFrame(draw);
