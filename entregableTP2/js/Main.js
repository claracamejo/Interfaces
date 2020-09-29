let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let lastClickedFigure = null;
let isMouseDown = false;

console.log('canvas', canvasWidth, 'X', canvasHeight);
let ptsR = 0;
let ptsA = 0;
let puntosR = document.querySelector('#puntosRojo');
let puntosA = document.querySelector('#puntosAmarillo');
document.querySelector('#reiniciar').addEventListener('click', limpiar);

function limpiar() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    piezas = [];
    addPiezas();
};

puntosR.getAttributeNode('value').value = ptsR;
puntosA.getAttributeNode('value').value = ptsA;

console.log(puntosA, puntosR);

let piezas = [];
let tablero;
let ultimoJugador;
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
    console.log('addpiezas');
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
        ultimoJugador = lastClickedFigure.getFill();
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
    if (tablero.moveInside(e.layerX, e.layerY) && lastClickedFigure != null) {
        tablero.addFicha(lastClickedFigure, e.layerX, e.layerY);
        drawFigure();
    }
    setTimeout(buscarGanador, 1500);
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
        if (element.isPointInside(x, y) && (element.getFill() != ultimoJugador)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

function buscarGanador() {
    if (tablero.buscar4enLinea() == 'red') {
        ptsR++;
        puntosR.getAttributeNode('value').value = ptsR;
        alert("Ha Ganado el Jugador Rojo");
        limpiar();
    } else if (tablero.buscar4enLinea() == 'yellow') {
        ptsA++;
        puntosA.getAttributeNode('value').value = ptsA;
        alert("Ha Ganado el Jugador Amarillo");
        limpiar();
    }
}

function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};