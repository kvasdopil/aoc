const { file, assert } = require('../../utils')

const work = (lines) => {
  const items = lines.map(line => parseInt(line, 10));
  const slide3 = items.map((a, b) => a + items[b + 1] + items[b + 2]);
  return slide3.filter((val, n) => val > slide3[n - 1]).length;
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

assert(work(test), 5);
assert(work(file('input.txt')), 1781);