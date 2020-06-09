class Game {
    constructor (ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.player = new Player(ctx, 100, 2);
        this.enemies = [];
        this.tick = 0;

        this.mouseX;
        this.mouseY;
        this.setListeners();
    }

    setListeners() {
        document.addEventListener('mousemove', (evt) => {
            this.mouseX = evt.clientX - 25;
            this.mouseY = evt.clientY - 25;
        });
    }

    start() {
        this.intervalId = setInterval(() => {
            this._clear();
            this._draw();
            this._move();
            this._addEnemy();
            this._checkCollisions();
        }, 1000 / 60);
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    
    _draw() {
        this.player.draw();
        this.player.update(this.mouseX, this.mouseY);

        this.enemies.forEach(enemy => {
            if(enemy.health > 0) {
                enemy.draw();
            }    
            enemy.update(this.player.x, this.player.y);
            enemy.attack();
          });
        
    }
    
    _addEnemy() {
        
        if (this.tick++ < 5) {
            this.enemies.push(new Enemy(ctx, 3, 1,));
        }
    }
    
    _move() {
        this.player.move();
        
    }

    _checkCollisions() {
        const collision = (
            this.enemies.some(enemy => enemy.collide(this.player))
        );
        
        const bendingCollision = this.enemies.some(enemy => {
            return enemy.firebendingAttacks.some(attack => {
                if (attack.collide(this.player)) {
                    let index = enemy.firebendingAttacks.indexOf(attack);
                    enemy.firebendingAttacks.splice(index, 1);
                    return true;
                } 
            });
        });

        const airAttacks = this.player.airbendingAttacks;
        const airBendingCollisionWithEnemy = this.enemies.some(enemy => {
            return airAttacks.some(attack => {
                if (attack.collide(enemy)) {
                    let index = airAttacks.indexOf(attack);
                    airAttacks.splice(index, 1);
                    enemy.hitted = true;
                    enemy.health--;
                    enemy.hittedUpdate();
                    console.log(enemy.health);
                    return true;
                } 
            });
        });
        
        const waterAttacks = this.player.waterbendingAttacks;
        const waterBendingCollisionWithEnemy = this.enemies.some(enemy => {
            return waterAttacks.some(attack => {
                if (attack.collide(enemy)) {
                    let index = waterAttacks.indexOf(attack);
                    waterAttacks.splice(index, 1);
                    enemy.hitted = true;
                    enemy.health--;
                    enemy.hittedUpdate();
                    console.log(enemy.health);
                    return true;
                } 
            });
        });
        
        const earthAttacks = this.player.earthbendingAttacks;
        const earthBendingCollisionWithEnemy = this.enemies.some(enemy => {
            return earthAttacks.some(attack => {
                if (attack.collide(enemy)) {
                    let index = earthAttacks.indexOf(attack);
                    earthAttacks.splice(index, 1);
                    enemy.hitted = true;
                    enemy.health--;
                    enemy.hittedUpdate();
                    console.log(enemy.health);
                    return true;
                } 
            });
        });
        
        const fireAttacks = this.player.firebendingAttacks;
        const fireBendingCollisionWithEnemy = this.enemies.some(enemy => {
            return fireAttacks.some(attack => {
                if (attack.collide(enemy)) {
                    let index = fireAttacks.indexOf(attack);
                    fireAttacks.splice(index, 1);
                    enemy.hitted = true;
                    enemy.health--;
                    enemy.hittedUpdate();
                    console.log(enemy.health);
                    return true;
                } 
            });
        });


        if (collision && !this.player.hitted || bendingCollision && !this.player.hitted) {
            this.player.hitted = true;
            this.player.health--;
            this.player.hittedUpdate();
           
            console.log(this.player.health);
        }

    }
    
}