const { assert, file } = require("../../utils");

const map = [
  "    |          ",
  "    |  +--+    ",
  "    A  |  C    ",
  "F---|----E|--+ ",
  "    |  |  |  D ",
  "    +B-+  +--+ "
];

const dirs = {
  u: { y: -1, x: 0 },
  d: { y: 1, x: 0 },
  l: { x: -1, y: 0 },
  r: { x: 1, y: 0 }
};

const solve = m => {
  const map = m.map(line => line.split(""));

  let steps = 0;
  let x = 0;
  let y = 0;
  let dir = "d";

  while (map[0][x] === " ") {
    x++;
  }

  while (true) {
    const sym = map[y] ? map[y][x] : undefined;

    if (sym === undefined || sym === " ") {
      return steps;
    }

    map[y][x] = "#";

    if (sym === "+") {
      const left = map[y][x - 1];
      const right = map[y][x + 1];
      const top = map[y - 1][x];
      const bottom = map[y + 1] ? map[y + 1][x] : undefined;

      if (left !== " " && left !== "#" && left !== undefined) {
        dir = "l";
      }
      if (right !== " " && right !== "#" && right !== undefined) {
        dir = "r";
      }
      if (bottom !== " " && bottom !== "#" && bottom !== undefined) {
        dir = "d";
      }
      if (top !== " " && top !== "#" && top !== undefined) {
        dir = "u";
      }
    }

    x += dirs[dir].x;
    y += dirs[dir].y;
    steps++;
  }
};

assert(solve(map), "ABCDEF");

const data = file("19.txt");
console.log(solve(data));
