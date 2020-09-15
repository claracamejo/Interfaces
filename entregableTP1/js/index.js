document.addEventListener("DOMContentLoaded", function (event) {
  let canvas = document.querySelector("#mycanvas");
  canvas.addEventListener("mousedown", function (e) {
    pintando = true;
    dibujando(e);
  });
  canvas.addEventListener("mouseup", function () {
    pintando = false;
    ctx.beginPath();
  });
  canvas.addEventListener("mousemove", dibujando);

  let ctx = canvas.getContext("2d");
  ctx.lineCap = "round";//para que quede por defecto, despues se modifica en borrar y lapiz;

  let rect = canvas.getBoundingClientRect();

  let pintando = false;
  let color;
  document.querySelector("#color").addEventListener("change", function (e) {
    color = e.target.value;
    ctx.strokeStyle = color;
  });

  let tam;
  document.querySelector("#tam").addEventListener("change", function (e) {
    tam = e.target.value;
    ctx.lineWidth = tam;
    console.log("tamaño del lapiz", (tam, e.target.value));
  });

  document.querySelector("#borrar").addEventListener("click", function () {
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineCap = "square";

  });

  document.querySelector("#lapiz").addEventListener('click', lapiz);

  function lapiz() {
    console.log("lapiz");
    ctx.lineWidth = tam;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
  };

  document.querySelector("#img").addEventListener("change", cargarImg);
  let content;
  let image;
  let imageAspectRatio;
  let imageScaledWidth;
  let imageScaledHeight;
  let imageData;

  document.querySelector("#download").addEventListener("click", function () {
    image = canvas.toDataURL("image/jpg");
    this.href = image;
    console.log("descargando imagen...")
  });

  document.querySelector("#reset").addEventListener("click", function () {

    canvas.width = '1100';
    canvas.height = '550';
    content = null;
    image = null;
    imageData = null;
    lapiz();
  })

  function dibujando(e) {
    borrado = false;
    if (!pintando) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function cargarImg(e) {
    console.log("cargar img");

    let file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      content = readerEvent.target.result; // this is the content!
      image = new Image();

      imgLoad();
    };
  };


  function imgLoad() {
    image.src = content;

    image.onload = function () {

      imageAspectRatio = (1.0 * this.width) / this.height;
      imageScaledHeight = canvas.height;
      imageScaledWidth = canvas.height * imageAspectRatio;
      canvas.width = imageScaledWidth;

      ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);

      imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);

      ctx.putImageData(imageData, 0, 0);
      lapiz();
    }
  };

  document.querySelector('#limpiar').addEventListener('click', imgLoad);

  document.querySelector('#negativo').addEventListener('click', negativo);

  function negativo() {
    image.onload();

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

  document.querySelector('#brillo').addEventListener('click', brillo);

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

  document.querySelector('#sepia').addEventListener('click', sepia);
  function sepia() {
    image.onload();

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
  };

  document.querySelector('#binarizacion').addEventListener('click', binarizacion);

  function binarizacion() {
    image.onload();
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

  document.querySelector('#blur').addEventListener('click', blur);

  function blur() {

    let px = imageData.data;
    let tmppx = new Uint8ClampedArray(px.length);

    for (let j = 0; j < px.length; j++) {
      tmppx[j] = px[j];//copio los pixeles en RGBa

      if (j % 4 === 3) { continue; }

      px[j] = (tmppx[j]     //recorre y modifa el pixel con el promedio de los pixeles vecinos
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
    delete tmppx;
  }

  document.querySelector("#saturation-level").addEventListener("change", saturation);

  function saturation(event) {
    image.onload();

    let value = 0 - event.target.value; //range between -100 and 0
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let dataArr = imageData.data;
    for (let i = 0; i < dataArr.length; i += 4) {
      let r = dataArr[i];
      let g = dataArr[i + 1];
      let b = dataArr[i + 2];

      var gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      dataArr[i] = gray * value + dataArr[i] * (1 - value);
      dataArr[i + 1] = gray * value + dataArr[i + 1] * (1 - value);
      dataArr[i + 2] = gray * value + dataArr[i + 2] * (1 - value);
    }
    ctx.putImageData(imageData, 0, 0);
  }
});
