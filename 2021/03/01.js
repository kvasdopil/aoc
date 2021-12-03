const { file, assert } = require('../../utils')

const mostCommonBit = (lines, bit) => {
  const val = lines.reduce((prev, line) => prev + (line[bit] > 0 ? 1 : -1), 0);
  return (val >= 0) ? 1 : 0;
}

const work = (lines) => {
  const values = lines.map(line => line.split('').map(i => parseInt(i)))
  const gamma = values[0].map((_, bit) => mostCommonBit(values, bit));
  const eps = gamma.map(i => 0 + !i);
  const g = parseInt(gamma.join(''), 2)
  const e = parseInt(eps.join(''), 2);
  return g * e;
}

const test = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`.trim().split("\n");

assert(work(test), 198);
assert(work(file('input.txt')), 3969000);