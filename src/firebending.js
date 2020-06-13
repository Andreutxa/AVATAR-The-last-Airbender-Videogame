class Firebending extends Airbending {
    constructor(ctx, angle, x, y, dx, dy) {
        super(ctx, angle, x, y, dx, dy);

        this.width = 50;
        this.height = 50;

        this.img = new Image();
        this.img.src = './images/Aang-attacks/firebending-attack1.png';
        this.img.frames = 2;
        this.img.frameIndex = 0;
    }

    draw() {
        this.ctx.save();

        // this.ctx.fillStyle = 'red';
        this.ctx.drawImage(
            this.img,
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
}
