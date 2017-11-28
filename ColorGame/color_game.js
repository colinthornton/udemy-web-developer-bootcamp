var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	// Mode button event listeners
	setupModeButtons();

	setupSquares();
	reset();
}

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
		
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			reset();
		});
	}
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++){
	// Add click listener to squares
		squares[i].addEventListener("click", function(){
			// Grab color of picked square
			var clickedColor = this.style.backgroundColor;
			
			// Compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try again";
			}
		});
	}
}


function reset(){
	colors = generateRandomColors(numSquares);
	
	resetButton.textContent = "New Colors";
	
	// Pick a new random color from array
	pickedColor = pickColor();
	
	// Change color display to match picked color
	colorDisplay.textContent = pickedColor;

	// Reset the "Try again" and "correct" when starting a new game
	messageDisplay.textContent = "";

	// Change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color){
	// Loop through all sqaures
	for (var i = 0; i < squares.length; i++){
		// Change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	// Make an array
	var arr = [];

	// Add num random colors to array
	for(var i = 1; i <= num; i++){
		// Get random color and push into array
		arr.push(randomColor());
	}

	// Return that array
	return arr;
}

function randomColor(){
	// Pick a "red" from 0–255
	var r = Math.floor(Math.random() * 256);

	// Pick a "green" from 0–255
	var g = Math.floor(Math.random() * 256);

	// Pick a "blue" from 0–255
	var b = Math.floor(Math.random() * 256);

	// Return variables as "rgb(r, g, b)"
	return "rgb(" + r + ", " + g + ", " + b + ")";

}