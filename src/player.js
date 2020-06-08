class Player {
    constructor (ctx, health, strength, data) {
        this.ctx = ctx;

        this.x = this.ctx.canvas.width / 2;
        this.y = this.ctx.canvas.height / 2;
        
        this.currPositX;
        this.currPositY;
        
        this.vx = 0;
        this.vy = 0;
        
        this.width = 30;
        this.height = 50;

        this.hitted = false;
        this.health = health;
        this.strength = strength;

        
        this.angle;
        this.airbendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 300;
        
        this.dx;
        this.dy;

        this.img = this.imgStill;
        this.imgStill = new Image();
        this.imgStill.src = './images/Aang-movements/Aang-still.png';
        this.imgStill.frames = 1;
        this.imgStill.frameIndex = 0;

        this.imgRight = new Image();
        this.imgRight.src = './images/Aang-movements/Aang-RIGHT.png';
        this.imgRight.frames = 4;
        this.imgRight.frameIndex = 0;

        this.imgLeft = new Image();
        this.imgLeft.src = './images/Aang-movements/Aang-LEFT.png';
        this.imgLeft.frames = 4;
        this.imgLeft.frameIndex = 0;

        this.imgUp = new Image();
        this.imgUp.src = './images/Aang-movements/Aang-UP.png';
        this.imgUp.frames = 10;
        this.imgUp.frameIndex = 0;

        this.imgDown = new Image();
        this.imgDown.src = './images/Aang-movements/Aang-DOWN.png';
        this.imgDown.frames = 11;
        this.imgDown.frameIndex = 0;
    
        this.tick = 0

    }

    hittedUpdate() {
        setTimeout(() => {
            this.hitted = false;
        }, 2000);
    }
    
    draw() {
        
        // this.ctx.fillStyle = '#56AF2F';
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);   

        // this.ctx.drawImage(
        //     this.img,
        //     this.x,
        //     this.y,
        //     this.width,
        //     this.height
        //   );
      

        document.addEventListener('keydown', key => {
            if (key.keyCode === UP || key.keyCode === W) {
                this.img = this.imgUp;
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
                this.animate();
            } else if (key.keyCode === DOWN || key.keyCode === S) {
                this.img = this.imgDown;
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
                this.animate();
            } else if (key.keyCode === LEFT || key.keyCode === A) {
                this.img = this.imgLeft;
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
                this.animate();
            } else if (key.keyCode === RIGHT || key.keyCode === D) {
                this.img = this.imgRight;
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
                this.animate();
            } 
         });


        this.airbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
    }

    animate() {

        if (this.tick++ > 7) {
          this.tick = 0;
    
          this.img.frameIndex++;
        }
    
        if (this.img.frameIndex >= this.img.frames - 1) {
          this.img.frameIndex = 0;
        }
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

    // collide(player) {
    //     const collideX = player.x + player.width > this.x && player.x < this.x + this.width;
    //     const collideY = player.y < this.y + this.height && player.y + player.height > this.y;

    //     return collideX && collideY;
        
    // }

}