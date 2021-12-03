const { file, assert } = require('../../utils')

const traverse = (lines, dx, dy) => {
  let y = 0;
  let x = 0;
  let result = 0;
  while (x < lines.length) {
    const line = lines[x];
    if (line[y % line.length] === '#') result++;
    y += dy;
    x += dx;
  }
  return result;
};

const work = (map) => {
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  return slopes.map(([y, x]) => traverse(map, x, y)).reduce((res, a) => a * res, 1);
}

const test = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.trim().split("\n");

assert(work(test), 336);
assert(work(file('input.txt')), 3424528800);