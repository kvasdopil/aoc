const { file, assert } = require('../../utils')

const work = (line) => {
  let days = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  line.split(',').map(a => parseInt(a, 10)).map(i => days[i]++);

  for (let i = 0; i < 80; i++) {
    const [spawned, d1, d2, d3, d4, d5, d6, d7, d8] = days;
    days = [d1, d2, d3, d4, d5, d6, d7 + spawned, d8, spawned];
  }

  return days.reduce((a, b) => a + b, 0);
}

assert(work('3,4,3,1,2'), 5934);
assert(work(file('input.txt')[0]), 376194);