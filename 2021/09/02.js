const { file, assert } = require('../../utils')


const neighbours = [
  [-1, 0],
  [+1, 0],
  [0, -1],
  [0, +1],
];

function calcSize(field, x, y) {
  if (!field[y]) return 0;
  if (field[y][x] !== ' ') return 0;
  field[y][x] = "#";
  return neighbours.reduce((sum, [dx, dy]) => sum + calcSize(field, x + dx, y + dy), 1);
}

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

const process = (lines) =>
  lines.map((line, y) =>
    line.map((val, x) => val === 9 ? '#' : ' ')
  )

const work = (lines) => {
  let field = lines.map(line => line.split('').map(a => parseInt(a, 10)));
  const basins = process(field);
  const peaks = step(field);
  const sizes = [];
  for (const y in peaks)
    for (const x in peaks[y])
      if (peaks[y][x] !== 0)
        sizes.push(calcSize(basins, parseInt(x, 10), parseInt(y, 10)));

  const [a, b, c] = sizes.sort((a, b) => b - a);
  return a * b * c;
}

const test = `2199943210
3987894921
9856789892
8767896789
9899965678`.trim().split("\n");

assert(work(test), 1134);
assert(work(file('input.txt')), 500);