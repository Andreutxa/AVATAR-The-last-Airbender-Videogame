let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const game = new Game(ctx);

game.start();