const { assert, file, uniq } = require("../../utils");

const parse = input => {
  const result = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === "#") {
        result.push({ x, y });
      }
    }
  }
  return result;
};

const r = (x, y) => {
  return [x > 0, y > 0, x / y].join();
};

const solve = data => {
  const items = data.map(a => {
    const res = [];
    data.forEach(b => {
      if (a != b) {
        res.push(r(b.x - a.x, b.y - a.y));
      }
    });

    return uniq(res).length;
  });

  return items;
};

const maxPos = data =>
  data.reduce((prev, val, pos) => (prev.val < val ? { val, pos } : prev), {
    val: -1,
    pos: -1
  });

const i1 = [".#..#", ".....", "#####", "....#", "...##"];
const r1 = maxPos(solve(parse(i1)));
assert(r1, { val: 8, pos: 8 });

const i2 = [
  "......#.#.",
  "#..#.#....",
  "..#######.",
  ".#.#.###..",
  ".#..#.....",
  "..#....#.#",
  "#..#....#.",
  ".##.#..###",
  "##...#..#.",
  ".#....####"
];
assert(maxPos(solve(parse(i2))).val, 33);

const i3 = [
  "#.#...#.#.",
  ".###....#.",
  ".#....#...",
  "##.#.#.#.#",
  "....#.#.#.",
  ".##..###.#",
  "..#...##..",
  "..##....##",
  "......#...",
  ".####.###."
];
assert(maxPos(solve(parse(i3))).val, 35);

const i4 = [
  ".#..#..###",
  "####.###.#",
  "....###.#.",
  "..###.##.#",
  "##.##.#.#.",
  "....###..#",
  "..#.#..#.#",
  "#..#.#.###",
  ".##...##.#",
  ".....#.#.."
];
assert(maxPos(solve(parse(i4))).val, 41);

const i5 = [
  ".#..##.###...#######",
  "##.############..##.",
  ".#.######.########.#",
  ".###.#######.####.#.",
  "#####.##.#.##.###.##",
  "..#####..#.#########",
  "####################",
  "#.####....###.#.#.##",
  "##.#################",
  "#####.##.###..####..",
  "..######..##.#######",
  "####.##.####...##..#",
  ".#####..#.######.###",
  "##...#.##########...",
  "#.##########.#######",
  ".####.#.###.###.#.##",
  "....##.##.###..#####",
  ".#.#.###########.###",
  "#.#.#.#####.####.###",
  "###.##.####.##.#..##"
];
assert(maxPos(solve(parse(i5))).val, 210);

const data = parse(file("./10.txt"));
console.log(maxPos(solve(data)));
