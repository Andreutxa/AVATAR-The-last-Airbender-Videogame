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
            enemy.draw();
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
            return enemy.airbendingAttacks.some(attack => {
                if (attack.collide(this.player)) {
                    let index = enemy.airbendingAttacks.indexOf(attack);
                    enemy.airbendingAttacks.splice(index, 1);
                    return true;
                } 
            });
        });

        const attacksArr = this.player.airbendingAttacks;
        const bendingCollisionWithEnemy = attacksArr.some(attack => {
            if (attack.collide(this.enemies.some(enemy => enemy))) {
                let index2 = attacksArr.indexOf(attack);
                attacksArr.splice(index2, 1);
                return true;
            } 
        });
        console.log(bendingCollisionWithEnemy);
        
        // const bendingCollisionWithEnemy = this.player.airbendingAttacks.some(attack => {
        //     attack.collide(this.enemies);
        // });

        // const bendingCollisionWithEnemy = this.enemies.some(enemy => {
        //     enemy.collide(this.player.airbendingAttacks)
        // })

        if (collision && !this.player.hitted || bendingCollision && !this.player.hitted || bendingCollisionWithEnemy && !this.enemies.hitted) {
            this.player.hitted = true;
            this.player.health--;
            this.player.hittedUpdate();
            this.enemies.forEach(enemy => {
                enemy.hitted;
                enemy.health--;
                enemy.hittedUpdate();
            });
            console.log(this.player.health);
        }
        
    }
    
}