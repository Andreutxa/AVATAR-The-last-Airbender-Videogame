let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const game = new Game(ctx);

const battleAudio = document.getElementById('battle-sound');

START_BTN.addEventListener('click', () => {

    const startLeaves = setTimeout(() =>{
        START_BTN.classList.add('btn-moves');
        
      }, 500);

    const menuLeaves = setTimeout(() =>{
        MENU.classList.toggle('fade-out'); 
      }, 1000);

    const countDownDiv = setTimeout(() => {
        COUNT_DOWN_DIV.classList.toggle('hide');
        COUNT_DOWN_DIV.classList.toggle('fade-in');
    }, 1100);
    
    const countDownDivLeaves = setTimeout(() => {
        COUNT_DOWN_DIV.classList.toggle('fade-out');
    }, 7000);
 

    const lifeScoreAppears = setTimeout(() =>{
        LIFE_AND_SCORE.classList.toggle('hide');
        LIFE_AND_SCORE.classList.toggle('fade-in');
      }, 7400);

        battleAudio.play();
        setTimeout(() => {
            game.start();
        }, 7400);
        battleAudio.volume = 0.1;
    }
);
