const { file, assert } = require('../../utils')

const work = (lines) => {
  let p = 0;
  let d = 0;
  lines.map(line => line.split(' ')).map(([c, arg]) => {
    const val = parseInt(arg, 10);
    if (c === 'forward') p += val;
    if (c === 'up') d -= val;
    if (c === 'down') d += val;
  })
  return p * d;
}

const test = `forward 5
down 5
forward 8
up 3
down 8
forward 2`.trim().split("\n");

assert(work(test), 150);
assert(work(file('input.txt')), 1815044);