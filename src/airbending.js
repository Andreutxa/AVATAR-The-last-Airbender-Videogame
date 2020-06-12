class Airbending {
    constructor(ctx, angle, x, y, dx, dy) {
        this.ctx = ctx;

        this.x =x;
        this.y = y;

        this.width = 70;
        this.height = 40;

        this.v = 3;
        this.dx = dx * this.v;
        this.dy = dy * this.v;
        this.angle = angle;

        this.img = new Image();
        this.img.src = './images/Aang-attacks/airbending-attack.png';
        this.img.frames = 2;
        this.img.frameIndex = 0;
    }

    draw() {
        this.ctx.save();

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.width,
            this.height
          );

        this.animate(this.img);

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        // this.ctx.fillRect(-15, -5, this.width, this.height);
        
        this.ctx.restore();
    }

    animate(img) {

        if (this.tick++ > 15) {
          this.tick = 0;
            
          img.frameIndex++;
        }
    
        if (img.frameIndex >= img.frames - 1) {
          img.frameIndex = 0;
        }
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