const { file, assert } = require('../../utils')

const work = (lines) => {
  let time, start;
  time = start = parseInt(lines.shift(), 10);
  const buses = lines.shift().split(',').filter(a => a !== 'x').map(a => parseInt(a, 10));

  while (true) {
    for (const bus of buses)
      if (time % bus === 0) return (time - start) * bus;
    time++;
  }
}

const test = `939
7,13,x,x,59,x,31,19`.trim().split("\n");

assert(work(test), 295);
assert(work(file('input.txt')), 222);