"use strict";
const startGame = document.querySelector(".start");
const resetGame = document.querySelector(".again");
const checkButton = document.querySelector(".check");
const gameBody = document.querySelector("main");
const qMark = document.querySelector(".number");
const userInput = document.querySelector("#userInput");
const defaultChances = document.querySelector(".defaultChances");
const defaultHighScore = document.querySelector(".highscore");
const message = document.querySelector(".message");
let randomNumber = 0;
let buttonClickCounter = parseInt(defaultChances.innerHTML);
let previousChancesLeft = 0;
let currentChancesLeft = 0;
let flag = false;

// Uitlity Functions
const utilityFunctions = {
  // Function for generating random number
  randomNumberGenerator: function () {
    return Math.floor(Math.random() * 20) + 1;
  },
  // Function for displaying message
  displayMessage: function (para1, para2) {
    para1.innerHTML = para2;
  },
  // Function for storing number of times Check button is clicked to update Chances left
  buttonClickRecord: function () {
    buttonClickCounter--;
    return buttonClickCounter;
  },
  // Resets the Chances left back to default value whenever it is invoked
  defaultChancesResetter: function (defaultValue) {
    defaultChances.innerHTML = defaultValue;
  },
  // Resets the High Score back to default/previous High-Score whenever it is invoked
  defaultHighScoreResetter: function (defaultValue) {
    defaultHighScore.innerHTML = defaultValue;
  },
  // Function for updating the Chances left whenever Check button is clicked
  updateChancesLeft: function (clickCounter) {
    defaultChances.innerHTML = clickCounter;
  },
  // Function for checking equality between userInput & computer gemerated number
  checkInput: function () {
    this.displayMessage(
      message,
      (buttonClickCounter < 1 &&
        (this.colorChanger("red", "gray"),
        ((checkButton.disabled = true), "You lose!!!"))) ||
        (parseInt(userInput.value) > randomNumber && "📈 Too High!!!!") ||
        "📉 Too Low!!"
    );

    if (parseInt(userInput.value) === randomNumber) {
      currentChancesLeft = parseInt(defaultChances.innerHTML);
      this.displayMessage(message, "🎊🎉 You Win!!!");
      this.displayMessage(qMark, randomNumber);
      checkButton.disabled = true;
      this.colorChanger("green", "gray");
    }
  },
  // Logic for updating the highScore as per rules
  highScoreLogic: function (previous, current) {
    this.displayMessage(
      defaultHighScore,
      previous < current
        ? parseInt(defaultHighScore.innerHTML) + current
        : previous === current
        ? Math.round(0.8 * (parseInt(defaultHighScore.innerHTML) + current))
        : parseInt(defaultHighScore.innerHTML)
    );
  },
  colorChanger: function (add, ...remove) {
    document.querySelector("body").classList.add(add);
    for (const item of remove) {
      document.querySelector("body").classList.remove(item);
    }
  },

  // Resets everything (input field to blank, Score to 20, Highscore to 0) to it's default values
  gameResetter: function (para1, para2) {
    userInput.value = "";
    buttonClickCounter = 20;
    this.colorChanger("gray", "green", "red");
    this.displayMessage(message, "Start guessing...");
    this.displayMessage(qMark, "?");
    // calling defaultChancesResetter() here as,
    // gameResetter() is the parent function responsible for bringing the game back to default values
    this.defaultChancesResetter(para1);
    // calling defaultHighScoreResetter() here as,
    // gameResetter() is the parent function responsible for bringing the game back to default values
    this.defaultHighScoreResetter(para2);
  },
  resetInput: function (para1) {
    alert("Please enter a number between 1 to 20 !");
    para1.value = "";
  },
};

// Function for stopping user from inputting negative integers & number greater than 20
userInput.addEventListener("input", function () {
  const inputValue = this.value;
  (inputValue < 0 || inputValue > 20) && utilityFunctions.resetInput(this);
});

// -------------------------------------------------------------------- //

// Game Logic Functions
// Logic for Start Button i.e., (resetting the game back to default)
startGame.addEventListener("click", () => {
  gameBody.classList.add("visible");
  gameBody.classList.remove("hidden");
  randomNumber = utilityFunctions.randomNumberGenerator();
  console.log(randomNumber);
  utilityFunctions.gameResetter(20, 0);
  checkButton.disabled = false;
  flag = false;
});

// Logic for Again Button i.e., (resetting the game back to default except for highscore)
resetGame.addEventListener("click", () => {
  randomNumber = utilityFunctions.randomNumberGenerator();
  console.log(randomNumber);
  utilityFunctions.gameResetter(20, parseInt(defaultHighScore.innerHTML));
  checkButton.disabled = false;
  flag = true;
  flag
    ? ((previousChancesLeft = currentChancesLeft), (currentChancesLeft = 0))
    : null;
});

// Logic for Checking user input number & computer generated number
checkButton.addEventListener("click", () => {
  utilityFunctions.updateChancesLeft(utilityFunctions.buttonClickRecord());
  utilityFunctions.checkInput();
  utilityFunctions.highScoreLogic(
    parseInt(previousChancesLeft),
    parseInt(currentChancesLeft)
  );
});
// -------------------------------------------------------------------- //
