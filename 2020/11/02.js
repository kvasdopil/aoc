const { file, assert } = require('../../utils')

/*
This one is simple, just a game of life with custom rules (neighbour function and empty cells)
*/

const seats = (field, x, y) =>
  [
    [-1, 0],
    [+1, 0],
    [0, -1],
    [0, +1],
    [-1, -1],
    [+1, +1],
    [-1, +1],
    [+1, -1]
  ].reduce((sum, [dx, dy]) => {
    let X = x + dx;
    let Y = y + dy;
    while (field[Y] && field[Y][X]) {
      if (field[Y][X] === '.') {
        X += dx;
        Y += dy;
        continue;
      }
      return sum + (field[Y][X] === '#' ? 1 : 0);
    }
    return sum;
  }, 0)

const step = (lines) =>
  lines.map((line, y) =>
    line.map((val, x) => {
      if (val === '.') return '.';

      const neighbours = seats(lines, x, y);

      if (val === 'L' && neighbours === 0) return '#';
      if (val === '#' && neighbours >= 5) return 'L';
      return val;
    })
  )

const print = field => console.log(field.map(line => line.join('')).join('\n') + '\n');

const work = (lines) => {
  let field = lines.map(line => line.split(''));
  for (let i = 0; i < 200; i++) {
    field = step(field);
    // print(field);
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

assert(work(test), 26);
assert(work(file('input.txt')), 2299);