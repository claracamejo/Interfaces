let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let lastClickedFigure = null;
let isMouseDown = false;

console.log('canvas', canvasWidth, 'X', canvasHeight);
let puntosR = document.querySelector('#puntosRojo').innerHTML;
let puntosA = document.querySelector('#puntosAmarillo').innerHTML;
let ptsR = 0;
let ptsA = 0;

puntosR.value = 0;
puntosA.value = 0;

console.log(puntosA, puntosR);

let piezas = [];
let tablero;
window.onload = function () {
    addPiezas();
}

function addTablero() {
    let posX = 170;
    let posY = 100;
    let color = 'blue';

    tablero = new Tablero(posX, posY, 500, 450, color, ctx);
    piezas.push(tablero);

    tablero.mostrarTablero();
}

function addFicha(i) {
    let posX = 0;
    let posY = 0;
    let color
    if (i < 21) {
        posX = 40;
        posY = 40;
        color = 'yellow';
    } else {
        posX = 800;
        posY = 40;
        color = 'red';
    }
    let ficha = new Ficha(posX, posY, 33, color, ctx);
    piezas.push(ficha);
}

function addPiezas() {
    for (let i = 0; i < 42; i++) {
        addFicha(i);
    }

    addTablero();

    drawFigure();
}

function drawFigure() {
    clearCanvas();
    for (let i = 0; i < piezas.length; i++) {
        piezas[i].draw();
    }
}

function onMouseDown(e) {
    isMouseDown = true;

    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY); //coordenadas de x e y adentro del canvas
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }

    drawFigure();
}

function onMouseUp(e) {
    isMouseDown = false;
}

function onMouseMove(e) {
    if (isMouseDown && lastClickedFigure != null) {
        lastClickedFigure.setPosition(e.layerX, e.layerY);
        drawFigure();
    }
}

function findClickedFigure(x, y) {
    for (let i = 0; i < piezas.length; i++) {
        const element = piezas[i];
        if (element.isPointInside(x, y)) {
            if (tablero.moveInside(x, y)) {
                tablero.addFicha(element, x, y);
                console.log(tablero.buscar4enLinea());
                if (tablero.buscar4enLinea() == 'red') {
                    ptsR++;
                    puntosR.value = ptsR;
                }
            }
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function clickColumna(evento) {
    if (!pausa) {
        var col = evento.target.getAttribute("data-col");
        jugar(col, tablero);
    }
    else
        console.log("Juego pausado.");
}