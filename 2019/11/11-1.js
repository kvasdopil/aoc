const { parse, context, execute } = require("./intcode.js");
const { file } = require("../../utils");

const directions = {
  u: ["l", "r"],
  d: ["r", "l"],
  l: ["d", "u"],
  r: ["u", "d"]
};

const steps = {
  u: { x: 0, y: 1 },
  d: { x: 0, y: -1 },
  l: { x: -1, y: 0 },
  r: { x: 1, y: 0 }
};

const solve = prog => {
  const ctx = context(parse(prog), []);
  const map = {};
  let x = 0;
  let y = 0;
  let dir = "u";

  while (true) {
    const input = map[`${x},${y}`] ? 1 : 0;
    ctx.input.push(input);

    const color = execute(ctx);
    if (color === undefined) {
      break;
    }
    map[`${x},${y}`] = color;
    const turn = execute(ctx);

    dir = directions[dir][turn];
    x += steps[dir].x;
    y += steps[dir].y;
  }

  return map;
};

const map = solve(file("./11.txt")[0]);
console.log(Object.keys(map).length);
