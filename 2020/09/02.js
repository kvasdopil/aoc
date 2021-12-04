const { file, assert } = require('../../utils')

const valid = (preamble, num) => {
  for (let i = 1; i < preamble.length; i++)
    for (let j = 0; j < i; j++)
      if (preamble[i] + preamble[j] === num) return true;
  return false;
}

const findInvalid = (nrs, size) => {
  const preamble = [];
  const data = [...nrs];

  while (preamble.length < size) preamble.push(data.shift());
  while (data.length) {
    const next = data.shift();
    if (!valid(preamble, next)) return next;

    preamble.shift();
    preamble.push(next);
  }
}

const findSum = (data, target) => {
  for (let i = 0; i < data.length; i++) {
    let j = i;
    let sum = data[i];
    while (sum < target) {
      j++;
      sum += data[j];
    }
    if (sum === target) {
      let min = data[i];
      let max = data[i];
      for (; i <= j; i++) {
        min = Math.min(data[i], min);
        max = Math.max(data[i], max);
      }
      return min + max;
    }
  }
}

const work = (lines, size) => {
  const numbers = lines.map(line => parseInt(line, 10));
  const invalid = findInvalid(numbers, size);
  return findSum(numbers, invalid);
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

assert(work(test, 5), 62);
assert(work(file('input.txt'), 25), 438559930);