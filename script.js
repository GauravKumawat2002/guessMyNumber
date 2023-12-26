"use strict";
const startGame = document.getElementsByClassName("start");
const resetGame = document.getElementsByClassName("again");
const checkButton = document.getElementsByClassName("check");
const message = document.getElementsByClassName("message");
const chancesLeft = document.getElementsByClassName("chancesLeft");
const highScore = document.getElementsByClassName("highscore");
const defaultChancesStringToNumber = Number(chancesLeft[0].innerHTML);
const guess = document.getElementsByClassName("guess");
let randomNumber = 0; // Storing random numbers
let currentScore; // Storing Current Score

// Uitlity Functions
// Function for generating random number
const randomNumberGenerator = () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
};

// Function for changing the Score value
const changeScore = () => {
  chancesLeft[0].innerHTML = chancesLeft[0].innerHTML - 1;
  currentScore = Number(chancesLeft[0].innerHTML);
  return currentScore;
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

// Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
const gameResetter = (scoreDefault, highScoreDefault) => {
  guess[0].value = "";
  chancesLeft[0].innerHTML = scoreDefault;
  highScore[0].innerHTML = highScoreDefault;
  message[0].innerHTML = "Start guessing...";
};

// Game Logic Functions
// Logic for Start Button i.e., (resetting the game back to default)
startGame[0].addEventListener("click", () => {
  const gameBody = document.getElementsByTagName("main")[0];
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumberGenerator();
  gameResetter(20, 0);
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame[0].addEventListener("click", () => {
  randomNumberGenerator();
  gameResetter(20, highScore[0].innerHTML);
  chancesLeft[0].innerHTML = 20;
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton[0].addEventListener("click", () => {
  const guessNumber = Number(guess[0].value);
  if (guessNumber === randomNumber) {
    message[0].innerHTML = "You Win";
    highScore[0].innerHTML = Number(highScore[0].innerHTML) + changeScore();
    checkButton[0].disabled = true;
    return highScore[0].innerHTML;
  } else {
    if (guessNumber < randomNumber) {
      message[0].innerHTML = "Too Low";
      changeScore();
    } else if (guessNumber > randomNumber) {
      message[0].innerHTML = "Too High";
      changeScore();
    }
  }
  if (chancesLeft[0].innerHTML === "0") {
    message[0].innerHTML = "You Lose";
    checkButton[0].disabled = true;
  }
});
