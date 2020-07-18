"use strict";

/**
 * Var is muttable, it can be changed every time.
 */
function withVar() {
  for (var i = 0; i < 10; i++) {
    //console.log("var " + i);
  }

  i = 20;

  console.log("Novo valor de I é " + i);
}

/**
 * Let can not be atributed more than one time. Ready only propertie.
 */
function withLet() {
  for (let i = 0; i < 10; i++) {
    //console.log("let value: " + i);
  }
}

withVar();
withLet();

/**
 * It not provide total ready only propertie.
 */
const BANANA = 10;

function sum(a, b) {
  return a + b;
}

// Anonymous
const sum2 = function (a, b) {
  return a + b;
};

//Arrow Function
const sum3 = (a, b) => {
  return a + b;
};

// Reduct arrow function
const sum4 = (a, b) => a + b;

console.log("normal: " + sum(2, 4));
console.log("Anonymous: " + sum2(2, 4));
console.log("Arrow: " + sum3(2, 4));
console.log("Reduct: " + sum4(2, 4));


//Template literals!

const name = "Sérgio";
const surName = "Borges";
const fullName = "Meu nome é : " + name + " " + surName;
console.log(fullName);


const fullNameTemplateLiterals = `Meu nome é ${name} ${surName}`
console.log(`Template Literals: ${fullNameTemplateLiterals}`);

// Default parameters
// var shoul be avoid in this context.
const sum5 = (a = 2, b = 4) => a + b;
console.log(`sum default value ${sum5(3)}`)

