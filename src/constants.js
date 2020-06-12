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
const WIN_BOX = document.getElementById('win');
const GAME_OVER = document.getElementById('game-over');
const SCORE = document.getElementById('score').innerHTML;
const LIFE_ELEMENT = document.getElementById('avatar-health');
const START_BTN = document.getElementById('start-btn');

function rand(a, b) {
    return Math.floor(Math.random() * b + a);
}