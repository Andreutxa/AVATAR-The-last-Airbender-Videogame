class Game {
    constructor (ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.player = new Player(ctx, 4, 2);
        this.enemies = [];
        this.tick = 0;
    }

    start() {
        this.intervalId = setInterval(() => {
            this._clear();
            this._draw();
            this._move();
        }, 1000 / 60);
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    
    _draw() {
        this.player.draw();
        this.enemies.forEach(enemy => {
            enemy.draw()
          });
    }
    
    _addEnemy() {
        this.enemies.push(new Enemy(ctx, 3, 1))
    }
    
    _move() {
        this.player.move();
        this.enemies.forEach(enemy => {
            enemy.draw()
          });
    }
    
}