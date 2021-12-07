const { file, assert } = require('../../utils')

const work = (line) => {
  const items = line.split(",").map(line => parseInt(line, 10));
  const max = Math.max(...items);
  let min = 0xffffffff;
  for (let i = 0; i < max; i++) {
    const delta = items.reduce((sum, pos) => sum + Math.abs(pos - i), 0);
    // console.log(i, delta);
    min = Math.min(delta, min);
  }
  return min;
}

assert(work(`16,1,2,0,4,2,7,1,2,14`), 37);
assert(work(file('input.txt').shift()), 354129);