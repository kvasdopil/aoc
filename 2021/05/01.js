const { file, assert } = require('../../utils')

const work = (lines) => {
  const items = lines.map(line => line.split(' ')).map(([a, , b]) => [...a.split(','), ...b.split(',')].map(a => parseInt(a, 10)));
  const [maxX, maxY] = items.reduce(([mx, my], [x1, y1, x2, y2]) => [
    Math.max(x1, x2, mx),
    Math.max(y1, y2, my)
  ], [0, 0]);

  const field = Array.from(Array(maxY + 1)).map(() => Array.from(Array(maxX + 1)).map(() => 0));

  items.forEach(([x1, y1, x2, y2]) => {
    if (x1 === x2)
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++)
        field[y][x1]++;
    if (y1 === y2)
      for (let x = Math.min(x1, x2); x <= Math.max(x2, x1); x++)
        field[y1][x]++;
  })

  const target = 2;
  return field
    .map(line => line.reduce((sum, pt) => sum + (pt >= target ? 1 : 0), 0))
    .reduce((a, b) => a + b, 0);

}

const test = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`.trim().split("\n");

assert(work(test), 5);
assert(work(file('input.txt')), 7142);