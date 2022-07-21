'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🥳 CORRECT NUMBER! ';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.number').textContent = 15;
// document.querySelector('.score').textContent = 9;
// document.querySelector('.guess').value = 12;
// console.log(document.querySelector('.guess').value);

// DEFAULT VALUES

var dNumber = document.querySelector('.number').textContent;
var dMessage = document.querySelector('.message').textContent;
var dColor = document.querySelector('body').style.backgroundColor;
var HighScore = 0;
var number = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = number;
// console.log(number);
let score = 20;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '😕 No Number';
  } else if (guess === number) {
    document.querySelector('.message').textContent = '😎 Arry Wah!';
  } else if (guess > number) {
    if (guess - number > 3) {
      document.querySelector('.message').textContent = '🤢 Too High!';
    } else {
      document.querySelector('.message').textContent = '😄 Slighlty High!';
    }
  } else {
    if (guess - number < -3) {
      document.querySelector('.message').textContent = '😑 Too Low!';
    } else {
      document.querySelector('.message').textContent = '🙃 Slighlty Low!';
    }
  }

  if (guess != number) {
    score -= 1;
  } else {
    document.querySelector('body').style.backgroundColor = '#60b347';
    if (score > HighScore) {
      HighScore = score;
      document.querySelector('.highscore').textContent = HighScore;
    }
  }

  document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', function () {
  console.log('CLICKED!');
  document.querySelector('.number').textContent = dNumber;
  document.querySelector('.message').textContent = dMessage;
  document.querySelector('.score').textContent = 20;
  document.querySelector('.guess').value = ' ';
  document.querySelector('body').style.backgroundColor = dColor;
  score = 20;
  number = Math.trunc(Math.random() * 20) + 1;
});
