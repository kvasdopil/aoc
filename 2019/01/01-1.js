const { assert, file } = require("../../utils");

const calc = a => Math.floor(a / 3) - 2;

assert(calc(12), 2);
assert(calc(14), 2);
assert(calc(1969), 654);
assert(calc(100756), 33583);

const res = file("01.txt")
  .map(i => parseInt(i, 10))
  .map(calc)
  .reduce((a, b) => a + b, 0);

console.log(res);
