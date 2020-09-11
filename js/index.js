document.addEventListener("DOMContentLoaded", function (event) {
  let canvas = document.querySelector("#mycanvas");
  canvas.addEventListener("mousedown", posInicio);
  canvas.addEventListener("mouseup", posFin);
  canvas.addEventListener("mousemove", dibujando);

  let ctx = canvas.getContext("2d");

  let rect = canvas.getBoundingClientRect();

  let pintando = false;
  let colorPicker = document.querySelector("#color");
  colorPicker.addEventListener("change", watchColorPicker);

  let tamanio = document.querySelector("#tam").addEventListener("change", tamPencil);

  let borrado = false;
  let gomaBorrar = document.querySelector("#borrar").addEventListener("click", borrar);

  let img = document.querySelector("#img").addEventListener("change", cargarImg);
  let content;
  let image;
  let imageAspectRatio;
  let imageScaledWidth;
  let imageScaledHeight;
  let imageData;

  let btn = document.querySelector("#download");
  btn.addEventListener("click", function () {
    let image = canvas.toDataURL("image/jpg");
    this.href = image;
  });

  function watchColorPicker(event) {
    ctx.strokeStyle = event.target.value;
    console.log("cambio de color");
  }

  function tamPencil(event) {
    ctx.lineWidth = event.target.value;
    console.log("tamaño del lapiz", (ctx.lineWidth = event.target.value));
  }

  function borrar(e) {
    console.log("entro a borrar");
    borrado = true;
    borrando(e);
  }

  function posInicio(e) {
    pintando = true;
    dibujando(e);
  }

  function posFin() {
    pintando = false;
    ctx.beginPath();
  }

  function dibujando(e) {
    borrado = false;
    if (!pintando) return;

    ctx.lineCap = "round"; //forma del lapiz;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function borrando(e) {
    if (!borrado) return;

    ctx.clearRect(e.clientX - rect.left, e.clientY - rect.top, 15, 15);
    ctx.beginPath();

    borrado = false;
  }

  function cargarImg(e) {
    console.log("cargar img");

    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      content = readerEvent.target.result; // this is the content!
      image = new Image();

      image.src = content;

      image.onload = function () {
        imageAspectRatio = (1.0 * this.height) / this.width;
        imageScaledWidth = canvas.width;
        imageScaledHeight = canvas.width * imageAspectRatio;

        ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

        imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);


        let tmppx = new Uint8ClampedArray(imageData.width);

        for (let j = 0; j < imageData.width; j++) {
          if (j % 4 === 3) { continue; }

          imageData[j] = (tmppx[j]
            + (tmppx[j - 4] || tmppx[j])
            + (tmppx[j + 4] || tmppx[j])
            + (tmppx[j - 4 * imageData.width] || tmppx[j])
            + (tmppx[j + 4 * imageData.width] || tmppx[j])
            + (tmppx[j - 4 * imageData.width - 4] || tmppx[j])
            + (tmppx[j + 4 * imageData.width + 4] || tmppx[j])
            + (tmppx[j - 4 * imageData.width + 4] || tmppx[j])
            + (tmppx[j + 4 * imageData.width - 4] || tmppx[j])
          ) / 9;
        }

        ctx.putImageData(imageData, 0, 0);
      }


    };
  };

  download_img = function (el) {
    var image = canvas.toDataURL("image/jpg");
    el.href = image;
  };

  function negativo() {

    for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;

        let r = 255 - imageData.data[index + 0];
        let g = 255 - imageData.data[index + 1];
        let b = 255 - imageData.data[index + 2];
        let rgb = (r + g + b) / 3;

        imageData.data[index + 0] = rgb;
        imageData.data[index + 1] = rgb;
        imageData.data[index + 2] = rgb;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function brillo() {
    for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;

        imageData.data[index + 0] += 50;
        imageData.data[index + 1] += 50;
        imageData.data[index + 2] += 50;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function sepia() {
    for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;

        let r = imageData.data[index + 0];
        let g = imageData.data[index + 1];
        let b = imageData.data[index + 2];
        let grey = (r + g + b) / 3;

        let nuevoRojo = 0.393 * grey + 0.769 * grey + 0.189 * grey;
        let nuevoVerde = 0.349 * grey + 0.686 * grey + 0.168 * grey;
        let nuevoAzul = 0.272 * grey + 0.534 * grey + 0.131 * grey;

        if (nuevoRojo > 255)
          r = 255;
        else
          r = nuevoRojo;

        if (nuevoVerde > 255)
          g = 255;
        else
          g = nuevoVerde;

        if (nuevoAzul > 255)
          b = 255;
        else
          b = nuevoAzul;

        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function binarizacion() {

    for (let j = 0; j < imageData.height; j++) {
      for (let i = 0; i < imageData.width; i++) {
        let index = (i + imageData.width * j) * 4;

        let r = imageData.data[index + 0];
        let g = imageData.data[index + 1];
        let b = imageData.data[index + 2];

        let rgb = (r + g + b) / 3;

        if (rgb > 100)
          rgb = 255;
        else
          rgb = 0;

        imageData.data[index + 0] = rgb;
        imageData.data[index + 1] = rgb;
        imageData.data[index + 2] = rgb;
      }
    }

    ctx.putImageData(imageData, 0, 0);

  }

  function blur() {
    let tmppx = new Uint8ClampedArray(imageData.width);

    for (let j = 0; j < imageData.width; j++) {
      if (j % 4 === 3) { continue; }

      imageData[j] = (tmppx[j]
        + (tmppx[j - 4] || tmppx[j])
        + (tmppx[j + 4] || tmppx[j])
        + (tmppx[j - 4 * imageData.width] || tmppx[j])
        + (tmppx[j + 4 * imageData.width] || tmppx[j])
        + (tmppx[j - 4 * imageData.width - 4] || tmppx[j])
        + (tmppx[j + 4 * imageData.width + 4] || tmppx[j])
        + (tmppx[j - 4 * imageData.width + 4] || tmppx[j])
        + (tmppx[j + 4 * imageData.width - 4] || tmppx[j])
      ) / 9;
    }

    ctx.putImageData(imageData, 0, 0);
  }
});
