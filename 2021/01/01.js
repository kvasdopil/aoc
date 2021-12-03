const { file, assert } = require('../../utils')

const work = (lines) => {
  const items = lines.map(line => parseInt(line, 10));
  return items.filter((val, n) => val > items[n - 1]).length;
}

const test = `199
200
208
210
200
207
240
269
260
263`.trim().split("\n");

assert(work(test), 7);
assert(work(file('input.txt')), 1752);