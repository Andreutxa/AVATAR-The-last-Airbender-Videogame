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
        this.height = 60;

        this.hitted = false;
        this.health = health;
        this.strength = strength;

        
        this.angle;
        this.airbendingAttacks = [];
        this.waterbendingAttacks = [];
        this.earthbendingAttacks = [];
        this.firebendingAttacks = [];
        this.attackOn = true;
        this.attackInterval = 300;
        
        this.dx;
        this.dy;

        this.img = new Image();
        this.img.src = './images/Aang-movements/Aang-still1.png';
        this.img.frames = 1;
        this.img.frameIndex = 0;

        this.imgRight = new Image();
        this.imgRight.src = './images/Aang-movements/Aang-RIGHT1.png';
        this.imgRight.frames = 4;
        this.imgRight.frameIndex = 0;

        this.imgLeft = new Image();
        this.imgLeft.src = './images/Aang-movements/Aang-LEFT1.png';
        this.imgLeft.frames = 4;
        this.imgLeft.frameIndex = 0;

        this.imgUp = new Image();
        this.imgUp.src = './images/Aang-movements/Aang-UP1.png';
        this.imgUp.frames = 10;
        this.imgUp.frameIndex = 0;

        this.imgDown = new Image();
        this.imgDown.src = './images/Aang-movements/Aang-DOWN1.png';
        this.imgDown.frames = 10;
        this.imgDown.frameIndex = 0;

        this.actions = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    
        this.tick = 0;

        this.windAudio = document.getElementById('wind');
        this.waterAudio = document.getElementById('water');
        this.earthAudio = document.getElementById('earth');
        this.fireAudio = document.getElementById('fire');

    }

    hittedUpdate() {
        LIFE_ELEMENT.value = this.health;
        setTimeout(() => {
            this.hitted = false;

        }, 2000);
    }
    
    draw() {
        
        if (this.actions.up) {
            this.ctx.drawImage(
            this.imgUp,
            this.imgUp.frameIndex * this.imgUp.width / this.imgUp.frames,
            0,
            this.imgUp.width / this.imgUp.frames,
            this.imgUp.height,
            this.x,
            this.y,
            this.width,
            this.height
            );
            this.animate(this.imgUp);
        } else if (this.actions.down) {
            this.ctx.drawImage(
                this.imgDown,
                this.imgDown.frameIndex * this.imgDown.width / this.imgDown.frames,
                0,
                this.imgDown.width / this.imgDown.frames,
                this.imgDown.height,
                this.x,
                this.y,
                this.width,
                this.height
                );
            this.animate(this.imgDown);
        } else if (this.actions.left) {
            this.ctx.drawImage(
                this.imgLeft,
                this.imgLeft.frameIndex * this.imgLeft.width / this.imgLeft.frames,
                0,
                this.imgLeft.width / this.imgLeft.frames,
                this.imgLeft.height,
                this.x,
                this.y,
                this.width,
                this.height
                );
            this.animate(this.imgLeft);
        } else if (this.actions.right) {
            this.ctx.drawImage(
                this.imgRight,
                this.imgRight.frameIndex *  this.imgRight.width /  this.imgRight.frames,
                0,
                this.imgRight.width /  this.imgRight.frames,
                this.imgRight.height,
                this.x,
                this.y,
                this.width,
                this.height
                );
            this.animate(this.imgRight);
        } else {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width - 15,
                this.height
            );
        }
        this.airbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
        this.earthbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
        this.waterbendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
        this.firebendingAttacks.forEach((attack) => {
            attack.draw();
            attack.move();
        });
    }

    animate(img) {

        if (this.tick++ > 10) {
          this.tick = 0;
            
          img.frameIndex++;
        }
    
        if (img.frameIndex >= img.frames - 1) {
          img.frameIndex = 0;
        }
    }
    
    update(mouseX, mouseY) {
        this.dx = mouseX - this.x;
        this.dy = mouseY - this.y;
        this.angle = Math.atan2(this.dy, this.dx);
    }
    
    airAttack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let airbending = new Airbending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.airbendingAttacks.push(airbending); 

            this.windAudio.play();

            this.attackOn = false;
            this.reload();
            return true;
        }
    }
    waterAttack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let waterbending = new Waterbending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.waterbendingAttacks.push(waterbending); 

            this.waterAudio.play();

            this.attackOn = false;
            this.reload();
            return true;
        }
    }
    earthAttack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let earthbending = new Earthbending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.earthbendingAttacks.push(earthbending); 

            this.earthAudio.play();

            this.attackOn = false;
            this.reload();
            return true;
        }
    }
    fireAttack() {
         
        if (this.attackOn) {
            let dx = Math.cos(this.angle);
            let dy = Math.sin(this.angle);

            let firebending = new Firebending(this.ctx, this.angle, this.x + this.width / 2, this.y + this.height / 2, dx, dy);
            this.firebendingAttacks.push(firebending); 

            this.fireAudio.play();

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
           this.airAttack(); 
        });

        document.addEventListener('keydown', key => {
            let state = key.type === 'keydown' ? true : false;
              if (key.keyCode === UP || key.keyCode === W) {
                  this.actions.up = true
                  this.vy = -4;
              } else if (key.keyCode === DOWN || key.keyCode === S) {
                  this.actions.down = true
                  this.vy = 4;
              } else if (key.keyCode === LEFT || key.keyCode === A) {
                  this.actions.left = true
                  this.vx = -4;
              } else if (key.keyCode === RIGHT || key.keyCode === D) {
                  this.actions.right = true
                  this.vx = 4;
              } else if (key.keyCode === SPACE) {
                  this.airAttack();
              }else if (key.keyCode === E) {
                  this.earthAttack();
              }else if (key.keyCode === R) {
                  this.waterAttack();
              }else if(key.keyCode === F) {
                  this.fireAttack();
              }
           });
   
           document.addEventListener('keyup', key => {
               if (key.keyCode === UP || key.keyCode === W) {
                   this.actions.up = false
                   this.vy = 0;
               } else if (key.keyCode === DOWN || key.keyCode === S) {
                   this.actions.down = false
                   this.vy = 0;
               } else if (key.keyCode === LEFT || key.keyCode === A) {
                   this.actions.left = false
                   this.vx = 0;
               } else if (key.keyCode === RIGHT || key.keyCode === D) {
                   this.actions.right = false
                   this.vx = 0;
               }
            });

        this.x += this.vx;
        this.y += this.vy;

        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x >= 660) {
            this.x = 660;
        }

        const topLimit = this.ctx.canvas.height * 0.25;

        if (this.y <= topLimit) {
            this.y = topLimit;
        } else if (this.y >= 470) {
            this.y = 470;
        }

    }

}