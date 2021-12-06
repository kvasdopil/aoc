const { file, assert } = require('../../utils')

const work = (lines) => {
  let mask = [];
  const memory = {};

  for (const line of lines) {
    if (/^mask = /.test(line)) {
      mask = line.split(' ').pop().split('');
      continue;
    }

    const [, addr, v] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
    const val = Number(v).toString(2).padStart(mask.length, '0');
    const res = mask.map((bit, n) => bit === 'X' ? val[n] : bit);
    memory[addr] = res;
  }
  return Object.values(memory)
    .map(mem => parseInt(mem.join(''), 2))
    .reduce((a, b) => a + b, 0)
}

const test = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.trim().split("\n");

assert(work(test), 165);
assert(work(file('input.txt')), 15018100062885);
