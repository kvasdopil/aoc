const { assert } = require('../../utils');

const NUMS = [
  [11, 1, 3],
  [14, 1, 7],
  [13, 1, 1],
  [-4, 26, 6],
  [11, 1, 14],
  [10, 1, 7],
  [-4, 26, 9],
  [-12, 26, 9],
  [10, 1, 6],
  [-11, 26, 4],
  [12, 1, 0],
  [-1, 26, 7],
  [0, 26, 12],
  [-11, 26, 1],
];

const res = [];
const solve = (i = 0, z = 0, n = 0) => {
  const [a, b, c] = NUMS[i];
  for (const w of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    if (i === 0 && w < 9) continue;
    if (i === 1) console.log(n * 10 + w);
    let zz = Math.floor(z / b);
    if (z % 26 + a !== w) zz = zz * 26 + (w + c)

    if (i === 9 && zz > 26 * 26 * 26 * 26 * 26) return;
    if (i === 10 && zz > 26 * 26 * 26 * 26) return;
    if (i === 11 && zz > 26 * 26 * 26) return;
    if (i === 12 && zz > 26 * 26) return;
    if (i === 13) {
      if (zz === 0) res.push(n * 10 + w);
      return;
    }

    solve(i + 1, zz, n * 10 + w);
  }
  return 0;
}

solve();
assert(Math.min(...res), 91411143612181);
assert(Math.max(...res), 92967699949891);