var col = 10;
var row = 10;

var matriz = [];
for (let i = 0; i < row; i++) {
  matriz[i] = [];
  for (let j = 0; j < col; j++) {
    matriz[i][j] = Math.random() * 100;
  }
}
console.table(matriz);
ejerc1();
ejerc2();

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
      console.log("division", row % 2 == 0);
      if ((row %= 2 == 0 && matriz[i][j] > vmp)) {
        vmp = matriz[i][j];
      } else if (row % 2 !== 0 && matriz[i][j] > vmi) {
        vmi = matriz[i][j];
      }
    }
  }
  console.log("Valor Maximo Fila Par", vmp);
  console.log("Valor maximo Fila Impar", vmi);
}
