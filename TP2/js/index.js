let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

function addCircle(posX, posY, radius, color) {
    figures.push({
        posX, posY, radius, color, tipo
    });
}

function addRect(posX, posY, width, height, color) {
    figures.push({
        posX, posY, width, height, color, tipo
    });
}

let figures = [];

clearCanvas();

addCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());
addCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());
addCircle(Math.round(Math.random() * canvasWidth), Math.round(Math.random() * canvasHeight), 20, randomRGBA());

for (let index = 0; index < figures.length; index++) {
    let figure = figures[index];
    ctx.fillStyle = figure.color;
    ctx.beginPath();
    ctx.arc(figure.posX, figure.posY, figure.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

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