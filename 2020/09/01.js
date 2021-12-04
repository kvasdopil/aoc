const { file, assert } = require('../../utils')

const valid = (preamble, num) => {
  for (let i = 1; i < preamble.length; i++)
    for (let j = 0; j < i; j++)
      if (preamble[i] + preamble[j] === num) return true;
  return false;
}

const work = (lines, size) => {
  const nrs = lines.map(line => parseInt(line, 10));
  const preamble = [];

  while (preamble.length < size) preamble.push(nrs.shift());
  while (lines.length) {
    const next = nrs.shift();
    if (!valid(preamble, next)) return next;

    preamble.shift();
    preamble.push(next);
  }
}

const test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.trim().split("\n");

assert(work(test, 5), 127);
assert(work(file('input.txt'), 25), 3199139634);