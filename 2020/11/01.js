const { file, assert } = require('../../utils')

const seats = (field, x, y) =>
  [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
    [x - 1, y - 1],
    [x + 1, y + 1],
    [x - 1, y + 1],
    [x + 1, y - 1]
  ].reduce((sum, [X, Y]) => sum + (((field[Y] || [])[X] || '.') === '#' ? 1 : 0), 0);

const step = (lines) =>
  lines.map((line, y) =>
    line.map((val, x) => {
      if (val === '.') return '.';

      const neighbours = seats(lines, x, y);

      if (val === 'L' && neighbours === 0) return '#';
      if (val === '#' && neighbours >= 4) return 'L';
      return val;
    })
  )

const work = (lines) => {
  let field = lines.map(line => line.split(''));
  for (let i = 0; i < 200; i++) {
    field = step(field);
  }
  return field.join().split(',').filter(a => a === '#').length;
}

const test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.trim().split("\n");

assert(work(test), 37);
assert(work(file('input.txt')), 2299);