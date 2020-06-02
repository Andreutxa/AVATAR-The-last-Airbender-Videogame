class Enemy extends Player {
    constructor (ctx, health, strength) {
        super(ctx,health, strength);

        this.width = 50;
        this.height = 50;

        // this.x = 250;
        // this.y = 250;
        this.x = Math.random() * (this.ctx.canvas.width - this.width);
        this.y = Math.random() * (this.ctx.canvas.height - this.height);

        this.vx = 0.2;
        this.vy = 0.2;

        this.health = health;
        this.strength = strength;

    }

    draw() {
        this.ctx.fillStyle = '#8A4588';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.vx;
    }
}