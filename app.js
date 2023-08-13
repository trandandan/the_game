
var canvas;

var myScore = 0;
var computerScore = 0;

var _WINNING_REQ = 2;

var _RESTART_CLICK = false;
var _IsKeyDown = false;

var winner;

var BallX = 50;
var BallY = 50;

var ballSpeedX = 17;
var ballSpeedY  = 14;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_THICKNESS = 13;
const PADDLE_HEIGHT = 100;

var canvasContext;
var intervalId;

const elem = document.body;
            
window.onload = function () {
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");
    var FramesPerSec = 30;
    BallReset();
    elem.addEventListener('keydown', (event) => {
        if (event.keyCode == 82 && showingWinScreen)
            _IsKeyDown = true;
    })
    intervalId = setInterval(CallBoth, 1000 / FramesPerSec);
    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = CalcMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
    canvas.addEventListener('click', function (evt) {
        if (evt) {
            console.log("test test allah allah");
            _RESTART_CLICK = true;
        }
    })
}

function BallReset() {
    ballSpeedX = -ballSpeedX;
    BallX = canvas.width / 2;
    BallY = canvas.height / 2;
}

function CallBoth() {

    MoveEverthing();
    DrawEverything();
    if (_IsKeyDown && showingWinScreen) {
        showingWinScreen = false;
        _IsKeyDown = false;
    }
}

function CalcMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function computerMovement() {
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
    console.log("ballY - 35 : " + (BallY).toString())
    if (paddle2YCenter < BallY - 35) {
        for (let i = 0; i < 10; i++) {
            paddle2Y++;
            DrawComputerPaddle();
        }
    }
    else if (paddle2YCenter > BallY + 35) {
        for (let i = 0; i < 10; i++) {
            paddle2Y--;
            DrawComputerPaddle();
        }
    }
}

function MoveEverthing() {
    if (showingWinScreen)
        return;
    computerMovement();
    BallX += ballSpeedX;
    BallY += ballSpeedY;

    if (BallX > canvas.width - 1) {
        if (BallY > paddle2Y && BallY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = BallY - (paddle2Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            BallReset();
            myScore++;
        }
    }
    if (BallX < 2) {
        if (BallY > paddle1Y && BallY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            var deltaY = BallY - (paddle1Y + PADDLE_HEIGHT / 2);
            ballSpeedY = deltaY * 0.35;
        }
        else {
            BallReset();
            computerScore++;
        }
    }

    // When the ball touch the up or down
    if (BallY > canvas.height)
        ballSpeedY = -ballSpeedY;
    if (BallY < 0)
        ballSpeedY = -ballSpeedY;
}

function ColorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function DrawBall() {
    canvasContext.fillStyle = 'red';
    canvasContext.beginPath();
    canvasContext.arc(BallX, BallY, 10, 0, Math.PI * 2, true);
    canvasContext.fill();

}

function DrawComputerPaddle() {
    ColorRect(canvas.width - PADDLE_THICKNESS - 3, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white")
}

function DrawEverything() {

    //Drawing the play area.
    ColorRect(0, 0, canvas.width, canvas.height, "black")
    if (showingWinScreen) {
        canvasContext.fillStyle = 'orange';
        canvasContext.fillText("You " + winner + "! click (R) to play again ;)", (canvas.width / 4), (canvas.height / 2) - 40);
        return;
    }

    //Drawing the middle line
    for (let i = 30; i < canvas.height; i += 15)
        ColorRect(canvas.width / 2, i, 5, 10, "white")
    //Drawing the first paddle.
    ColorRect(3, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

    //Drawing the second paddle.
    DrawComputerPaddle();

    //Drawing the Ball.
    DrawBall();

    // Create gradient
    canvasContext.font = "20px verdana"
    var gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("1.0", "yellow");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    canvasContext.fillStyle = gradient;
    if (computerScore == _WINNING_REQ || myScore == _WINNING_REQ) {
        if (computerScore == _WINNING_REQ)
            winner = "lose";
        else if (myScore == _WINNING_REQ)
            winner = "win";
        myScore = 0;
        computerScore = 0;
        showingWinScreen = true;
        console.log("Game is finish!");
        // clearInterval(intervalId); //you can call this function to stop setIterval() 
    }
    canvasContext.fillText("Score : " + myScore + " " + computerScore, (canvas.width / 2) - 55, 20);
}