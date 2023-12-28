"use strict";
const startGame = document.getElementsByClassName("start")[0];
const resetGame = document.getElementsByClassName("again")[0];
const checkButton = document.getElementsByClassName("check")[0];
const gameBody = document.getElementsByTagName("main")[0];
const userInput = document.getElementById("userInput");
const defaultChances = document.getElementsByClassName("defaultChances")[0];
const defaultHighScore = document.getElementsByClassName("highscore")[0];
const message = document.getElementsByClassName("message");
let randomNumber = 0; // Storing random numbers
let buttonClickCounter = parseInt(defaultChances.innerHTML);
let previousChancesLeft = 0;
let currentChancesLeft = 0;
let flag = false;

// Uitlity Functions
// Function for generating random number
const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 20) + 1;
};

// Function for stopping user from inputting negative integers
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue < 0) {
    alert("Please enter a number between 1 to 20 !");
    userInput.value = "";
  } else if (inputValue > 20) {
    alert("Please enter a number between 1 to 20 !");
    userInput.value = "";
  }
});

// Function for storing number of times Check button is clicked to update Chances left
const buttonClickRecord = () => {
  buttonClickCounter--;
  return buttonClickCounter;
};
// Resets the Chances left back to default value whenever it is invoked
const defaultChancesResetter = (defaultValue) => {
  defaultChances.innerHTML = defaultValue;
};
// Resets the High Score back to default/previous High-Score whenever it is invoked
const defaultHighScoreResetter = (defaultValue) => {
  defaultHighScore.innerHTML = defaultValue;
};

// Function for updating the Chances left whenever Check button is clicked
const updateChancesLeft = (clickCounter) => {
  defaultChances.innerHTML = clickCounter;
};

// Function for checking equality between userInput & computer gemerated number
const checkInput = () => {
  if (buttonClickCounter < 1) {
    message[0].innerHTML = "You lose!!!";
    checkButton.disabled = true;
  } else if (parseInt(userInput.value) === randomNumber) {
    message[0].innerHTML = "You Win!!!";
    currentChancesLeft = parseInt(defaultChances.innerHTML);
    checkButton.disabled = true;
  } else {
    message[0].innerHTML =
      parseInt(userInput.value) > randomNumber ? "Too High!!!!" : "Too Low!!";
  }
};

// Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
const gameResetter = (para1, para2) => {
  userInput.value = "";
  buttonClickCounter = 20;
  message[0].innerHTML = "Start guessing...";
  // calling defaultChancesResetter() here as,
  // gameResetter() is the parent function responsible for bringing the game back to default values
  defaultChancesResetter(para1);
  // calling defaultHighScoreResetter() here as,
  // gameResetter() is the parent function responsible for bringing the game back to default values
  defaultHighScoreResetter(para2);
};

// Logic for updating the highScore as per rules
const highScoreLogic = (previous, current) => {
  if (previous < current)
    defaultHighScore.innerHTML = parseInt(defaultHighScore.innerHTML) + current;
  else if (previous === current)
    defaultHighScore.innerHTML = Math.round(
      0.8 * (parseInt(defaultHighScore.innerHTML) + current)
    );
};
// -------------------------------------------------------------------- //

// Game Logic Functions
// Logic for Start Button i.e., (resetting the game back to default)
startGame.addEventListener("click", () => {
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumber = randomNumberGenerator();
  gameResetter(20, 0);
  checkButton.disabled = false;
  flag = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame.addEventListener("click", () => {
  randomNumber = randomNumberGenerator();
  gameResetter(20, parseInt(defaultHighScore.innerHTML));
  checkButton.disabled = false;
  flag = true;
  if (flag) {
    previousChancesLeft = currentChancesLeft;
    currentChancesLeft = 0;
  }
});

// Logic for Checking user input number & computer generated number
checkButton.addEventListener("click", () => {
  updateChancesLeft(buttonClickRecord());
  checkInput();
  highScoreLogic(parseInt(previousChancesLeft), parseInt(currentChancesLeft));
});
// -------------------------------------------------------------------- //

// some useful console.logs for debugging
// ----------------------- Paste on line No. 92 ----------------------- //
// console.log(
//   `defaultHighScore.innerHTML = ${parseInt(
//     defaultHighScore.innerHTML
//   )} + currentChancesLeft = ${current} = ${
//     parseInt(defaultHighScore.innerHTML) + current
//   }`
// );

// ----------------------- Paste on line No. 109 ----------------------- //
// console.log(randomNumber);

// ----------------------- Paste on line No. 118 ----------------------- //
// console.log(randomNumber);
// -------------------------------------------------------------------- //
