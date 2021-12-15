const { file, assert } = require('../../utils')

const NS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
]

const work = (lines) => {
  const items = lines.map(line => line.split('').map(val => parseInt(val, 10)));
  let points = { '0:0': 0 };

  const getv = (x, y) => {
    if (x < 0) return false;
    if (y < 0) return false;
  }

  const len = items.length - 1;
  while (true) {
    let added = false;
    for (const key of Object.keys(points)) {
      const [x, y] = key.split(":").map(a => parseInt(a, 10));
      const risk = points[key];

      NS
        .map(([dx, dy]) => [dx + x, dy + y, getv(dx + x, dy + y)])
        .filter(([X, Y]) => items[Y] !== undefined && items[Y][X])
        .forEach(([X, Y]) => {
          const k = `${X}:${Y}`;
          if (!points[k]) {
            points[k] = risk + items[Y][X];
            added = true;
          }
          if (points[k] > risk + items[Y][X]) {
            points[k] = risk + items[Y][X];
            added = true;
          }
        })
    }
    if (!added) break;
  }

  // console.log(points);

  return points[`${len}:${len}`];
}

const test = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`.trim().split("\n");

assert(work(test), 40);
assert(work(file('input.txt')), 720);