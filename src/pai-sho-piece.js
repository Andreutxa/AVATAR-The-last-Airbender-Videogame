class Paisho {
    constructor(ctx, value) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = './images/pai-sho.piece.png';

        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (this.ctx.canvas.width - this.width);
        this.y = between(this.ctx.canvas.height, (this.ctx.canvas.height * 0.25 - this.height));

        this.value = value;
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