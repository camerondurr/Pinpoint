// TODO: Add after game report/statistics.
// TODO: After game statistics should include (1) High Score, (2) Current Score, and (3) Number of Inaccurate Taps.
// TODO: Statistics at the main menu should include (1) Total Number of Successful Taps, (2) Total Number of Inaccurate Taps, (3) Total Time Played, (4) High Score, and (5) Total Number of Rounds Played.
// TODO: Rewards tab at the main menu should include (1) Songs and (2) Themes.
// TODO: Add a Main Menu button to the Game screen.
// TODO: Potential Idea: The closer (or farther?) from the middle of the circle you click/tap, the more points you get.
// TODO: Fix the bug where testing on an iPhone 5s reveals that there is a delay when tapping a circle before it disappears.

// TODO: Fix the bug where testing on an iPhone 5s reveals that you can scroll up and down a little bit.
// TODO: Fix the cosmetic issue where the Main Menu buttons slightly overlap.
var canvas = document.querySelector("#myCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var letterSpacing = 10;
var letterSpacingChangeSpeed = 0.05;
var letterSpacingMaximum = 20;
var letterSpacingMinimum = 5;
var title = document.getElementById("title");
title.style.letterSpacing = letterSpacing + "px";
title.style.top = "20%";
title.style.marginTop = "-10px";
title.style.width = "500px";
title.style.marginLeft = -250 + "px";
title.style.height = "auto";
title.style.textAlign = "center";
title.style.color = "#FFFFFF";
title.style.position = "absolute";

var startingPoint = 30;
var normalModeButton = document.getElementById("normalModeButton");
normalModeButton.style.top = startingPoint + "%";
var hardModeButton = document.getElementById("hardModeButton");
hardModeButton.style.top = startingPoint + 10 + "%";
var rewardsButton = document.getElementById("rewardsButton");
rewardsButton.style.top = startingPoint + 20 + "%";
var statisticsButton = document.getElementById("statisticsButton");
statisticsButton.style.top = startingPoint + 30 + "%";
var optionsButton = document.getElementById("optionsButton");
optionsButton.style.top = startingPoint + 40 + "%";

var buttonWidth = 100;
var buttonHeight = 50;

var startButton = document.getElementById("startButton");
startButton.addEventListener('mouseover', function() {
    startButton.style.backgroundColor = "#00FF00";
}, false);
startButton.addEventListener('mouseout', function() {
    startButton.style.backgroundColor = "#FFFFFF";
}, false);
var backButton = document.getElementById("backButton");
backButton.style.left = buttonWidth + 10 + "px";
backButton.addEventListener('mouseover', function() {
    backButton.style.backgroundColor = "#FF0000";
}, false);
backButton.addEventListener('mouseout', function() {
    backButton.style.backgroundColor = "#FFFFFF";
}, false);

var score = 0;
var scoreboard = document.getElementById("scoreboard");
scoreboard.style.width = "auto";
scoreboard.style.height = buttonHeight + "px";
scoreboard.style.left = canvasWidth - 2*buttonWidth - 50 + "px";
scoreboard.style.position = "absolute";
scoreboard.style.textAlign = "center";
scoreboard.style.lineHeight = buttonHeight + "px";
scoreboard.style.color = "white";
scoreboard.style.fontSize = "32px";
scoreboard.innerHTML = "Score: " + score;
function incrementScore() {
    score++;
    scoreboard.innerHTML = "Score: " + score;
}
function decrementScore() {
    score--;
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
livesDiv.style.color = "white";
livesDiv.style.fontSize = "32px";
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

function mainMenuToGameTransition() {
    title.style.display = "none";
    normalModeButton.style.display = "none";
    hardModeButton.style.display = "none";
    rewardsButton.style.display = "none";
    statisticsButton.style.display = "none";
    optionsButton.style.display = "none";

    canvas.style.display = "inherit";
    startButton.style.display = "inherit";
    backButton.style.display = "inherit";
    scoreboard.style.display = "inherit";
    livesDiv.style.display = "inherit";
}
normalModeButton.addEventListener('click', function() {
    mainMenuToGameTransition();
    // TODO: The player should be given three lives.
}, false);
hardModeButton.addEventListener('click', function() {
    mainMenuToGameTransition();
    // TODO: The player should be given one life.
}, false);

function gameToMainMenuTransition() {
    canvas.style.display = "none";
    startButton.style.display = "none";
    backButton.style.display = "none";
    scoreboard.style.display = "none";
    livesDiv.style.display = "none";

    title.style.display = "inherit";
    normalModeButton.style.display = "inherit";
    hardModeButton.style.display = "inherit";
    rewardsButton.style.display = "inherit";
    statisticsButton.style.display = "inherit";
    optionsButton.style.display = "inherit";
}
// TODO: Fix the bug where the player leaves and comes back to circles that are already going.
backButton.addEventListener('click', function() {
    gameToMainMenuTransition();
}, false);

// TODO: Fix the speed issue when the start button is pressed multiple times.
var SPEED_REFERENCE = 1;
function Circle() {
    this.radius = Math.random()*canvasHeight/4 + 50;
    this.speed = SPEED_REFERENCE;
    this.outlineRadius = this.radius + 100 + 30*this.speed;
    this.position = {
        x: Math.random()*(canvasWidth - 100) + 100,
        y: Math.random()*(canvasHeight - 100) + 100
    };
}
var circle = new Circle();
function updateGame() {
    if (circle.outlineRadius <= circle.radius) {
        circle.speed = SPEED_REFERENCE/2;
    }
    if (circle.outlineRadius > 0) {
        circle.outlineRadius -= circle.speed;
        if (circle.outlineRadius < 0) { // Fixing a negative radius. Late click.
            circle.outlineRadius = 0;
            decrementLives();
            circle = new Circle();
        }
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
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the circle.
    context.beginPath();
    context.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI*2, false);
    context.closePath();
    // Fill the circle with the correct color.
    if (circle.outlineRadius > circle.radius) {
        context.fillStyle = "#DDDDDD";
    }
    else {
        context.fillStyle = "#00FF00";
    }
    context.fill();

    // Draw the outline circle.
    context.beginPath();
    context.arc(circle.position.x, circle.position.y, circle.outlineRadius, 0, Math.PI*2, false);
    context.lineWidth = 1;
    context.strokeStyle = "#FFFFFF";
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
canvas.addEventListener('mousedown', function(event) {
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
            decrementScore();
        }
        else { // Successful click.
            SPEED_REFERENCE += 0.25;
            circle = new Circle();
            incrementScore();
        }
    }
    else { // Out of bounds.
        decrementScore();
    }
}, false);
function animateTitle() {
    if (letterSpacing >= letterSpacingMaximum || letterSpacing <= letterSpacingMinimum) {
        letterSpacingChangeSpeed = -letterSpacingChangeSpeed;
    }
    letterSpacing += letterSpacingChangeSpeed;

    title.style.letterSpacing = letterSpacing + "px";
    requestAnimationFrame(animateTitle);
}
animateTitle();