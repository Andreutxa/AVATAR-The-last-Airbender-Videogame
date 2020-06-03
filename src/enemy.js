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

        // this.nextMoveX;
        // this.nextMoveY;

        this.health = health;
        this.strength = strength;

    }

    draw() {
        this.ctx.fillStyle = '#8A4588';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        this.x += this.vx;
    }

    // nextMove() {
    //     this.nextMoveX = rand(0, this.ctx.canvas.width);
    //     this.nextMoveY = rand(0, this.ctx.canvas.height);

    //     let dx = this.x - this.nextMoveX;
    //     let dy = this.y - this.nextMoveY;
    //     let angle = Math.atan2(dy, dx);
    //     this.vx = Math.cose(angle);
    //     this.vy = Math.sin(angle);
    // }
}