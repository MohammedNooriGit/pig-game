"use strict";

let player0ScoreEl = document.getElementById("score--0");
let player1ScoreEl = document.getElementById("score--1");
let player0CurrentEl = document.getElementById("current--0");
let player1CurrentEl = document.getElementById("current--1");
let diceEl = document.querySelector(".dice");
let btnNewGame = document.querySelector(".btn--new");
let btnRollDice = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

let randomNumber, currentScore, scores, isPlaying, activePlayer;

const gameInit = function () {
  randomNumber = 0;
  currentScore = 0;
  scores = [0, 0];
  isPlaying = true;
  activePlayer = 0;

  player0ScoreEl.textContent = 0;
  player1ScoreEl.textContent = 0;
  player0CurrentEl.textContent = 0;
  player1CurrentEl.textContent = 0;
  diceEl.classList.add("hidden");
  btnHold.classList.remove("hidden");
  btnRollDice.classList.remove("hidden");
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
};

gameInit();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
  activePlayer = activePlayer ? 0 : 1;
};

btnRollDice.addEventListener("click", function () {
  randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${randomNumber}.png`;
  diceEl.classList.remove("hidden");

  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    diceEl.classList.add("hidden");
    btnHold.classList.add("hidden");
    btnRollDice.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

btnNewGame.addEventListener("click", gameInit);
