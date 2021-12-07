const { file, assert } = require('../../utils')

const work = (line, max = 2020) => {
  let turn = 0;
  const numbers = new Uint32Array(max).fill(0xffffffff);

  const start = line.split(',').map(a => parseInt(a, 10));
  while (start.length > 1) {
    numbers[start.shift()] = turn;
    turn++;
  }

  let next = start.shift();
  while (turn < (max - 1)) {
    const oldpos = numbers[next];
    numbers[next] = turn;

    next = (oldpos === 0xffffffff) ? 0 : turn - oldpos;
    turn++;
  }

  return next;
}

assert(work('0,3,6'), 436);
assert(work('1,3,2'), 1);
assert(work('2,1,3'), 10);
assert(work('1,2,3'), 27);
assert(work('2,3,1'), 78);
assert(work('3,2,1'), 438);
assert(work('3,1,2'), 1836);
assert(work('9,3,1,0,8,4'), 371);


assert(work('0,3,6', 30000000), 175594);
assert(work('1,3,2', 30000000), 2578);
assert(work('2,1,3', 30000000), 3544142);
assert(work('1,2,3', 30000000), 261214);
assert(work('2,3,1', 30000000), 6895259);
assert(work('3,2,1', 30000000), 18);
assert(work('3,1,2', 30000000), 362);
assert(work('9,3,1,0,8,4', 30000000), 352);