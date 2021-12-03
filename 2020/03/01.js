const { file, assert } = require('../../utils')

const work = (lines) => {
  let y = 0;
  return lines.filter((line) => {
    const tree = line[y % line.length] === '#';
    y += 3;
    return tree;
  }).length;
};

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

assert(work(test), 7);
assert(work(file('input.txt')), 145);