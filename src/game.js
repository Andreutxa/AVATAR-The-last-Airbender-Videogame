class Game {
    constructor (ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.player = new Player(ctx, 100, 2);
        this.background = new Background(ctx);
        this.round = 0;
        this.enemies = [];
        this.tick = 0;

        this.mouseX;
        this.mouseY;
        this.setListeners();
 
        this.points = [];
        this.score = 0;

        this.winImg = new Image();
        this.winImg.src = './images/winImg.png';
        this.winAudio = document.getElementById('win-sound');

        // this.battleAudio = document.getElementById('battle-sound');
        this.gameOverImg = new Image();
        this.gameOverImg.src = './images/gameOverImg.png';
        this.gameOverAudio = document.getElementById('game-over-sound');
    }

    getMousePos(evt) {
        var rect = this.ctx.canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top,
        };
      }

    setListeners() {
        document.addEventListener('mousemove', (evt) => {
            var mousePos = this.getMousePos(evt);
            this.mouseX = mousePos.x - 45;
            this.mouseY = mousePos.y - 45;
        });
    }

    start() {

        // this.battleAudio.play();

        this.intervalId = setInterval(() => {
            this._clear();
            this._draw();
            this._move();

            this._checkCollisions();
            this._checkPlayerEnemiesLife();
            this._checkRound();
            // this.updateScore();
        }, 1000 / 60);
    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    
    _draw() {
        this.background.draw();
        this.player.draw();
        this.player.update(this.mouseX, this.mouseY);

        this.enemies.forEach(enemy => {
            if(enemy.health > 0) {
                enemy.draw();
                enemy.update(this.player.x, this.player.y);
                enemy.attack();
            }    
        });
        
    }

    _checkRound() {
        if (this.enemies.length === 0 && this.round === 0) {
            this._addEnemies(0, 15);
            this._addPowerfulEnemies(0, 2);
            this.round = 1;
        } else if (this.enemies.length === 0 && this.round === 1) {
            this._addEnemies(1, 7);
            this._addPowerfulEnemies(1, 5);
            this.round = 2;
        } else if (this.enemies.length === 0 && this.round === 2) {
            this._addEnemies(2, 2);
            this._addPowerfulEnemies(2, 3);
            this.round = 3;
        } else if (this.enemies.length === 0 && this.round === 3) {
            this._addPowerfulEnemies(3, 1);
            this.round = 4;
        } else if (this.enemies.length === 0 && this.round === 4) {
            this._win();
        }
    }

    _addEnemies(roundNum, enemyNum) {
        switch(roundNum) {
            case 0:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Enemy(ctx, 3, 1));
                }
            break;
            case 1:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Enemy(ctx, 7, 5));
                }
            break;
            case 2:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Enemy(ctx, 15, 5));
                }
            break;
            case 3:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Enemy(ctx, 25, 15));
                }
            break;
        }
    }

    _addPowerfulEnemies(roundNum, enemyNum) {
        switch(roundNum) {
            case 0:
                while(this.enemies.length < enemyNum + 15) {
                    this.enemies.push(new FireSoldier(ctx, 7, 20));
                }
            break;
            case 1:
                while(this.enemies.length < enemyNum + 7) {
                    this.enemies.push(new FireSoldier(ctx, 15, 30));
                }
            break;
            case 2:
                while(this.enemies.length < enemyNum + 2) {
                    this.enemies.push(new FireSoldier(ctx, 25, 40));
                }
            break;
            case 3:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Azula(ctx, 50, 70));
                }
            break;
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
                    if (enemy.health <= 0) {
                        let index = this.enemies.indexOf(enemy);
                        this.enemies.splice(index, 1);
                        SCORE.innerHTML = this.score;
                        this.score += enemy.strength;
                    }
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
                    if (enemy.health <= 0) {
                        let index = this.enemies.indexOf(enemy);
                        this.enemies.splice(index, 1);
                        SCORE.innerHTML = this.score;
                        this.score += enemy.strength;
                    }
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
                    if (enemy.health <= 0) {
                        let index = this.enemies.indexOf(enemy);
                        this.enemies.splice(index, 1);
                        SCORE.innerHTML = this.score;
                        this.score += enemy.strength;
                    }
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
                    if (enemy.health <= 0) {
                        let index = this.enemies.indexOf(enemy);
                        this.enemies.splice(index, 1);
                        SCORE.innerHTML = this.score;
                        this.score += enemy.strength;
                    }
                    console.log(enemy.health);
                    return true;
                } 
            });
        });


        if (collision && !this.player.hitted || bendingCollision && !this.player.hitted && this.round === 0) {

            this.player.hitted = true;
            if (this.player.health > 0) {
                this.player.health -= 1;
            }
            SCORE.innerHTML = this.score;
            if(this.score >= 0) {
                this.score -= 3;
                if(this.score < 0){
                    this.score = 0;
                }
            }
            this.player.hittedUpdate();
           
        } else if (collision && !this.player.hitted || bendingCollision && !this.player.hitted && this.round === 1) {

            this.player.hitted = true;
            if (this.player.health > 0) {
                this.player.health -= 5;
            }
            SCORE.innerHTML = this.score;
            if(this.score >= 0) {
                this.score -= 3;
                if(this.score < 0){
                    this.score = 0;
                }
            }
            this.player.hittedUpdate();

        } else if (collision && !this.player.hitted || bendingCollision && !this.player.hitted && this.round === 2) {
            
            this.player.hitted = true;
            if (this.player.health > 0) {
                this.player.health -= 5;
            }
            SCORE.innerHTML = this.score;
            if(this.score >= 0) {
                this.score -= 3;
                if(this.score < 0){
                    this.score = 0;
                }
            }
            this.player.hittedUpdate();

        } else if (collision && !this.player.hitted || bendingCollision && !this.player.hitted && this.round === 3) {
            
            this.player.hitted = true;
            if (this.player.health > 0) {
                this.player.health -= 10;
            }
            SCORE.innerHTML = this.score;
            if(this.score >= 0) {
                this.score -= 3;
                if(this.score < 0){
                    this.score = 0;
                }
            }
            this.player.hittedUpdate();

        }
        console.log(this.player.health);
        const pointsCollision = this.enemies.some(enemy => {
            if (enemy.health === 0) { 
                this.points.push(new Paisho(ctx, enemy.x, enemy.y));
                this.points.some(point => {
                    if(point.collide(this.player)) {
                        this.score += point.value;
                        let indexCoins = this.points.indexOf(point);
                        this.points.splice(indexCoins, 1);
                    }
                });
            }
        });

    }
    winGame() {
        battleAudio.pause();
        this.player.fireAudio.pause();
        this.player.waterAudio.pause();
        this.player.windAudio.pause();
        this.player.earthAudio.pause();

        this.winAudio.play();
        const winGameAppears = setTimeout(() => {
            WIN_BOX.classList.remove('hide');
            WIN_BOX.classList.add('fade-in');
            FINAL_SCORE.innerHTML = SCORE.innerHTML;
            PLAY_AGAIN_BTN.addEventListener('click', () => {
            window.location.reload();
        });
        }, 300);
            
        
    }
    
    gameOver() {
        battleAudio.pause();
        this.player.fireAudio.pause();
        this.player.waterAudio.pause();
        this.player.windAudio.pause();
        this.player.earthAudio.pause();

        this.gameOverAudio.play();
        const gameOverAppears = setTimeout(() =>{
            GAME_OVER.classList.toggle('hide');
            GAME_OVER.classList.toggle('fade-in');
            FINAL_SCORE.innerHTML = SCORE.innerHTML;
            RESTART_BTN.addEventListener('click', () => {
                window.location.reload();
                });
          }, 300);
    }
    
    _loose() {
       
        setTimeout(() => {
            this.gameOver();
        }, 1000);
        clearInterval(this.intervalId);
    }

    _win() {
        setTimeout(() => {
            this.winGame();
        }, 1000);
        clearInterval(this.intervalId);
    }

    _checkPlayerEnemiesLife() {
        if (this.player.health <= 0) {
            this._loose();
        } else if (this.enemies.length === 0  && this.round === 4) {
            this._win();
        }
    }

    updateScore() {
        SCORE.innerText = this.score;
        FINAL_SCORE.innerText = this.score;
    }
    
}