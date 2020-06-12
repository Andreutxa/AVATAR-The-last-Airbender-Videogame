let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const game = new Game(ctx);

const battleAudio = document.getElementById('battle-sound');

START_BTN.addEventListener('click', () => {
        game.start();
        battleAudio.play();
        battleAudio.volume = 0.1;
    }
);
