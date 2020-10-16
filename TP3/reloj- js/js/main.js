let canvas = null;
let ctx = null;

let centerX = 0;
let centerY = 0;
let radius = 0;
let agujaHoras;
let agujaMinutos;
let agujasSegundos;

window.addEventListener('load', load);

function load() {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');

    //posicion centro de las agujas(el medio del reloj)
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    //radio del reloj
    radius = (canvas.width / 2) * 0.8;

    agujaHoras = radius * 0.65;
    agujaMinutos = radius * 0.75;
    agujasSegundos = radius * 0.85;

    setInterval(redraw, 1000);
}

function redraw() {
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //dibujo el circulo del reloj
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

    //obtengo la hora de ese momento
    let now = new Date();


    //ancho de aguja de la Hora y dibujarla
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 6;

    let angle = (now.getHours() / 60) * 2 * Math.PI - Math.PI / 2;
    let px = centerX + Math.cos(angle) * agujaHoras;
    let py = centerY + Math.sin(angle) * agujaHoras;
    console.log(px, py)
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    //aguja minutos
    ctx.lineWidth = 4;

    angle = (now.getMinutes() / 60) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * agujaMinutos;
    py = centerY + Math.sin(angle) * agujaMinutos;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();

    //aguja segundos
    ctx.lineWidth = 2;

    angle = (now.getSeconds() / 60) * 2 * Math.PI - Math.PI / 2;
    px = centerX + Math.cos(angle) * agujasSegundos;
    py = centerY + Math.sin(angle) * agujasSegundos;
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(px, py);
    ctx.stroke();
}