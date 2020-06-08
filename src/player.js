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

        this.hitted = false;
        this.health = health;
        this.strength = strength;

        
        this.angle;
        this.airbendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 300;
        
        this.dx;
        this.dy;

        this.img = new Image();
        this.img.src = './images/Aang-movements/spritesheet.png';
        this.img.frames = 10;
        this.cols = 4;
        this.img.frameIndex = 0;
        this.tick = 0;


    }

    hittedUpdate() {
        setTimeout(() => {
            this.hitted = false;
        }, 2000);
    }
    
    draw() {
        
        this.ctx.fillStyle = '#56AF2F';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);   

        // document.addEventListener('keydown', key => {
        //     if (key.keyCode === UP || key.keyCode === W) {
        //         this.ctx.drawImage(
        //             this.img,
        //             this.img.frameIndex * this.img.width / this.img.frames,
        //             0, 
        //             this.img.width / this.img.frames,
        //             this.img.height / this.cols,
        //             this.x,
        //             this.y,
        //             this.width,
        //             this.height
        //         );
        //     } else if (key.keyCode === DOWN || key.keyCode === S) {
        //         this.ctx.drawImage(
        //             this.img,
        //             this.img.frameIndex * this.img.width / this.img.frames,
        //             0, 
        //             this.img.width / this.img.frames,
        //             this.img.height / this.cols,
        //             this.x,
        //             this.y,
        //             this.width,
        //             this.height
        //         );
        
        //         this.animate();
        //     } else if (key.keyCode === LEFT || key.keyCode === A) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     } else if (key.keyCode === RIGHT || key.keyCode === D) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     } 
        //  });     
         
        //  document.addEventListener('keyup', key => {
        //     if (key.keyCode === UP || key.keyCode === W) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     } else if (key.keyCode === DOWN || key.keyCode === S) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     } else if (key.keyCode === LEFT || key.keyCode === A) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     } else if (key.keyCode === RIGHT || key.keyCode === D) {
        //         this.ctx.fillStyle = '#56AF2F';
        //         this.ctx.fillRect(this.x, this.y, this.width, this.height);
        //     }
        //  });
         

        this.airbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
    }

    animate() {
        this.tick++;

        if (this.tick > 8) {
            this.tick = 0;
            this.frameIndex++;
        }

        if (this.img.frameIndex >= this.img.frames) {
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