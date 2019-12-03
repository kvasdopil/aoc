const { assert, file } = require("../../utils");

const parse = line => {
  const [cmd, a, val] = line.split(" ");

  if ("abcdefghijklmnopqrstuvwxyz".indexOf(val) >= 0) {
    return { cmd, a, b: val };
  }
  return { cmd, a, val: parseInt(val, 10) };
};

const solve = prog => {
  const text = prog.map(parse);

  let pos = 0;
  let snd = 0;
  let regs = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .reduce((res, val) => ({ ...res, [val]: 0 }), {});

  while (true) {
    if (text[pos] === undefined) {
      return null;
    }
    const { cmd, a, b, val } = text[pos];
    const value = b === undefined ? val : regs[b];

    switch (cmd) {
      case "snd":
        snd = regs[a];
        break;
      case "set":
        regs[a] = value;
        break;
      case "add":
        regs[a] += value;
        break;
      case "mul":
        regs[a] *= value;
        break;
      case "mod":
        regs[a] %= value;
        break;
      case "rcv":
        if (regs[a]) {
          return snd;
        }
        break;
      case "jgz":
        if (regs[a] > 0) {
          pos += value - 1;
        }
        break;
      default:
    }
    pos += 1;
  }
};

const prog = [
  "set a 1",
  "add a 2",
  "mul a a",
  "mod a 5",
  "snd a",
  "set a 0",
  "rcv a",
  "jgz a -1",
  "set a 1",
  "jgz a -2"
];

assert(solve(prog), 4);

const p1 = file("./18.txt");
console.log(solve(p1));
