const { assert, file } = require("../../utils");

const execute = prog => {
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

const solve = (prog, result) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const copy = [...prog];
      copy[1] = noun;
      copy[2] = verb;
      const mem = execute(copy);
      if (mem[0] === result) {
        return 100 * noun + verb;
      }
    }
  }
};

const data = file("./02.txt")
  .pop()
  .split(",")
  .map(i => parseInt(i, 10));

console.log(solve(data, 19690720));
