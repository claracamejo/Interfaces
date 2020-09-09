let canvas = document.querySelector("#mycanvas");
let ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", dibujar(event));

function dibujar(e) {
  let x = e.clientX;
  let y = e.clientY;
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 10;
  ctx.lineTo(x, y);
  ctx.stroke();
}
