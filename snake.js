const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

//States
let reqAnimation; //Will be used for requesting and clearing animation
let movementTimeout; //Will be used to make intervals in which will snake change position


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
//directionSet will be used to forbid multiple key press without moveSnake
let directionSet = false;
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

    reqAnimation = requestAnimationFrame(draw);
}

//moveSnake function
function moveSnake(){
    for(let i = snake.length - 1; i >= 0; i -= 1){
        //This next few lines(next if block) will enable apple eating
        if(i === 0 && snake[i].x === apple.x && snake[i].y === apple.y){
            //make snake longer
            snake.push({});
            //create new Apple
            createApple();
        } 

        const s = snake[i];
        if(i === 0){
            switch(direction){
                case 'right':
                    if(s.x > canvas.width) s.x = 0;
                    else s.x += size;
                    break;
                case 'down':
                    if(s.y > canvas.height) s.y = 0;
                    else s.y += size;
                    break;
                case 'left':
                    if(s.x < 0) s.x = Math.round(canvas.width / size) * size;
                    else s.x -= size;
                    break;
                case 'up':
                    if(s.y < 0) s.y = Math.round(canvas.height / size) * size;
                    else s.y -= size;
            }

            //Check if snake ate her tail
            for(let i = 1; i < snake.length; i += 1){
                if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
                    window.cancelAnimationFrame(reqAnimation);
                }
            }

        }else{
            //move snake part to position of previuos(on nearer to head) part
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }

    }
    
    movementTimeout = setTimeout(moveSnake, speed);
    directionSet = false;
}

//onKeyDown function will be used to register key and change drection of snake
function onKeyDown(e){
    //next line will check if arrow keys are pressed; in other cases nothing will be happen 
    if(e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown'){
        if(!directionSet){
            directionSet = true;
            const newDirection = e.key.substring(5).toLowerCase(); //substring and toLowerCase will transform ArrowUp -> up, and all other keys

            if (direction === 'left' && newDirection !== 'right') direction = newDirection;
            if (direction === 'up' && newDirection !== 'down') direction = newDirection;
            if (direction === 'down' && newDirection !== 'up') direction = newDirection;
            if (direction === 'right' && newDirection !== 'left') direction = newDirection;
        }
    }
}

//Calling createApple function so it can generate coordinates
createApple();
//Add onKeyDown EventListener
window.addEventListener('keydown', onKeyDown);
//Set movement interval
movementTimeout = setTimeout(moveSnake, speed);
//Requesting animation
reqAnimation = requestAnimationFrame(draw);
