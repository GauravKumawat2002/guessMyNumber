"use strict";
const startGame = document.getElementsByClassName("start");
const resetGame = document.getElementsByClassName("again");
const checkButton = document.getElementsByClassName("check");
const userInput = document.getElementById("userInput");
let randomNumber = 0; // Storing random numbers
const defaultChances = document.getElementsByClassName("defaultChances");
const defaultHighScore = document.getElementsByClassName("highscore");
const message = document.getElementsByClassName("message");

// Uitlity Functions
// Function to convert any string to number (Useful when I have to convert any HTML string into number)
const stringToNumber = (string) => {
  return Number(string);
};

// I have to declaire this variable here because if i don't do so,
// then stringToNumber() function will not be called due it lexical scoping
let buttonClickCounter = stringToNumber(defaultChances[0].innerHTML);

// Function to log to console
const logToConsole = (input) => {
  console.log(input);
};

// Function for generating random number
const randomNumberGenerator = () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
};
randomNumber = randomNumberGenerator();

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
  defaultChances[0].innerHTML = defaultValue;
};
// Resets the High Score back to default/previous High-Score whenever it is invoked
const defaultHighScoreResetter = (defaultValue) => {
  defaultHighScore[0].innerHTML = defaultValue;
};

// Function for updating the Chances left whenever Check button is clicked
const updateChancesLeft = (clickCounter) => {
  defaultChances[0].innerHTML = clickCounter;
};

// Function for checking equality between userInput & computer gemerated number
const checkInput = () => {
  if (stringToNumber(userInput.value) === randomNumber) {
    message[0].innerHTML = "You Win!!!";
    checkButton[0].disabled = true;
  } else {
    if (stringToNumber(userInput.value) > randomNumber)
      message[0].innerHTML = "Too High!!!!";
    else if (stringToNumber(userInput.value) < randomNumber)
      message[0].innerHTML = "Too Low!!";
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
startGame[0].addEventListener("click", () => {
  const gameBody = document.getElementsByTagName("main")[0];
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumberGenerator();
  gameResetter(20, 0);
  logToConsole(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame[0].addEventListener("click", () => {
  randomNumberGenerator();
  gameResetter();
  logToConsole(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton[0].addEventListener("click", () => {
  logToConsole(userInput.value);
  updateChancesLeft(buttonClickRecord());
  checkInput();
});
// -------------------------------------------------------------------- //
