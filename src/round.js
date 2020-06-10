class Round {

    constructor(ctx) {
        this.ctx = ctx;
        this.round = 1; // 4 rounds
        this.tick = 0;
        
        this.enemies = [];

        this.winImg = new Image();
        this.winImg.src = './images/Win-background.png';

        this.gameOverImg = new Image();
        this.gameOverImg.src = './images/gameOver-img.png';
    }

    drawEnemies() {
        this.enemies.forEach(enemy => {
            if(enemy.health > 0) {
                enemy.draw();
                enemy.update(this.ctx.player.x, this.ctx.player.y);
                enemy.attack();
            }    
          });
    }

    // addEnemy() {
    //     if (this.tick++ < 15 && this.round === 1) {
    //         this.enemies.push(new Enemy(ctx, 3, 1,));
    //     }

    //     if (this.tick < 7 && this.round === 2) {
    //         this.enemies.push(new Enemy(ctx, 7, 5,));
    //     }

    //     if (this.tick < 3 this.round === 3) {
    //         this.enemies.push(new Enemy(ctx, 15, 5,));
    //     }

    //     if (this.tick < 1 this.round === 4) {
    //         this.enemies.push(new Enemy(ctx, 25, 15,));
    //     }
    // }

    // nextRound() {
    //     if (this.enemies.length === 0) {
    //         this.round++;
    //     }
    // }

    winGame() {
        this.ctx.drawImage(
            this.winImg, 
            0, 
            0, 
            this.ctx.canvas.width, 
            this.ctx.canvas.height
        );
        this.ctx.font = '50px';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Congratulations, Avatar', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    }
    
    gameOver() {
        this.ctx.drawImage(
            this.gameOverImg, 
            0, 
            0, 
            this.ctx.canvas.width, 
            this.ctx.canvas.height
        );
        this.ctx.font = '50px';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    }

}