class Enemy extends Player {
    constructor (ctx, health, strength, x, y) {
        super(ctx,health, strength);

        this.width = 65;
        this.height = 70;

        // this.x = x;
        // this.y = y;
        this.x = Math.random() * (this.ctx.canvas.width - this.width);
        this.y = Math.random() * (this.ctx.canvas.height - this.height);

        
        this.health = health;
        this.strength = strength;
        
        this.nextMoveX;
        this.nextMoveY;
        this.vx;
        this.vy;
        this.v = 2;

        this.angle;
        this.firebendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 2500;

        this.dx;
        this.dy;

        this.move();

        this.hitted = false;

        this.img = new Image();
        this.img.src = './images/fire-nation-enemy.png';
        this.img.frames = 4;
        this.img.frameIndex = 0;

    }

    hittedUpdate() {
        setTimeout(() => {
            this.hitted = false;
        }, 1000);
    }

    draw() {
        // this.ctx.fillStyle = '#8A4588';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
        

        this.firebendingAttacks.forEach(attack => {
            attack.draw();
            attack.move();
        });
    }

    attack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let firebending = new Firebending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.firebendingAttacks.push(firebending); 

            this.attackOn = false;
            this.reload();
            return true;
        }
    }

    update(avatarX, avatarY) {
        
        this.x += (this.vx * this.v);
        this.y += (this.vy * this.v);

        if (this.x >= ( this.ctx.canvas.width - this.width ) - this.width || this.y >= (this.ctx.canvas.height - 110) - this.height || this.x <= this.width || this.y <= 70){
            this.move();
        }
        
        if (Math.abs(this.nextMoveX - this.x) <= 10 && Math.abs(this.nextMoveY - this.y) <= 10) {
            this.move(); 
        }

        this.dx = avatarX - this.x; 
        this.dy = avatarY - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
    }

    move() {
        this.nextMoveX = rand(0, this.ctx.canvas.width);
        this.nextMoveY = rand(0, this.ctx.canvas.height);

        let dx = this.nextMoveX - this.x;
        let dy = this.nextMoveY - this.y;

        let angle = Math.atan2(dy, dx);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    collide(player) {
        const collideX = player.x + player.width > this.x && player.x < this.x + this.width;
        const collideY = player.y < this.y + this.height && player.y + player.height > this.y;

        return collideX && collideY;

    }

}