let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 30;

let figures = [];
let lastClickedFigure = null;
let isMouseDown = false;

function addFigure() {
    if (Math.random() > 0.5) {
        addRect();
    }
    else {
        addCircle();
    }
    drawFigure();
}

function drawFigure() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw();
    }
}
//#region AddFigures
function addRect() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    let rect = new Rect(posX, posY, 20, 20, color, ctx);
    figures.push(rect);
}

function addCircle() {
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);
    let color = randomRGBA();

    let circle = new Circle(posX, posY, 10, color, ctx);
    figures.push(circle);
}
//#endregion

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

//#region Util
function clearCanvas() {
    ctx.fillStyle = '#F8F8FF';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

function randomRGBA() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);
    let a = 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function addFigures() {
    addFigure();
    if (figures.length < CANT_FIG) {
        setTimeout(addFigures, 333);
    }
}
//#endregion

setTimeout(() => {
    addFigures();
}, 333);

/* canvas.addEventListener('click', event => {
    if (lastClickedFigure != null) {
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(event.layerX, event.layerY); //coordenadas de x e y adentro del canvas
    if (clickFig != null) {
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
    drawFigure();
}); */

function findClickedFigure(x, y) {
    for (let i = 0; i < figures.length; i++) {
        const element = figures[i];
        if (element.isPointInside(x, y)) {
            return element;
        }
    }
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);