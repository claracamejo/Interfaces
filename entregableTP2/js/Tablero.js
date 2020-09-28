class Tablero extends Juego {
    constructor(posX, posY, width, height, fill, context) {
        super(posX, posY, fill, context);

        this.width = width;
        this.height = height;
        this.imageAspectRatio;
        this.imageScaledHeight;
        this.juego = [];
        this.col = 7;
        this.fil = 6;

        this.iniciarTablero();
    }

    draw() {
        super.draw();

        let img = document.querySelector('#imgTablero');

        this.imageAspectRatio = (1.0 * img.width) / img.height;
        this.imageScaledHeight = this.height * this.imageAspectRatio;

        this.ctx.drawImage(img, this.posX, this.posY, this.imageScaledHeight, this.width);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    isPointInside(x, y) {

        return false;
    }

    moveInside(x, y) {
        let fil; let col;
        col = Math.round((x - this.posX) / (this.imageScaledHeight / this.fil));
        fil = Math.round((y - this.posY) / (this.width / this.col)) - 1;
        console.log(fil, col);
        return (fil >= 0 && fil < this.fil && col >= 0 && col < this.col);
    }

    addFicha(ficha, x, y) {
        let fil; let col;

        col = Math.round((x - this.posX) / (this.imageScaledHeight / this.fil));
        fil = Math.round((y - this.posY) / (this.width / this.col)) - 1;
        if (this.juego[fil][col] === 'vacio') {
            this.juego[fil][col] = ficha;
        };

        this.mostrarTablero();
    }

    iniciarTablero() {
        for (let f = 0; f < this.fil; f++) {
            this.juego[f] = ['vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio', 'vacio'];
        }
    }

    mostrarTablero() {
        console.table(this.juego);
    }

    buscar4enLinea() {
        //Busca horizontal
        for (let f = 0; f < this.fil; f++) {
            let n1 = 0;
            let n2 = 0;
            for (let c = 0; c < this.col; c++) {
                if (this.juego[f][c] === 'vacio') {
                    n1 = 0;
                    n2 = 0;
                }
                else if (this.juego[f][c].getFill() == 'yellow') {
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 'yellow';
                }
                else if (this.juego[f][c].getFill() == 'red') {
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 'red';
                }
            }
        }

        //Buscamos en vertical de abajo a arriba
        for (let c = 0; c < this.col; c++) {
            let n1 = 0;
            let n2 = 0;
            for (let f = this.fil - 1; f >= 0; f--) {	//De abajo a arriba para poder cortar.
                if (this.juego[f][c] === 'vacio') {
                    break;	//Ya no hay mas en la columna.
                }
                else if (this.juego[f][c].getFill() == 'yellow') {
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 'yellow';
                }
                else if (this.juego[f][c].getFill() == 'red') {
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 'red';
                }
            }
        }

        //Buscamos en diagonal de izquierda a derecha
        for (let i = -(this.col + 4); i < this.col; i++) {
            let n1 = 0;
            let n2 = 0;
            for (let f = 0; f < this.fil; f++) {
                let c = i + f;
                if ((c < 0) || (c >= this.col))
                    continue;
                if (this.juego[f][c] == 'vacio') {
                    n1 = 0;
                    n2 = 0;
                }
                else if (this.juego[f][c].getFill() == 'yellow') {
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 'yellow';
                }
                else if (this.juego[f][c].getFill() == 'red') {
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 'red';
                }
            }
        }

        //Buscamos en diagonal de derecha a izquierda
        for (let i = 0; i < this.col + 4; i++) {
            let n1 = 0;
            let n2 = 0;
            for (let f = 0; f < this.fil; f++) {
                let c = i - f;
                if ((c < 0) || (c >= this.col))
                    continue;
                if (this.juego[f][c] == 'vacio') {
                    n1 = 0;
                    n2 = 0;
                }
                else if (this.juego[f][c].getFill() == 'yellow') {
                    n1++;
                    n2 = 0;
                    if (n1 == 4)
                        return 'yellow';
                }
                else if (this.juego[f][c].getFill() == 'red') {
                    n1 = 0;
                    n2++;
                    if (n2 == 4)
                        return 'red';
                }
            }
        }
        return 'vacio';
    }

}