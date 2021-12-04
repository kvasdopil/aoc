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

  while (ptr < prog.length) {
    if (visited[ptr]) return [false, acc];

    const [cmd, arg] = prog[ptr];
    visited[ptr] = 1;
    ptr++;
    if (cmd === 'acc') acc += arg;
    if (cmd === "jmp") ptr += arg - 1;
  }

  return [true, acc];
}

const work = (lines) => {
  const prog = parse(lines);
  for (const i in prog) {
    const p2 = prog.map(cmd => [...cmd]); // clone prog
    if (prog[i][0] === 'nop') p2[i][0] = 'jmp';
    if (prog[i][0] === 'jmp') p2[i][0] = 'nop';
    const [success, acc] = run(p2);
    if (success) return acc;
  }
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

assert(work(test), 8);
assert(work(file('input.txt')), 1626);