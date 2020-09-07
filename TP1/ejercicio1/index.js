let col = 10;
let row = 10;

var matriz = [];
for (let i = 0; i < row; i++) {
  matriz[i] = [];
  for (let j = 0; j < col; j++) {
    matriz[i][j] = Math.floor(Math.random() * 100);
  }
}
console.table(matriz);
ejerc1();
ejerc2();
ejerc3();

function ejerc1() {
  let vm = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (matriz[i][j] > vm) {
        vm = matriz[i][j];
      }
    }
  }
  console.log("Valor Maximo", vm);
}

function ejerc2() {
  let vmp = 0;
  let vmi = 0;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i % 2 == 0 && matriz[i][j] > vmp) {
        vmp = matriz[i][j];
      } else if (i % 2 !== 0 && (matriz[i][j] < vmi || vmi == 0)) {
        vmi = matriz[i][j];
      }
    }
  }
  console.log("Valor Maximo Fila Par", vmp);
  console.log("Valor Minimo Fila Impar", vmi);
}

function ejerc3() {
  let promedios = [];
  let suma = 0;
  for (let i = 0; i < row; i++) {
    suma = 0;
    for (let j = 0; j < col; j++) {
      suma += matriz[i][j];
    }
    suma = suma / col;
    console.log(suma);
  }
}
