// class Bow {
//     constructor(ctx, x, y, dx, dy) {
//         this.x = x;
//         this.y = y;

//         this.dx = dx;
//         this.dy = dy;
//     }

//     draw() {
//         this.ctx.fillStyle = 'blue';
//         this.ctx.fillRect(this.x, this.y, 10, 10);
//     }

//     update() {
//         this.x += this.dx;
//         this.y += this.dy;
//     }
// }


// -------------------------------------------------

class Airbending {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x =x;
        this.y = y;

        this.width = 10;
        this.heigth = 10;

        this.vx = 0;
        this.vy = 0;
    }

    draw() {
        this.ctx.fillStyle = '#1993E3';
        this.ctx.fillRect(this.x, this.y, this.width, this.heigth);
    }

    move() {
        document.addEventListener('keyup', key => {
            if (key.keyCode === SPACE) {
                this.vx = 1;
            }
        });
        this.x += this.vx;
    }
    
}