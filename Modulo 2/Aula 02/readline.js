import readline from "readline";

//Input e output serão dadas via terminal.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function start() {
  question();
}

function question() {
  rl.question("Digite um número: ", (numero) => {
    console.log(numero);
    question();
  });
}

start();
