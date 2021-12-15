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

  const xsize = items[0].length;
  const ysize = items.length;
  const getv = (x, y) => {
    if (x < 0) return false;
    if (y < 0) return false;
    const ym = y % ysize;
    const xm = x % xsize;
    let xtile = (x - xm) / ysize;
    let ytile = (y - ym) / xsize;
    let val = items[ym][xm];
    if (xtile >= 5 || ytile >= 5) return false;
    while (xtile > 0) {
      val++;
      xtile--;
      if (val == 10) val = 1;
    }
    while (ytile > 0) {
      val++;
      ytile--;
      if (val == 10) val = 1;
    }
    return val;
  }

  const len = items.length * 5 - 1;
  let last = null;
  let lv = 0;
  while (true) {
    let added = 0;
    for (const key of Object.keys(points)) {
      const [x, y] = key.split(":").map(a => parseInt(a, 10));
      const risk = points[key];

      const active = NS
        .map(([dx, dy]) => [dx + x, dy + y, getv(dx + x, dy + y)])
        .filter(([, , val]) => val)
        .filter(([X, Y, val]) => {
          const k = `${X}:${Y}`;
          if (!points[k]) {
            last = [X, Y];
            points[k] = 99999999;
            added++;
          }
          if (points[k] > risk + val) {
            last = [X, Y];
            lv = risk + val;
            points[k] = risk + val;
            added++;
            return true;
          }
          return false;
        }).length;
    }
    console.log(added, last, lv);
    if (!added) break;
  }

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

assert(work(test), 315);
assert(work(file('input.txt')), 3025);