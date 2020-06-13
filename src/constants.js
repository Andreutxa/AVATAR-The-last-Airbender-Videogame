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
const LIFE_AND_SCORE = document.getElementById('life-score');
const WIN_BOX = document.getElementById('win');
const GAME_OVER = document.getElementById('game-over');
const GAME_OVER_H2 = document.getElementById('game-over > h2');
const SCORE = document.getElementById('score');
const FINAL_SCORE = document.getElementsByClassName('final-score');
const LIFE_ELEMENT = document.getElementById('avatar-health');
const START_BTN = document.getElementById('start-btn');
const COUNT_DOWN_DIV = document.getElementById('count-down-game');
const COUNT_DOWN = document.getElementById('count-down-numbers');
const COUNT_DOWN_3 = document.getElementById('count-down-3');
const COUNT_DOWN_2 = document.getElementById('count-down-2');
const COUNT_DOWN_1 = document.getElementById('count-down-1');
const COUNT_DOWN_GO = document.getElementById('count-down-go');
const RESTART_BTN = document.getElementById('restart-game');
const PLAY_AGAIN_BTN = document.getElementById('replay-game');

function rand(a, b) {
    return Math.floor(Math.random() * b + a);
}