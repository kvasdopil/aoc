const { file, assert } = require('../../utils')

const work = (lines) => {
  const vals = lines.map(a => parseInt(a, 10));
  for (let i = 1; i < vals.length; i++)
    for (let j = 0; j < i; j++) {
      if (vals[i] + vals[j] === 2020) return vals[i] * vals[j];
    }
}

const test = `1721
979
366
299
675
1456`.trim().split("\n");

assert(work(test), 514579);
assert(work(file('input.txt')), 158916);