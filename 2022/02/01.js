const { file, assert } = require('../../utils')

const test1 = [
  `A Y`,
  `B X`,
  `C Z`,
];

const rules = [
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3],
];

function work(text) {
  return text.map(line => line
    .split(" "))
    .map(([a, b]) => [a.charCodeAt(0) - 65, b.charCodeAt(0) - 88])
    .map(([a, b]) => b + 1 + rules[a][b])
    .reduce((i, j) => i + j, 0);
}

assert(work(test1), 15);
assert(work(file('input.txt')), 10718);
