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
  return input.map(a => a.reduce((j, k) => j + k, 0)).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0)
}

assert(work(test1), 45000);
assert(work(file('input.txt').join("\n")), 213958);