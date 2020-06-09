class Airbending {
    constructor(ctx, angle, x, y, dx, dy) {
        this.ctx = ctx;

        this.x =x;
        this.y = y;

        this.width = 30;
        this.height = 10;

        this.v = 3;
        this.dx = dx * this.v;
        this.dy = dy * this.v;
        this.angle = angle;
    }

    draw() {
        this.ctx.save();

        this.ctx.fillStyle = 'grey';
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.fillRect(-15, -5, this.width, this.height);
        
        this.ctx.restore();
    }

    move() {
        
        this.x += this.dx;
        this.y += this.dy;
    }

    collide(player) {
        const collideX = player.x + player.width > this.x && player.x < this.x + this.width;
        const collideY = player.y < this.y + this.height && player.y + player.height > this.y;

        return collideX && collideY;

    }
    
}