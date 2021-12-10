const { file, assert } = require('../../utils')


const neighbours = [
  [-1, 0],
  [+1, 0],
  [0, -1],
  [0, +1],
];

const step = (lines) =>
  lines.map((line, y) =>
    line.map((val, x) => {
      for ([dx, dy] of neighbours) {
        if (lines[y + dy] === undefined) continue;
        if (lines[y + dy][x + dx] === undefined) continue;
        if (val >= lines[y + dy][x + dx]) return 0;
      }
      return val + 1;
    })
  )

const work = (lines) => {
  let field = lines.map(line => line.split('').map(a => parseInt(a, 10)));
  return step(field)
    .reduce((a, b) => a.concat(b), [])
    .filter(a => a !== 0)
    .map(a => parseInt(a, 10))
    .reduce((a, b) => a + b, 0)
}

const test = `2199943210
3987894921
9856789892
8767896789
9899965678`.trim().split("\n");

assert(work(test), 15);
assert(work(file('input.txt')), 500);