class Paisho {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = './images/pai-sho.piece.png';

        this.width = 30;
        this.height = 30;
        this.x = x;
        this.y = y;

        this.value = 100;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x, 
            this.y,
            this.width,
            this.height
        );
    }

    collide(player) {
        const collideX = player.x + player.width > this.x && player.x < this.x + this.width;
        const collideY = player.y < this.y + this.height && player.y + player.height > this.y;

        return collideX && collideY;
    }
}