const { assert, file } = require("../../utils");

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

const solve = data =>
  data.map(p1 => {
    data.forEach(p2 => {
      p2.visible = true;
    });

    data.forEach(p2 => {
      if (p1 === p2) {
        return;
      }

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const r = dx / dy;

      data.forEach(p3 => {
        if (p3 === p1 || p3 === p2) {
          return;
        }

        const ddx = p3.x - p1.x;
        const ddy = p3.y - p1.y;
        if (Math.sqrt(ddx * ddx + ddy * ddy) < Math.sqrt(dx * dx + dy * dy)) {
          return;
        }
        if (ddy === 0 && dy === 0) {
          p3.visible = false;
        }
        if (ddx === 0 && dx === 0) {
          p3.visible = false;
        }
        if (Math.abs(ddx / ddy - dx / dy) < 0.0001) {
          p3.visible = false;
        }
      });
    });

    return data.filter(d => d.visible !== false).length;
  });

const maxPos = data =>
  data.reduce((prev, val, pos) => (prev.val < val ? { val, pos } : prev), {
    val: -1,
    pos: -1
  });

const i1 = [".#..#", ".....", "#####", "....#", "...##"];
const r1 = maxPos(solve(parse(i1)));
assert(r1.pos, 8);

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
const r2 = maxPos(solve(parse(i2)));
assert(r2.val, 33);

const data = parse(file("./10.txt"));

console.log(maxPos(solve(data))); // 256 low
