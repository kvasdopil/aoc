const { assert, file } = require("../../utils");

const solve = prog => {
  const mem = prog.reduce((res, val, i) => ({ ...res, [i]: val }), {});

  let n = 0;
  while (mem[n] !== undefined) {
    const op = mem[n++];
    const a = mem[n++];
    const b = mem[n++];
    const res = mem[n++];

    if (op === 1) {
      mem[res] = mem[a] + mem[b];
      continue;
    }
    if (op === 2) {
      mem[res] = mem[a] * mem[b];
      continue;
    }
    break;
  }

  return Object.values(mem);
};

assert(solve([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50])[0], 3500);

assert(solve([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
assert(solve([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]);
assert(solve([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801]);
assert(solve([1, 1, 1, 4, 99, 5, 6, 0, 99]), [30, 1, 1, 4, 2, 5, 6, 0, 99]);

const data = file("./02.txt")
  .pop()
  .split(",")
  .map(i => parseInt(i, 10));
data[1] = 12;
data[2] = 2;
console.log(solve(data)[0]); // 234713
