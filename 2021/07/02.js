const { file, assert } = require('../../utils')

const fi = (a, b) => {
  let result = 0;
  for (let i = 1; i <= Math.abs(a - b); i++)
    result += i;
  return result;
}

const work = (line) => {
  const items = line.split(",").map(line => parseInt(line, 10));
  const max = Math.max(...items);
  let min = 0xffffffff;
  for (let i = 0; i < max; i++) {
    const delta = items.reduce((sum, pos) => sum + fi(pos, i), 0);
    min = Math.min(delta, min);
  }
  return min;
}

assert(work(`16,1,2,0,4,2,7,1,2,14`), 168);
assert(work(file('input.txt').shift()), 98905973);