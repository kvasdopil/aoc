const { file, assert } = require('../../utils')

const neighbours = [
  [-1, 0],
  [+1, 0],
  [0, -1],
  [0, +1],
  [-1, -1],
  [+1, +1],
  [-1, +1],
  [+1, -1]
];

const I = i => parseInt(i, 10);

const work = (lines) => {
  let items = lines.map(line => line.split('').map(c => parseInt(c, 10)));

  let steps = 0;
  while (true) {
    steps++;
    // increase value for all cells
    items = items.map(line => line.map(val => val + 1));

    let flashes = [];
    // find all flashes
    for (const y in items)
      for (const x in items[y])
        if (items[y][x] >= 10)
          flashes.push([x, y]);

    // increase neighbours
    for (const [x, y] of flashes)
      for ([dx, dy] of neighbours) {
        const X = I(x) + dx;
        const Y = I(y) + dy;
        if (!items[Y]) continue;
        if (!items[Y][X]) continue;
        if (++items[Y][X] === 10) flashes.push([X, Y]);
      }

    // clear all flashes
    items = items.map(line => line.map(val => val >= 10 ? 0 : val));

    // check result
    if (items.every(line => line.every(val => val === 0))) return steps;
  }
}

const test = `11111
19991
19191
19991
11111
`.trim().split("\n");
assert(work(test, 2), 6);

const test2 = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`.trim().split('\n');
assert(work(test2, 10), 195);

assert(work(file('input.txt'), 100), 382);

