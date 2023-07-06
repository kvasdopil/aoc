const { file, assert } = require('../../utils')

const test1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

function work(text) {
  const input = text.split("\n\n").map(chunk => chunk.split("\n").map(a => +a));
  return input.map(a => a.reduce((j, k) => j + k, 0)).reduce((j, k) => Math.max(j, k));
}

assert(work(test1), 24000);
assert(work(file('01.txt').join("\n")), 73211);