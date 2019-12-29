const { assert, file } = require("../../utils");
const { context, execute } = require("./intcode.js");

const ct = context(file("./15.txt")[0]);
const prog = execute(ct);
prog.next();

const MAX = 40;

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
    1: ".",
    2: "@"
  };

  for (let y = -MAX; y < MAX; y++) {
    const line = [];
    for (let x = -MAX; x < MAX; x++) {
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
      if (step(n) === 2) {
        console.log(pos);
      }
      return false;
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

  return true;
};

while (!decide()) {}

for (let x = -MAX; x <= MAX; x++) {
  for (let y = -MAX; y <= MAX; y++) {
    if (get(x, y) !== -1) {
      set(x, y, undefined);
    } else {
      set(x, y, 1);
    }
  }
}

pos.x = 0;
pos.y = 0;
set(0, 0, 1);
set(-14, 16, 2);

const spread = () => {
  let res = 0;
  for (let x = -MAX; x <= MAX; x++) {
    for (let y = -MAX; y <= MAX; y++) {
      if (get(x, y) === 2) {
        res++;
        set(x, y, -1);
        if (get(x + 1, y) === 1) {
          set(x + 1, y, 3);
        }

        if (get(x - 1, y) === 1) {
          set(x - 1, y, 3);
        }

        if (get(x, y + 1) === 1) {
          set(x, y + 1, 3);
        }

        if (get(x, y - 1) === 1) {
          set(x, y - 1, 3);
        }
      }
    }
  }
  for (let x = -MAX; x <= MAX; x++) {
    for (let y = -MAX; y <= MAX; y++) {
      if (get(x, y) === 3) {
        set(x, y, 2);
      }
    }
  }
  return res;
};

let spreads = 0;
while (spread()) {
  spreads++;
}

//for (let i = 0; i < 100; i++) {
//  spread();
//}

// 188 low
// 190 low
// 247 incorrect
// 345 incorrect

print();
console.log(spreads - 1);
