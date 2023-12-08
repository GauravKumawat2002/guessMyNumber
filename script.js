'use strict';
const startGame = document.getElementsByClassName('start');
const resetGame = document.getElementsByClassName('again');
const checkButton = document.getElementsByClassName('check');
const message = document.getElementsByClassName('message');
const chancesLeft = document.getElementsByClassName('chances left');
const highScore = document.getElementsByClassName('highscore');
const chancesLeft_Number = Number(chancesLeft[0].innerHTML);
const guess = document.getElementsByClassName('guess');
const userInput = document.getElementById('userInput');
let randomNumber = 0; // Storing random numbers
let buttonClickCounter = 0; // Storing number of times a button is clicked
let currentScore = 0; // Storing Current Score
let previousHighScore = 0; // For Storing Previous Round HighScore

// Uitlity Functions

// Function for generating random number
const randomNumberGenerator = () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  return randomNumber;
};

// Function for stopping user from inputting negative integers
userInput.addEventListener('input', () => {
  const inputValue = userInput.value;
  if (inputValue < 0) {
    alert('Please enter a number between 1 to 20 !');
    userInput.value = '';
  }
});

// Function fro changing the Score value
const changeScore = counter => {
  for (let i = 0; i < counter; i++) {
    chancesLeft[0].innerHTML = chancesLeft_Number - i;
    currentScore = Number(chancesLeft[0].innerHTML);
  }
  return currentScore;
};

// Sets the score back to 20 whenever it is invoked
const defaultChancesSetter = counter => {
  for (let i = 0; i < counter; i++) {
    chancesLeft[0].innerHTML = 20;
  }
};

// Stores the Highscore
const storeHighScore = HighScore => {
  buttonClickCounter++;
  highScore[0].innerHTML = HighScore;
  defaultChancesSetter(buttonClickCounter);
};

// Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
const gameResetter = (chancesLeftDefault, highScoreDefault) => {
  guess[0].value = '';
  chancesLeft[0].innerHTML = chancesLeftDefault;
  highScore[0].innerHTML = highScoreDefault;
};

// Game Logic Functions
// Logic for Again Button i.e., (resetting the game back to default)
startGame[0].addEventListener('click', () => {
  const gameBody = document.getElementsByTagName('main')[0];
  gameBody.classList.add('visible');
  gameBody.classList.remove('hidden');
  randomNumberGenerator();
  gameResetter(20, 0);
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame[0].addEventListener('click', () => {
  storeHighScore(Number(highScore[0].innerHTML));
  randomNumberGenerator();
  gameResetter(20, highScore[0].innerHTML);
  console.log(randomNumber);
  checkButton[0].disabled = false;
});

// Logic for Checking user input number & computer generated number
checkButton[0].addEventListener('click', () => {
  buttonClickCounter++;
  const guessNumber = Number(guess[0].value);
  if (guessNumber === randomNumber) {
    message[0].innerHTML = 'You Win';
    highScore[0].innerHTML =
      Number(highScore[0].innerHTML) + changeScore(buttonClickCounter);
    checkButton[0].disabled = true;
    return highScore[0].innerHTML;
  } else {
    if (guessNumber < randomNumber) {
      message[0].innerHTML = 'Too Low';
      changeScore(buttonClickCounter);
    } else if (guessNumber > randomNumber) {
      message[0].innerHTML = 'Too High';
      changeScore(buttonClickCounter);
    }
  }
  if (chancesLeft[0].innerHTML === '0') {
    message[0].innerHTML = 'You Lose';
    checkButton[0].disabled = true;
  }
});
