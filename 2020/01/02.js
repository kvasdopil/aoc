const { file, assert } = require('../../utils')

const work = (lines) => {
  const vals = lines.map(a => parseInt(a, 10));
  for (let i = 2; i < vals.length; i++)
    for (let j = 1; j < i; j++)
      for (let k = 0; k < j; k++)
        if (vals[i] + vals[j] + vals[k] === 2020) return vals[i] * vals[j] * vals[k];

}

const test = `1721
979
366
299
675
1456`.trim().split("\n");

assert(work(test), 241861950);
assert(work(file('input.txt')), 165795564);