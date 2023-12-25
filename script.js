"use strict";
const startGame = document.getElementsByClassName("start");
const resetGame = document.getElementsByClassName("again");
const checkButton = document.getElementsByClassName("check");
const message = document.getElementsByClassName("message");
const defaultChances = document.getElementsByClassName("score");
const highScore = document.getElementsByClassName("highscore");
const defaultChancesStringToNumber = Number(defaultChances[0].innerHTML);
const guess = document.getElementsByClassName("guess");
let randomNumber = 0; // Storing random numbers
let buttonClickCounter = 0; // Storing number of times a button is clicked
let currentScore; // Storing Current Score
// let previousHighScore = 0; // For Storing Previous Round HighScore

// Uitlity Functions

// Function for generating random number
const randomNumberGenerator = () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
};

// Function fro changing the Score value
// const changeScore = (counter) => {
//   for (let i = 0; i < counter; i++) {
//     defaultChances[0].innerHTML = defaultChancesStringToNumber - i;
//     currentScore = Number(defaultChances[0].innerHTML);
//   }
//   return currentScore;
// };

// Function for changing the Score value
const changeScore = () => {
  defaultChances[0].innerHTML = String(Number(defaultChances[0].innerHTML) - 1);
  currentScore = Number(defaultChances[0].innerHTML);
  return currentScore;
};

// Sets the defaultChances back to 20 whenever it is invoked
const defaultScoreSetter = (counter) => {
  for (let i = 0; i < counter; i++) {
    defaultChances[0].innerHTML = 20;
  }
};

// Stores the Highscore
const storeHighScore = (HighScore) => {
  buttonClickCounter++;
  highScore[0].innerHTML = Number(HighScore);
  defaultScoreSetter(buttonClickCounter);
};

// Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
const gameResetter = (scoreDefault, highScoreDefault) => {
  guess[0].value = "";
  defaultChances[0].innerHTML = scoreDefault;
  highScore[0].innerHTML = highScoreDefault;
};

// Game Logic Functions
// Logic for Again Button i.e., (resetting the game back to default)
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
  storeHighScore(highScore[0].innerHTML);
  randomNumberGenerator();
  gameResetter(20, highScore[0].innerHTML);
  defaultChances[0].innerHTML = 20;
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton[0].addEventListener("click", () => {
  buttonClickCounter++;
  const guessNumber = Number(guess[0].value);
  if (guessNumber === randomNumber) {
    message[0].innerHTML = "You Win";
    highScore[0].innerHTML =
      Number(highScore[0].innerHTML) + changeScore(buttonClickCounter);
    checkButton[0].disabled = true;
    return highScore[0].innerHTML;
  } else {
    if (guessNumber < randomNumber) {
      message[0].innerHTML = "Too Low";
      changeScore(buttonClickCounter);
    } else if (guessNumber > randomNumber) {
      message[0].innerHTML = "Too High";
      changeScore(buttonClickCounter);
    }
  }
  if (defaultChances[0].innerHTML === "0") {
    message[0].innerHTML = "You Lose";
    checkButton[0].disabled = true;
  }
});
