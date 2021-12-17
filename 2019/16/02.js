const { assert, file } = require("../../utils");

const work = (input) => {
  let data = input.repeat(10000).split("").map(a => parseInt(a, 10));
  const off = data.length / 2;
  let a = data.slice(off);

  for (let i = 0; i < 100; i++) {
    let sum = a.reduce((a, b) => a + b, 0);
    const nxt = a.map((i, j) => {
      const res = sum;
      sum -= a[j];
      return res % 10;
    });
    console.log(i);
    a = nxt;
  }
  return a;
}

const input = file("input.txt").shift();
const skip = parseInt(input.substr(0, 7), 10);
const off = input.length * 5000;

assert(work(input).slice(skip - off, skip + 8 - off).join(''), "43310035");