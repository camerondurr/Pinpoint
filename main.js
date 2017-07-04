var canvas = document.querySelector("#myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var buttonWidth = 100;
var buttonHeight = 50;

var startButton = document.getElementById("startButton");
startButton.style.width = buttonWidth + "px";
startButton.style.height = buttonHeight + "px";
startButton.style.border = "1px solid black";
startButton.style.position = "absolute";
startButton.innerHTML = "Start";

var score = 0;
var scoreboard = document.getElementById("scoreboard");
scoreboard.style.width = buttonWidth + "px";
scoreboard.style.height = buttonHeight + "px";
scoreboard.style.left = canvasWidth - 2*buttonWidth + "px";
scoreboard.style.position = "absolute";
scoreboard.style.textAlign = "center";
scoreboard.style.lineHeight = buttonHeight + "px";
scoreboard.innerHTML = "Score: " + score;
function incrementScore() {
    score++;
    scoreboard.innerHTML = "Score: " + score;
}

var numberOfLives = 3;
var livesDiv = document.getElementById("lives");
livesDiv.style.width = buttonWidth + "px";
livesDiv.style.height = buttonHeight + "px";
livesDiv.style.left = canvasWidth - buttonWidth + "px";
livesDiv.style.position = "absolute";
livesDiv.style.textAlign = "center";
livesDiv.style.lineHeight = buttonHeight + "px";
livesDiv.innerHTML = "Lives: " + numberOfLives;
function decrementLives() {
    numberOfLives--;
    if (numberOfLives <= 0) {
        canvas.style.display = "none";
        livesDiv.innerHTML = "Lives: 0";
    }
    else {
        livesDiv.innerHTML = "Lives: " + numberOfLives;
    }
}

// TODO: Fix the speed issue when the start button is pressed multiple times.
var SPEED_REFERENCE = 1;
function Circle() {
    this.radius = Math.random()*200 + 50; // Minimum: 50, Maximum: 250
    this.outlineRadius = 500;
    this.speed = SPEED_REFERENCE;

    this.minimumXPosition = this.outlineRadius;
    this.minimumYPosition = this.outlineRadius;
    this.maximumXPosition = canvasWidth - this.outlineRadius;
    this.maximumYPosition = canvasHeight - this.outlineRadius;
    this.position = {
        x: Math.random()*(this.maximumXPosition - this.minimumXPosition) + this.minimumXPosition,
        y: Math.random()*(this.maximumYPosition - this.minimumYPosition) + this.minimumYPosition
    };
}
var circle = new Circle();
function updateGame() {
    if (circle.outlineRadius > 0) {
        circle.outlineRadius -= circle.speed;
        if (circle.outlineRadius < 0) { // Fixing a negative radius.
            circle.outlineRadius = 0;
            decrementLives();
        }
    }
    else { // Late click.
        decrementLives();
        circle = new Circle();
    }
}

var context = canvas.getContext("2d");
var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function animateGame() {
    // Clear the canvas.
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Prepare the background.
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the circle.
    context.beginPath();
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI*2, false);
    context.closePath();
    // Fill the circle with the correct color.
    if (circle.outlineRadius > circle.radius) {
        context.fillStyle = "#EEEEEE";
    }
    else {
        context.fillStyle = "#00FF00";
    }
    context.fill();

    // Draw the outline circle.
    context.beginPath();
    context.arc(circle.position.x, circle.position.y, circle.outlineRadius, 0, Math.PI*2, false);
    context.lineWidth = 1;
    context.strokeStyle = "#000000";
    context.stroke();

    // Update and animate the game.
    updateGame();
    requestAnimationFrame(animateGame);
}
startButton.addEventListener('click', function() { // Clicking the start button.
    canvas.style.display = "initial";

    numberOfLives = 3;
    livesDiv.innerHTML = "Lives: " + numberOfLives;
    score = 0;
    scoreboard.innerHTML = "Score: " + score;

    SPEED_REFERENCE = 1;
    circle = new Circle();

    animateGame();
}, false);
function distanceBetweenTwoPoints(pointOne, pointTwo) {
    return Math.pow(pointTwo.x - pointOne.x, 2) + Math.pow(pointTwo.y - pointOne.y, 2);
}
canvas.addEventListener('click', function(event) {
    var clickX = event.pageX;
    var clickY = event.pageY;

    var centerPoint = {
        x: circle.position.x,
        y: circle.position.y
    };
    var clickPoint = {
        x: clickX,
        y: clickY
    };

    if (distanceBetweenTwoPoints(clickPoint, centerPoint) < Math.pow(circle.radius, 2)) { // Clicked inside the circle.
        if (circle.outlineRadius > circle.radius) { // Early click.
            decrementLives();
        }
        else { // Successful click.
            SPEED_REFERENCE += 0.5;
            circle = new Circle();
            incrementScore();
        }
    }
    else { // Out of bounds.
        decrementLives();
    }
}, false);