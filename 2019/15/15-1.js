const { assert, file } = require("../../utils");
const { context, execute } = require("./intcode.js");

const solve = text => {
  const ct = context(text);
  const prog = execute(ct);
  prog.next();

  const map = { "0,0": 1 };
  const set = (x, y, val) => (map[`${pos.x + x},${pos.y + y}`] = val);
  const get = (x, y) => map[`${pos.x + x},${pos.y + y}`];

  const pos = { x: 0, y: 0 };

  const moves = {
    1: { x: 0, y: -1 },
    2: { x: 0, y: 1 },
    3: { x: -1, y: 0 },
    4: { x: 1, y: 0 }
  };

  const print = () => {
    const chars = {
      undefined: " ",
      "-1": "X",
      0: "#",
      1: "."
    };

    for (let y = -30; y < 30; y++) {
      const line = [];
      for (let x = -30; x < 30; x++) {
        const val = get(x, y);
        if (x === 0 && y === 0) {
          line.push("@");
        } else {
          line.push(chars[val]);
        }
      }
      console.log(line.join(""));
    }
  };

  let steps = [];

  const step = dir => {
    const move = moves[dir];

    prog.next(dir);
    const value = ct.output.pop();

    set(move.x, move.y, value);
    if (value > 0) {
      pos.x += move.x;
      pos.y += move.y;
      steps.push({ x: pos.x, y: pos.y });
    }

    return value;
  };

  const decide = () => {
    for (let i = 0; i < 100; i++) {
      const n = Math.ceil(Math.random() * 4);
      move = moves[n];
      if (get(move.x, move.y) === undefined) {
        return step(n) === 2;
      }
    }

    steps.pop();
    set(0, 0, -1);
    for (let i = 1; i <= 4; i++) {
      move = moves[i];
      if (get(move.x, move.y) === 1) {
        step(i);
        return false;
      }
    }
  };

  while (!decide()) {}

  return steps.length;
};

let res = 9999999;
for (let j = 0; j < 1000; j++) {
  const steps = solve(file("./15.txt")[0]);
  res = Math.min(res, steps);
  console.log(res);
}
