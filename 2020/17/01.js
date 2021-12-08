const { file, assert } = require('../../utils')

const neighbours = (field, x, y, z) => {
  let sum = 0;
  for (let dx = -1; dx <= 1; dx++)
    for (let dy = -1; dy <= 1; dy++)
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        if (!field[z + dz]) continue;
        if (!field[z + dz][y + dy]) continue;
        if (field[z + dz][y + dy][x + dx] === '#') sum++;
      }
  return sum;
}

const step = (field) => field.map((slice, z) => slice.map((line, y) => line.map((val, x) => {
  const n = neighbours(field, x, y, z);
  if (val === '#') return (n === 2 || n === 3) ? '#' : '.';
  return (val === '.' && n === 3) ? '#' : '.';
})));

const work = (lines, size) => {
  let field = Array.from(Array(size))
    .map(() => Array.from(Array(size))
      .map(() => Array.from(Array(size)
        .fill('.'))
      ));

  const startz = size / 2;
  const startx = size / 2;
  const starty = size / 2;
  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char === '#')
        field[startz][starty + y][startx + x] = '#';
    })
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    field = step(field);
  }

  return field.map(slice => slice.map(line => line.join('')).join('')).join('').split('').filter(a => a === '#').length;
}

const test = `.#.
..#
###`.trim().split("\n");

assert(work(test, 32), 112);
assert(work(file('input.txt'), 32), 242);