const { file, assert } = require('../../utils')

const findPair = (b1, b2) => {
  for (let i = 0; i < 10000; i++)
    for (let j = 0; j < 10000; j++)
      if (b1[0] * i === b2[0] * j - b2[1])
        return [i, j];
}

const work = (line, n0 = 0) => {
  const b = line.split(',').map(a => parseInt(a, 10)).map((a, n) => [a, n]).filter(([a, n]) => a);

  const [p1, p2] = findPair(b[0], b[1]);

  const mul = b[0][0] * b[1][0];
  let time = b[0][0] * p1 + mul;
  let n = n0;
  while (true) {
    n++;
    if (n % 10000000 === 0) console.log(n / 10000000);
    if (b.every(([a, n]) => (time + n) % a === 0))
      return time;
    time += mul;
  }
}

assert(work(`7,13,x,x,59,x,31,19`), 1068781);
assert(work(`17,x,13,19`), 3417);
assert(work(`67,7,59,61`), 754018);
assert(work(`67,x,7,59,61`), 779210);
assert(work(`67,7,x,59,61`), 1261476);
assert(work(`1789,37,47,1889`), 1202161486);
assert(work(file('input.txt')[1], 100000000000000), 0);