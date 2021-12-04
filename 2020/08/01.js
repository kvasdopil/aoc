const { file, assert } = require('../../utils')

const parse = (lines) =>
  lines.map(line => {
    const [cmd, arg] = line.split(" ");
    return [cmd, parseInt(arg, 10)];
  });

const run = (prog) => {
  let ptr = 0;
  let acc = 0;
  const visited = {};

  while (true) {
    if (visited[ptr]) return acc;

    const [cmd, arg] = prog[ptr];
    visited[ptr] = 1;
    ptr++;
    if (cmd === 'acc') acc += arg;
    if (cmd === "jmp") ptr += arg - 1;
  }
}

const work = (lines) => {
  const prog = parse(lines);
  return run(prog);
}

const test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.trim().split("\n");

assert(work(test), 5);
assert(work(file('input.txt')), 1394);