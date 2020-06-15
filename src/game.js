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

        this.tea = [];

        // this.battleAudio = document.getElementById('battle-sound');
        this.winAudio = document.getElementById('win-sound');
        this.gameOverAudio = document.getElementById('game-over-sound');
        this.pickupPaishoAudio = document.getElementById('pickup-paisho');
        this.grabTeaAudio = document.getElementById('grabbing-tea');
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

        this.points.forEach(point => {
                point.draw();
        });

        this.tea.forEach(tea => {
            tea.draw();
        })
        
    }

    _checkRound() {
        if (this.enemies.length === 0 && this.round === 0) {

            const roundOneAppears = setTimeout(() => {
                ROUND_1.classList.toggle('fade-out');
            }, 2500);
            
            this._addEnemies(0, 15);
            this._addPowerfulEnemies(0, 2);
            this.round = 1;
            const paishoAppear1 = setTimeout(() => {
                this._addPaisho(0, 2);
            }, 4000);
            const teaAppear1 = setTimeout(() => {
                this._addTea(0, 2);
            }, 5000);
            const paishoAppear2 = setTimeout(() => {
                this._addPaisho(0, 3);
            }, 8000);
            const teaAppear2 = setTimeout(() => {
                this._addTea(0, 1);
            }, 8200);

        } else if (this.enemies.length === 0 && this.round === 1) {
            ROUND_2.classList.toggle('hide');
            ROUND_2.classList.toggle('fade-in');

            const roundTwoDisappears = setTimeout(() => {
                ROUND_2.classList.add('fade-out');
            }, 2500);

            this._addEnemies(1, 7);
            this._addPowerfulEnemies(1, 5);
            this.round = 2;
            const paishoAppear3 = setTimeout(() => {
                this._addPaisho(1, 2);
            }, 5000);
            const teaAppear4 = setTimeout(() => {
                this._addTea(1, 1);
            }, 7000);
            const paishoAppear4 = setTimeout(() => {
                this._addPaisho(1, 1);
            }, 10000);
            const teaAppear5 = setTimeout(() => {
                this._addTea(1, 1);
            }, 1300);

        } else if (this.enemies.length === 0 && this.round === 2) {

            ROUND_3.classList.toggle('hide');
            ROUND_3.classList.toggle('fade-in');

            const roundTwoDisappears = setTimeout(() => {
                ROUND_3.classList.add('fade-out');
            }, 2500);

            this._addEnemies(2, 2);
            this._addPowerfulEnemies(2, 7);
            this.round = 3;
            const paishoAppear5 = setTimeout(() => {
                this._addPaisho(2, 3);
            }, 5000);
            const teaAppear6 = setTimeout(() => {
                this._addTea(2, 2);
            }, 8000);

        } else if (this.enemies.length === 0 && this.round === 3) {

            ROUND_4.classList.toggle('hide');
            ROUND_4.classList.toggle('fade-in');

            const roundTwoDisappears = setTimeout(() => {
                ROUND_4.classList.add('fade-out');
            }, 2500);

            this._addPowerfulEnemies(3, 1);
            this.round = 4;
            const paishoAppear6 = setTimeout(() => {
                this._addPaisho(3, 2);
            }, 5000);
            const teaAppear7 = setTimeout(() => {
                this._addTea(3, 1);
            }, 1300);

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
                while(this.enemies.length < enemyNum + 3) {
                    this.enemies.push(new FireSoldier(ctx, 25, 40));
                }
            break;
            case 3:
                while(this.enemies.length < enemyNum) {
                    this.enemies.push(new Azula(ctx, 70, 70));
                }
            break;
        }
    }
    _addPaisho(roundNum, paishoNum) {
        switch(roundNum) {
            case 0:
                while(this.points.length < paishoNum) {
                    this.points.push(new Paisho(ctx, 50));
                }
            break;
            case 1:
                while(this.points.length < paishoNum) {
                    this.points.push(new Paisho(ctx, 100));
                }
            break;
            case 2:
                while(this.points.length < paishoNum) {
                    this.points.push(new Paisho(ctx, 150));
                }
            break;
            case 3:
                while(this.points.length < paishoNum) {
                    this.points.push(new Paisho(ctx, 200));
                }
            break;
        }
    }

    _addTea(roundNum, teaNum) {
        switch(roundNum) {
            case 0:
                while(this.tea.length < teaNum) {
                    this.tea.push(new Tea(ctx, 5));
                }
            break;
            case 1:
                while(this.tea.length < teaNum) {
                    this.tea.push(new Tea(ctx, 10));
                }
            break;
            case 2:
                while(this.tea.length < teaNum) {
                    this.tea.push(new Tea(ctx, 15));
                }
            break;
            case 3:
                while(this.tea.length < teaNum) {
                    this.tea.push(new Tea(ctx, 20));
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
        const pointsCollision = this.points.some(point => {
                    const timeOutPaisho = setTimeout(() => {
                        let indexCoins = this.points.indexOf(point);
                        this.points.splice(indexCoins, 1);
                    }, 2000);

                    if(point.collide(this.player)) {
                        this.pickupPaishoAudio.play();
                        this.pickupPaishoAudio.volume = 0.2;
                        this.score += point.value;
                        SCORE.innerHTML = this.score;
                        let indexCoins = this.points.indexOf(point);
                        this.points.splice(indexCoins, 1);
                    }
                });
        const teaCollision = this.tea.some(tea => {
                    const timeOutTea = setTimeout(() => {
                        let indexTea = this.tea.indexOf(tea);
                        this.tea.splice(indexTea, 1);
                    }, 2000);

                    if(tea.collide(this.player)) {
                        this.grabTeaAudio.play();
                        this.pickupPaishoAudio.volume = 0.2;
                        this.player.health += tea.value;
                        let indexTea = this.tea.indexOf(tea);
                        this.tea.splice(indexTea, 1);
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
            WIN_H2.classList.remove('hide');
            WIN_H2.classList.add('win-loose-h2');
            WIN_PAISHO.classList.add('paisho-flip');
            WIN_FINAL_SCORE.classList.add('fade-in');
            WINNING_FINAL_SCORE.innerHTML = SCORE.innerHTML;
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
            GAME_OVER_H2.classList.toggle('hide');
            GAME_OVER_H2.classList.toggle('win-loose-h2');
            setTimeout(() => {
                GAME_OVER_PAISHO.classList.toggle('hide');
                GAME_OVER_PAISHO.classList.toggle('paisho-flip');
                GAME_OVER_FINAL_SCORE.classList.toggle('hide');
                GAME_OVER_FINAL_SCORE.classList.toggle('fade-in');
                RESTART_BTN.classList.toggle('hide');
                RESTART_BTN.classList.toggle('fade-in');
            }, 1000);
            LOOSE_FINAL_SCORE.innerHTML = SCORE.innerHTML;
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