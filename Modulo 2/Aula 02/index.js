import operations from "./operations.js";
import mult from "./secondOperations.js";
import {div, rest} from "./thirdOperations.js";


console.log(operations.subtract(2, 1));
console.log(operations.add(5, 5));
console.log(mult(3, 4));
console.log(operations.name);
console.log(div(5, 2));
console.log(rest(5, 2));