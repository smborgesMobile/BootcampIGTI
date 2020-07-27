const number = parseInt(process.argv[2]);
//Query parameters.
console.log("Numero: " + number);
const multiples = [];

for (let i = 0; i < number; i++) {
    if(i % 3 === 0 || i % 5 === 0) {
        multiples.push(i);
    }
}