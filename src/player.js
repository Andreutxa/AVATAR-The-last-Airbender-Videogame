class Player {
    constructor (ctx, health, strength) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        // this.currentPosition = [];

        this.vx = 0;
        this.vy = 0;

        this.width = 50;
        this.height = 50;

        this.health = health;
        this.strength = strength;

        this.bending = new Bending(this);
        
    }

    draw() {
        this.ctx.fillStyle = '#56AF2F';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.bending.draw();
    }

    move() {

        document.addEventListener('keydown', key => {
           if (key.keyCode === UP) {
               this.vy = -4;
           } else if (key.keyCode === DOWN) {
               this.vy = 4;
           } else if (key.keyCode === LEFT) {
               this.vx = -4;
           } else if (key.keyCode === RIGHT) {
               this.vx = 4;
           }
        });

        document.addEventListener('keyup', key => {
            if (key.keyCode === UP) {
                this.vy = 0;
            } else if (key.keyCode === DOWN) {
                this.vy = 0;
            } else if (key.keyCode === LEFT) {
                this.vx = 0;
            } else if (key.keyCode === RIGHT) {
                this.vx = 0;
            }
         });

        this.x += this.vx;
        this.y += this.vy;

        this.bending.move();

        // console.log(this.currentPosition.push(this.x, this.y));
        // console.log(`The position of x is ${this.x} and the position of y is ${this.y}`);

    }

    recieveDamage(damage) {
        this.health -= damage;

        // if (this.health <= 0) {
        //     game over
        // }
    }

}