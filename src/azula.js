class Azula extends Enemy {
    constructor (ctx, health, strength, x, y) {
        super(ctx,health, strength, x, y);
    
        this.img = new Image();
        this.img.src = './images/Azula.png';
        this.img.frames = 4;
        this.img.frameIndex = 0;
    }

    draw() {
        
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

        this.animate(this.img);

        this.firebendingAttacks.forEach(attack => {
            attack.draw();
            attack.move();
        });
    }
    
    animate(img) {

        if (this.tick++ > 15) {
          this.tick = 0;
            
          img.frameIndex++;
        }
    
        if (img.frameIndex >= img.frames - 1) {
          img.frameIndex = 0;
        }
    }
}