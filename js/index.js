document.addEventListener("DOMContentLoaded", function (event) {
  console.log("DOM fully loaded and parsed");

  let canvas = document.querySelector("#mycanvas");
  let ctx = canvas.getContext("2d");
  let colorPicker = document.querySelector("#color");

  colorPicker.addEventListener("change", watchColorPicker, false);

  function watchColorPicker(event) {
    ctx.strokeStyle = event.target.value;
    console.log("en ingles");
  }

  let pintando = false;

  function posInicio(e) {
    pintando = true;
    dibujando(e);
  }

  function posFin() {
    pintando = false;
    ctx.beginPath();
  }

  function dibujando(e) {
    if (!pintando) return;
    ctx.lineWidth = 10; //px del lapiz;
    ctx.lineCap = "round"; //forma del lapiz;
    // ctx.strokeStyle = color; //color del lapiz
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
  }

  canvas.addEventListener("mousedown", posInicio);
  canvas.addEventListener("mouseup", posFin);
  canvas.addEventListener("mousemove", dibujando);
});
