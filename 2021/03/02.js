const { file, assert } = require('../../utils')

const mostCommonBit = (lines, bit) => {
  const val = lines.reduce((prev, line) => prev + (line[bit] > 0 ? 1 : -1), 0);
  return (val >= 0) ? 1 : 0;
}

const work = (lines) => {
  let values = lines.map(line => line.split('').map(i => parseInt(i)));
  let bit = 0;
  while (values.length > 1) {
    const mcb = mostCommonBit(values, bit);
    values = values.filter(line => line[bit] === mcb);
    bit++;
  }
  const oxygen = parseInt(values.pop().join(''), 2);

  values = lines.map(line => line.split('').map(i => parseInt(i)));
  bit = 0;
  while (values.length > 1) {
    const mcb = 0 + !mostCommonBit(values, bit);
    values = values.filter(line => line[bit] === mcb);
    bit++;
  }
  const co2 = parseInt(values.pop().join(''), 2);

  return co2 * oxygen;
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

assert(work(test), 230);
assert(work(file('input.txt')), 4267809);