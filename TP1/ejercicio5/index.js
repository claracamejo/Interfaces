let ctx = document.querySelector("#mycanvas").getContext("2d");

let width = 500;
let height = 500;
let imageData = ctx.createImageData(width, height);
let color;
let r = 0;
let g = 0;
let b = 0;
let a = 255;

for (let x = 0; x < width; x++) {
  let coef = (x - width / 2) / (width / 2);

  if (x <= width / 2) {
    color = 255 * (1 + coef);
    r = color;
    g = color;
    b = 0;
  } else {
    color = 255 * (1 - coef);
    r = 255;
    g = color;
    b = 0;
  }

  for (let y = 0; y < height; y++) {
    setPixel(imageData, x, y, r, g, b, a);
  }
}
ctx.putImageData(imageData, 0, 0);

function setPixel(imageData, x, y, r, g, b, a) {
  let index = (x + y * imageData.width) * 4;

  imageData.data[index + 0] = r;
  imageData.data[index + 1] = g;
  imageData.data[index + 2] = b;
  imageData.data[index + 3] = a;
}
