const { file, assert } = require('../../utils')

const test1 = [
  `A Y`,
  `B X`,
  `C Z`,
];

const rules = [
  [2, 0, 1], // loose
  [0, 1, 2], // tie
  [1, 2, 0], // win
];

function work(text) {
  return text.map(line => line
    .split(" "))
    .map(([a, b]) => [a.charCodeAt(0) - 65, b.charCodeAt(0) - 88])
    .map(([a, b]) => [b * 3, 1 + rules[a][b]])
    .reduce((i, [a, b]) => a + b + i, 0);
}

assert(work(test1), 12);
assert(work(file('input.txt')), 14652);