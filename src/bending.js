// class Bending {
//     constructor(player) {
//         this.player = player;
//         this.bendingAttacks = [];
//     }

//     attack() {
//         const elementAttack = new Airbending(
//             this.player.ctx,
//             this.player.x,
//             this.player.y
//         );
//         this.bendingAttacks.push(elementAttack);
//     }   
//     draw() {
//         this.bendingAttacks.forEach(attack => {
//             attack.draw();
//         });
//     }
//     move() {
//         this.bendingAttacks.forEach(attack => {
//             attack.move();
//         });
//     }
// }