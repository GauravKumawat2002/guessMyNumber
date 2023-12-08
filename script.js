"use strict";
const startGame = document.getElementsByClassName("start");
const resetGame = document.getElementsByClassName("again");
const checkButton = document.getElementsByClassName("check");
const userInput = document.getElementById("userInput");
let randomNumber = 0; // Storing random numbers

// -------------------------------------------------------------------- //
// Uitlity Functions

// Function to convert any string to number (Useful when I have to convert any HTML string into number)
const stringToNumber = (string) => {
  return Number(string);
};

// Function for generating random number
const randomNumberGenerator = () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
};

// Function for stopping user from inputting negative integers
userInput.addEventListener("input", () => {
  const inputValue = userInput.value;
  if (inputValue < 0) {
    alert("Please enter a number between 1 to 20 !");
    userInput.value = "";
  }
});

// Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
const gameResetter = (chancesLeftDefault, highScoreDefault) => {
  guess[0].value = "";
  chancesLeft[0].innerHTML = chancesLeftDefault;
  highScore[0].innerHTML = highScoreDefault;
};

// -------------------------------------------------------------------- //
// Game Logic Functions

// Logic for Again Button i.e., (resetting the game back to default)
startGame[0].addEventListener("click", () => {
  const gameBody = document.getElementsByTagName("main")[0];
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumberGenerator();
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame[0].addEventListener("click", () => {
  randomNumberGenerator();
  // gameResetter(20, highScore[0].innerHTML);
  checkButton[0].disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton[0].addEventListener("click", () => {
  console.log(userInput.value);
});
