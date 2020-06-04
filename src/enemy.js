class Enemy extends Player {
    constructor (ctx, health, strength, x, y) {
        super(ctx,health, strength);

        this.width = 50;
        this.height = 50;

        this.x = x;
        this.y = y;
        // this.x = Math.random() * (this.ctx.canvas.width - this.width);
        // this.y = Math.random() * (this.ctx.canvas.height - this.height);

        this.nextMoveX;
        this.nextMoveY;
        this.vx;
        this.vy;

        this.health = health;
        this.strength = strength;

        this.v = 2;
        this.angle;
        this.airbendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 2500;

        this.dx;
        this.dy;

    }

    draw() {
        this.ctx.fillStyle = '#8A4588';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        this.airbendingAttacks.forEach(attack => {
            attack.draw();
            attack.move();
        })
    }

    attack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let airbending = new Airbending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.airbendingAttacks.push(airbending); 

            this.attackOn = false;
            this.reload();
            return true;
        }
    }
    update(avatarX, avatarY) {
        this.dx = avatarX - this.x;
        this.dy = avatarY - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
    }

    move() {
        // this.x += this.vx;
        this.x += 0;
        this.y += 0;
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