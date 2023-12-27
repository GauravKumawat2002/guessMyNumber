"use strict";
const startGame = document.getElementsByClassName("start")[0];
const resetGame = document.getElementsByClassName("again")[0];
const checkButton = document.getElementsByClassName("check")[0];
const userInput = document.getElementById("userInput");
let randomNumber = 0; // Storing random numbers
const defaultChances = document.getElementsByClassName("defaultChances")[0];
const defaultHighScore = document.getElementsByClassName("highscore")[0];
let previousHighScore = 0;
let currentHighScore = 0;
const message = document.getElementsByClassName("message");

// Uitlity Functions
// Function to convert any string to number (Useful when I have to convert any HTML string into number)
const stringToNumber = (string) => {
  return Number(string);
};

// I have to declaire this variable here because if i don't do so,
// then stringToNumber() function will not be called due it lexical scoping
let buttonClickCounter = stringToNumber(defaultChances.innerHTML);

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
  } else if (stringToNumber(userInput.value) === randomNumber) {
    message[0].innerHTML = "You Win!!!";
    currentHighScore = stringToNumber(defaultChances.innerHTML);
    checkButton.disabled = true;
  } else {
    message[0].innerHTML =
      stringToNumber(userInput.value) > randomNumber
        ? "Too High!!!!"
        : "Too Low!!";
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
// -------------------------------------------------------------------- //

// Game Logic Functions
// Logic for Start Button i.e., (resetting the game back to default)
startGame.addEventListener("click", () => {
  const gameBody = document.getElementsByTagName("main")[0];
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumber = randomNumberGenerator();
  gameResetter(20, 0);
  console.log(randomNumber);
  checkButton.disabled = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame.addEventListener("click", () => {
  randomNumber = randomNumberGenerator();
  gameResetter(20, currentHighScore);
  console.log(randomNumber);
  checkButton.disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton.addEventListener("click", () => {
  console.log(userInput.value);
  updateChancesLeft(buttonClickRecord());
  checkInput();
});
// -------------------------------------------------------------------- //
