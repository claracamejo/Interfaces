class Tablero extends Juego {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
    }

    draw() {
        super.draw();

        let img = document.querySelector('#imgTablero');

        let imageAspectRatio = (1.0 * img.width) / img.height;
        let imageScaledHeight = this.height * imageAspectRatio;
        let imageScaledWidth = this.width;

        this.ctx.drawImage(img, this.posX, this.posY, imageScaledHeight, imageScaledWidth);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isPointInside(x, y) {
        return !(x < this.posX || x > this.posX + this.width || y < this.posY || y > this.posY + this.height)
    }
}