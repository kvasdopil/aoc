const { file, assert } = require('../../utils')

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
      result.push({ number, tile });
      tile = [];
      continue;
    }

    tile.push(line.split(''));
  }
  return result;
}

const bitmaps = ({ tile }) => {
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

const sides = ['T', 'L', 'B', 'R', 'TI', 'LI', 'BI', 'RI'];

const find = (bmps, tile, side) => {
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
  const val = tile[si];

  for (const j in bmps) {
    const t2 = bmps[j];
    if (tile === t2) continue;
    const si2 = t2.indexOf(val)
    if (si2 === -1) continue;
    return [parseInt(j, 10), nexts[sides[si2]]];
  }
  return false;
}

const traverse = (bmps, start, side) => {
  let next = start;
  const result = [next];
  while (true) {
    next = findAndRotate(bmps, next, side);
    // console.log('find', next, bmps[next])
    if (next === false) return result;
    result.push(next);
  }
}

const next90deg = {
  L: 'B',
  R: 'T',
  T: 'L',
  B: 'R',
  LI: 'BI',
  RI: 'TI',
  TI: 'LI',
  BI: 'RI',
};

const findTopLeft = (bmps) => {
  let start = 0;
  let letter = 'L';
  const left = traverse(bmps, start, letter);
  console.log('l', left);
  if (left.length)
    [start, letter] = left.pop();
  letter = next90deg[letter];
  const up = traverse(bmps, start, letter);
  console.log('t', up)
  if (up.length)
    [start, letter] = up.pop();
  return [start, letter];
}

const rotate = (bmps, i) => {
  const [t, l, b, r, ti, li, bi, ri] = bmps[i];
  bmps[i] = [r, t, l, b, ri, ti, li, bi];
}

const flip = (bmps, i) => {
  const [t, l, b, r, ti, li, bi, ri] = bmps[i];
  bmps[i] = [ti, l, bi, r, t, li, b, ri];
}

const findAndRotate = (bmps, start, dir) => {
  const f = find(bmps, bmps[start], dir);
  if (!f) return false;
  let [next, letter] = f;
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  flip(bmps, next); // flip horizontally
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  // rotate(bmps, next);
  flip(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  rotate(bmps, next);
  [next, letter] = find(bmps, bmps[start], dir);
  if (letter === dir) return next;
  console.log('fail')
  return false;
}

const work = (lines) => {
  const tiles = parse(lines);
  const bmps = tiles.map(bitmaps);

  const size = Math.sqrt(tiles.length);
  const field = Array.from(Array(size)).map(() => Array.from(Array(size).fill(-1)));

  const h = traverse(bmps, 0, 'L');
  const left = h[h.length - 1];

  const l2 = traverse(bmps, left, 'B');
  const bottom = l2[l2.length - 1];

  const row1 = traverse(bmps, bottom, 'R');
  field[field.length - 1] = row1;

  for (const x in row1) {
    let col = traverse(bmps, row1[x], 'T');
    let col2 = traverse(bmps, row1[x], 'B');
    if (col.length === 1 && col2.length !== 1) {
      col = col2;
    }
    let y = field.length - 1;
    while (col.length) {
      const val = col.shift();
      field[y][x] = val;
      y--;
    }
  }

  // console.log(field.map(line => line.join()));

  const bitmap = Array.from(Array(size * 10)).map(() => Array.from(Array(size * 10).fill('.')));

  field.forEach((row, y) => {
    row.forEach((id, x) => {
      let X = x * 10;
      let Y = y * 10;
      tiles[id].tile.forEach((tilerow, ty) => {
        tilerow.forEach((v, tx) => {
          bitmap[Y + ty][X + tx] = v;
        });
      })
    })
  })

  console.log(bitmap.map(line => line.join('')).join('\n') + '\n');

  return [];
}

assert(work(file('test.txt')), 20899048083289);
assert(work(file('input.txt')), 17148689442341);
