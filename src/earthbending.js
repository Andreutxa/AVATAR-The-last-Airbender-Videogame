class Earthbending extends Airbending {
    constructor(ctx, angle, x, y, dx, dy) {
        super(ctx, angle, x, y, dx, dy);
    }

    draw() {
        this.ctx.save();

        this.ctx.fillStyle = 'green';
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        this.ctx.fillRect(-15, -5, this.width, this.height);
        
        this.ctx.restore();
    }
}