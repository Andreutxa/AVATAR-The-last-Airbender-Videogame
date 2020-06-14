class Tea extends Paisho {
    constructor(ctx, value) {
        super(ctx, value);
        this.img = new Image();
        this.img.src = './images/tea-cup.png';

        this.width = 30;
        this.height = 30;

        this.value = value;
    }
}