const { file, assert } = require('../../utils')

const findP1 = (b1, b2) => {
  for (let i = 0; i < 10000; i++)
    for (let j = 0; j < 10000; j++)
      if (b1[0] * i === b2[0] * j - b2[1])
        return i;
}

const work = (line, t0 = 0, dn = null) => {
  const b = line.split(',').map(a => parseInt(a, 10)).map((a, n) => [a, n]).filter(([a, n]) => a);

  const p1 = findP1(b[0], b[1]);

  const mul = dn || (b[0][0] * b[1][0]);
  let time = t0 || (b[0][0] * p1 + mul);

  let i = 0;
  while (true) {
    i++;
    if (i % 10000000 === 0) console.log(i / 10000000);
    if (b.every(([a, n]) => (time + n) % a === 0)) {
      return time;
    }
    time += mul;
  }
}

assert(work(`7,13,x,x,59,x,31,19`), 1068781);
assert(work(`17,x,13,19`), 3417);
assert(work(`67,7,59,61`), 754018);
assert(work(`67,x,7,59,61`), 779210);
assert(work(`67,7,x,59,61`), 1261476);
assert(work(`1789,37,47,1889`), 1202161486);
assert(work(`29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,409,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,13,19,x,x,x,23,x,x,x,x,x,x,x,353,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41`, 9711846076, 107976815137), 408270049879073);

