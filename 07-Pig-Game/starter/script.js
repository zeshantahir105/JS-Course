'use strict';

const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');
const score0E1 = document.querySelector('#score--0');
const score1E2 = document.getElementById('score--1');
const current0E1 = document.getElementById('current--0');
const current1E1 = document.getElementById('current--1');
const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initial conditions
score0E1.textContent = 0;
score1E2.textContent = 0;
diceE1.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;

var switchPlayer = function () {
  // Switching the Player
  currentScore = 0;
  let score = Number(
    document.getElementById(`score--${activePlayer}`).textContent
  );
  if (score >= 3) {
    playing = false;
    diceE1.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
  }
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0E1.classList.toggle('player--active');
  player1E1.classList.toggle('player--active');
};
let playing = true;

if (playing) {
  // Rolling Dice Functionality
  btnRoll.addEventListener('click', function () {
    // Randomizer
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Displaying Dice
    diceE1.classList.remove('hidden');
    diceE1.src = `dice-${dice}.png`;

    // Check
    if (dice != 1) {
      // Adding dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  });

  btnHold.addEventListener('click', function () {
    document.getElementById(`score--${activePlayer}`).textContent =
      Number(document.getElementById(`score--${activePlayer}`).textContent) +
      currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    switchPlayer();
    currentScore = 0;
  });
}

const RESET = function () {
  score0E1.textContent = 0;
  score1E2.textContent = 0;
  current0E1.textContent = 0;
  current1E1.textContent = 0;
  currentScore = 0;
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  diceE1.classList.remove('hidden');
  player0E1.classList.remove('player--winner');
  player1E1.classList.remove('player--winner');
  player0E1.classList.add('player--active');
  player1E1.classList.remove('player--active');
  activePlayer = 0;
};

btnNew.addEventListener('click', RESET);
