const { file, assert } = require('../../utils')

const NS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

const work = (lines) => {
  const items = lines.map(line => line.split(''));
  let replace = true;
  while (replace) {
    replace = false;
    for (let y = 1; y < items.length - 1; y++)
      for (let x = 1; x < items[0].length - 1; x++) {
        if (items[y][x] !== '.') continue;
        const walls = NS.filter(([dx, dy]) => items[y + dy][x + dx] === '#').length;
        if (walls === 3) {
          items[y][x] = '#';
          replace = true;
        }
      }
  }

  console.log(items.map(line => line.map(ch => ch === '#' ? ' ' : ch).join('')).join('\n'))
}

assert(work(file('test.txt')), 7);