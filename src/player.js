class Player {
    constructor (ctx, health, strength, data) {
        this.ctx = ctx;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 2;
        
        this.currPositX;
        this.currPositY;
        
        this.vx = 0;
        this.vy = 0;
        
        this.width = 50;
        this.height = 50;
        
        this.health = health;
        this.strength = strength;

        
        this.angle;
        this.airbendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 300;
        
        this.dx;
        this.dy;

        this.img = new Image();
        this.img.src = './images/Aang-movements/Aang-DOWN.png';

        this.spriteWidth = 215;
        this.spriteHeight = 34;

        this.img.frames = 10;

        this.aangWidth = this.spriteWidth / this.img.frames;

    }

    
    draw() {
        
        this.ctx.fillStyle = '#56AF2F';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.airbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
    }
    
    update(mouseX, mouseY) {
        this.dx = mouseX - this.x;
        this.dy = mouseY - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
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

    reload() {
        setTimeout(() => {
            this.attackOn = true;
        }, this.attackInterval);
    }

    move() {

        document.addEventListener('mousedown', () => {
           this.attack(); 
        });

        document.addEventListener('keydown', key => {
           if (key.keyCode === UP || key.keyCode === W) {
               this.vy = -4;
           } else if (key.keyCode === DOWN || key.keyCode === S) {
               this.vy = 4;
           } else if (key.keyCode === LEFT || key.keyCode === A) {
               this.vx = -4;
           } else if (key.keyCode === RIGHT || key.keyCode === D) {
               this.vx = 4;
           } else if (key.keyCode === SPACE) {
               this.attack();
           }
        });

        document.addEventListener('keyup', key => {
            if (key.keyCode === UP || key.keyCode === W) {
                this.vy = 0;
            } else if (key.keyCode === DOWN || key.keyCode === S) {
                this.vy = 0;
            } else if (key.keyCode === LEFT || key.keyCode === A) {
                this.vx = 0;
            } else if (key.keyCode === RIGHT || key.keyCode === D) {
                this.vx = 0;
            }
         });

        this.x += this.vx;
        this.y += this.vy;

        this.currPositX = this.x;
        this.currPositY = this.y;

    }

    recieveDamage(damage) {
        this.health -= damage;

        // if (this.health <= 0) {
        //     game over
        // }
    }

}