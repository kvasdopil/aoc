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
  let i = 0;
  let j = 0;
  for (; i < data.length; i++) {
    j = i;
    let sum = data[i];
    while (sum < target) {
      j++;
      sum += data[j];
    }
    if (sum === target) return [i, j];
  }
}

const work = (lines, size) => {
  const numbers = lines.map(line => parseInt(line, 10));
  const invalid = findInvalid(numbers, size);
  const [start, end] = findSum(numbers, invalid);

  const result = numbers.slice(start, end);
  return Math.min(...result) + Math.max(...result)
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