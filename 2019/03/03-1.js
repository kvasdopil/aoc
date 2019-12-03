const { assert, file } = require("../../utils");

const parse = path =>
  path.split(",").map(([dir, ...len]) => ({
    dir,
    len: parseInt(len.join(""), 10)
  }));

let dirs = {
  R: { x: 1, y: 0 },
  L: { x: -1, y: 0 },
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 }
};

const getLog = path => {
  let x = 0;
  let y = 0;
  const log = [{ x, y }];
  path.forEach(({ dir, len }) => {
    for (let i = 0; i < len; i++) {
      x += dirs[dir].x;
      y += dirs[dir].y;
      log.push({ x, y });
    }
  });
  return log;
};

const solve = (w1, w2) => {
  const p1 = getLog(parse(w1));
  const p2 = getLog(parse(w2));

  const o1 = {};
  p1.forEach(({ x, y }) => (o1[`${x}:${y}`] = true));

  const common = p2.filter(({ x, y }) => o1[`${x}:${y}`]);

  return common
    .map(({ x, y }) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[1];
};

assert(
  solve(
    "R75,D30,R83,U83,L12,D49,R71,U7,L72",
    "U62,R66,U55,R34,D71,R55,D58,R83"
  ),
  159
);

assert(
  solve(
    "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
    "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
  ),
  135
);

const text = file("./03.txt");
console.log(solve(text[0], text[1]));
