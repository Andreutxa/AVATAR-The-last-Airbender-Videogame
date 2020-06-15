// ------PLAYER MOVEMENTS------ //

const UP = 38;
const W = 87;
const DOWN = 40;
const S = 83;
const RIGHT = 39;
const D = 68;
const LEFT = 37;
const A = 65;
const SPACE = 32;
const E = 69;
const R = 82;
const F = 70;

// ------DOM ELEMENTS------ //

const MENU = document.getElementById('menu');
const INSTRUCTIONS_DIV = document.getElementById('instructions');
const LIFE_AND_SCORE = document.getElementById('life-score');
const LIFE_ELEMENT = document.getElementById('avatar-health');

const COUNT_DOWN_DIV = document.getElementById('count-down-game');
const COUNT_DOWN = document.getElementById('count-down-numbers');
const COUNT_DOWN_3 = document.getElementById('count-down-3');
const COUNT_DOWN_2 = document.getElementById('count-down-2');
const COUNT_DOWN_1 = document.getElementById('count-down-1');
const COUNT_DOWN_GO = document.getElementById('count-down-go');

const ROUNDS = document.getElementById('rounds-container');
const ROUND_1 = document.getElementById('round-1');
const ROUND_2 = document.getElementById('round-2');
const ROUND_3 = document.getElementById('round-3');
const ROUND_4 = document.getElementById('round-4');

const WIN_BOX = document.getElementById('win');
const WIN_PAISHO = document.getElementById('paisho-win');
const WIN_H2 = document.getElementById('win-h2');
const WIN_FINAL_SCORE = document.getElementById('win-final-score');

const GAME_OVER = document.getElementById('game-over');
const GAME_OVER_H2 = document.getElementById('game-over-h2');
const GAME_OVER_PAISHO = document.getElementById('paisho-game-over');
const GAME_OVER_FINAL_SCORE = document.getElementById('game-over-final-score');

const SCORE = document.getElementById('score');
const WINNING_FINAL_SCORE = document.getElementById('win-total-final-score');
const LOOSE_FINAL_SCORE = document.getElementById('game-over-total-final-score');
// const FINAL_SCORE = document.getElementsByClassName('final-score');
const INSTRUCTIONS_BTN = document.getElementById('instructions-btn');
const BACK_TO_MENU_BTN = document.getElementById('back-to-menu-btn');
const START_BTN = document.getElementById('start-btn');
const RESTART_BTN = document.getElementById('restart-game');
const PLAY_AGAIN_BTN = document.getElementById('replay-game');


// -------FUNCTIONS--------

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    );
  }

function rand(a, b) {
    return Math.floor(Math.random() * b + a);
}