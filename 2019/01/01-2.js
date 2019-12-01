const { assert, file } = require("../../utils");

const fuel = a => Math.floor(a / 3) - 2;
const calc = mass => {
  const f = fuel(mass);
  if (f <= 0) {
    return 0;
  }
  return f + calc(f);
};

assert(calc(14), 2);
assert(calc(1969), 966);
assert(calc(100756), 50346);

const res = file("01.txt")
  .map(i => parseInt(i, 10))
  .map(calc)
  .reduce((a, b) => a + b, 0);

console.log(res);
