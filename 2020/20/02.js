const { file, assert } = require('../../utils')


const bitmaps = (tile) => {
  const topA = tile[0].map(ch => ch === '#' ? '1' : '0');
  const btmA = tile[tile.length - 1].map(ch => ch === '#' ? '1' : '0');
  const lftA = tile.map(line => line[0]).map(ch => ch === '#' ? '1' : '0');
  const rgtA = tile.map(line => line[line.length - 1]).map(ch => ch === '#' ? '1' : '0');

  return [
    parseInt(topA.join(''), 2),
    parseInt(lftA.join(''), 2),
    parseInt(btmA.join(''), 2),
    parseInt(rgtA.join(''), 2),
    parseInt(topA.reverse().join(''), 2),
    parseInt(lftA.reverse().join(''), 2),
    parseInt(btmA.reverse().join(''), 2),
    parseInt(rgtA.reverse().join(''), 2),
  ]
}

const parse = (lines) => {
  lines.push("");
  let result = [];
  let tile = [];
  let number = 0;
  for (const line of lines) {
    const re = /Tile ([0-9]+):/.exec(line);
    if (re) {
      number = re[1];
      continue;
    }

    if (line === "") {
      result.push({ number, tile, bmp: bitmaps(tile) });
      tile = [];
      continue;
    }

    tile.push(line.split(''));
  }
  return result;
}

const sides = ['T', 'L', 'B', 'R', 'TI', 'LI', 'BI', 'RI'];

const find = (tiles, tile, side) => {
  const nexts = {
    L: 'R',
    R: 'L',
    T: 'B',
    B: 'T',
    LI: 'RI',
    RI: 'LI',
    TI: 'BI',
    BI: 'TI',
  };

  const si = sides.indexOf(side);
  const val = tile.bmp[si];

  for (const j in tiles) {
    const t2 = tiles[j].bmp;
    if (tile === tiles[j]) continue;
    const si2 = t2.indexOf(val)
    if (si2 === -1) continue;
    return [parseInt(j, 10), nexts[sides[si2]]];
  }
  return false;
}

const traverse = (tiles, start, side) => {
  let next = start;
  const result = [next];
  while (true) {
    next = findAndRotate(tiles, next, side);
    if (next === false) return result;
    result.push(next);
  }
}

const rotate = (t) => {
  const { tile } = t;
  const l = tile[0].length - 1;
  t.tile = tile.map((line, y) => line.map((val, x) => tile[l - x][y]));
  t.bmp = bitmaps(t.tile);
}

const flip = (t) => {
  const { tile } = t;
  const l = tile[0].length - 1;
  t.tile = tile.map((line, y) => line.map((val, x) => tile[y][l - x]));
  t.bmp = bitmaps(t.tile);
}

const flipv = (t) => {
  const { tile } = t;
  const l = tile[0].length - 1;
  t.tile = tile.map((line, y) => line.map((val, x) => tile[l - y][x]));
  t.bmp = bitmaps(t.tile);
}

const findAndRotate = (tiles, start, dir) => {
  const f = find(tiles, tiles[start], dir);
  if (!f) return false;
  let [next, letter] = f;
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  flip(tiles[next]); // flip horizontally
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  // rotate(tiles[next]);
  flip(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  rotate(tiles[next]);
  [next, letter] = find(tiles, tiles[start], dir);
  if (letter === dir) return next;
  console.log('fail')
  return false;
}

const work = (lines) => {
  const tiles = parse(lines);

  const size = Math.sqrt(tiles.length);
  const field = Array.from(Array(size)).map(() => Array.from(Array(size).fill(-1)));

  const h = traverse(tiles, 0, 'L');
  console.log(h)
  const left = h[h.length - 1];

  const l2 = traverse(tiles, left, 'B');
  const bottom = l2[l2.length - 1];

  const row1 = traverse(tiles, bottom, 'R');
  field[field.length - 1] = row1;

  for (const x in row1) {
    let col = traverse(tiles, row1[x], 'T');
    let col2 = traverse(tiles, row1[x], 'B');
    if (col.length === 1 && col2.length !== 1) {
      col = col2;
      flipv(tiles, row1[x]);
    }
    let y = field.length - 1;
    while (col.length) {
      const val = col.shift();
      field[y][x] = val;
      y--;
    }
  }

  const bitmap = Array.from(Array(size * 8)).map(() => Array.from(Array(size * 8).fill('.')));

  field.forEach((row, y) => {
    row.forEach((id, x) => {
      let X = x * 8;
      let Y = y * 8;
      tiles[id].tile.forEach((tilerow, ty) => {
        tilerow.forEach((v, tx) => {
          if (ty === 0 || tx === 0 || ty === 9 || tx === 9) return;
          bitmap[Y + ty - 1][X + tx - 1] = v;
        });
      })
    })
  })

  const cnt = { tile: bitmap };
  rotate(cnt);
  console.log(cnt.tile.map(line => line.join('')).join('\n') + '\n');

  const monster = [
    '..................#.',
    '#    ##    ##    ###',
    '.#  #  #  #  #  #   ',
  ];

  const f = cnt.tile.map((line, y) =>
    line.map((v1, x) => {
      const found = monster.every((line, my) =>
        line.split("").every((v2, mx) => {
          if (v2 !== '#') return true;
          if (!cnt.tile[y + my]) return false;
          return cnt.tile[y + my][x + mx] === '#';
        })
      );
      if (!found) return '.';

      monster.forEach((line, my) =>
        line.split("").forEach((v2, mx) => {
          if (v2 !== '#') return true;
          cnt.tile[y + my][x + mx] = 'O'
        })
      );
    })
  )

  console.log(cnt.tile.map(line => line.join('')).join('\n') + '\n');

  return cnt.tile.map(line => line.join('')).join('').split("").filter(a => a === '#').length;
}

assert(work(file('test.txt')), 273);
assert(work(file('input.txt')), 2009);
