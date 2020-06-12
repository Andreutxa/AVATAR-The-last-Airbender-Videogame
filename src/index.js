let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const game = new Game(ctx);

const battleAudio = document.getElementById('battle-sound');

START_BTN.addEventListener('click', () => {

    const startLeaves = setTimeout(() =>{
        START_BTN.classList.add('btn-moves');
        MENU.classList.add('begin-game'); // Por qué no hace efecto esta clase?
      }, 300);

    const menuLeaves = setTimeout(() =>{
        MENU.classList.toggle('hide'); //Cómo añadir efecto "fadeIn"?
      }, 1400);

    const lifeScoreAppears = setTimeout(() =>{
        LIFE_AND_SCORE.classList.toggle('hide');
      }, 1420);

        game.start();
        battleAudio.play();
        battleAudio.volume = 0.1;
    }
);
