const { file, assert, array2d } = require('../../utils')

const NS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]

const step = (mapping, tiles) => {
  const ngh = (x, y) => parseInt(NS.map(([dx, dy]) => {
    let X = x + dx;
    let Y = y + dy;
    if (tiles[Y] === undefined) Y = y;
    if (tiles[Y][X] === undefined) X = x;
    return tiles[Y][X];
  }).join(''), 2);

  return tiles.map((line, y) => line.map((val, x) =>
    mapping[ngh(x, y)] === '#' ? 1 : 0
  ));
}

const work = (lines, count) => {
  const mapping = lines.shift().trim();

  const sz = 1000;
  let tiles = array2d(sz, sz);

  lines.forEach((line, y) => {
    line.split('').forEach((val, x) => {
      if (val === '#')
        tiles[sz / 2 + y][sz / 2 + x] = 1;
    })
  });

  while (count) {
    tiles = step(mapping, tiles);
    console.log(count);
    count--;
  }
  return tiles.map(line => line.filter(a => a).length).reduce((a, b) => a + b, 0);
}

assert(work(file('test.txt'), 50), 3351);
assert(work(file('input.txt'), 50), 35);