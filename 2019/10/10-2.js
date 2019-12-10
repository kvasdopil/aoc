const { assert, file, uniq, groupBy } = require("../../utils");

const parse = input => {
  const result = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== ".") {
        result.push({ x, y, l: input[y][x] });
      }
    }
  }
  return result;
};

const r = (bx, by) => {
  const ax = 0;
  const ay = -1;
  const COS =
    (ax * bx + ay * by) /
    (Math.sqrt(ax * ax + ay * ay) * Math.sqrt(bx * bx + by * by));

  if (bx >= 0) {
    return Math.acos(COS);
  }

  return 10000000 - Math.acos(COS);
};

const dist = (a, b) => (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);

const solve = (data, n) => {
  a = data[n];
  const res = {};
  data.forEach(b => {
    if (a === b) {
      return;
    }
    const key = r(b.x - a.x, b.y - a.y);
    if (res[key] === undefined) {
      res[key] = [];
    }
    res[key].push(b);
  });

  const items = Object.keys(res)
    .sort()
    .map(key => res[key].sort((aa, bb) => dist(a, aa) - dist(a, bb)));

  let result = [];
  let LVL = 0;
  while (true) {
    const turn = items.map(i => i[LVL]).filter(i => i !== undefined);
    if (!turn.length) {
      break;
    }
    result = result.concat(turn);
    LVL++;
  }

  return result;
};

const i0 = [
  ".q....tuv24...x..",
  "no...rs.13w67..9y",
  "lm...p...5.8abcd.",
  "..k.....X...ezA..",
  "..j.i.....h....gf"
];

const i1 = [
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

assert(
  solve(parse(i0), 28)
    .map(i => i.l)
    .join(""),
  "123456789abcdefghijklmnopqrstuvwxyzA"
);

const s2 = solve(parse(i1), 205);
assert(s2[1 - 1], { x: 11, y: 12, l: "#" });
assert(s2[2 - 1], { x: 12, y: 1, l: "#" });
assert(s2[3 - 1], { x: 12, y: 2, l: "#" });
assert(s2[10 - 1], { x: 12, y: 8, l: "#" });
assert(s2[20 - 1], { x: 16, y: 0, l: "#" });
// assert(s2[50 - 1], { x: 16, y: 9, l: "#" });
// assert(s2[100 - 1], { x: 10, y: 16, l: "#" });
// assert(s2[199 - 1], { x: 9, y: 6, l: "#" });
// assert(s2[200 - 1], { x: 8, y: 2, l: "#" });
// assert(s2[201 - 1], { x: 10, y: 9, l: "#" });
// assert(s2[299 - 1], { x: 11, y: 1, l: "#" });

const data = parse(file("./10.txt"));
console.log(solve(data, 271)[200]);
