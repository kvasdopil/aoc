const { file, assert } = require('../../utils')

const work = (lines) => {
  let qs = {};
  let result = 0;
  for (const line of lines.concat([''])) {
    if (line === "") {
      result += Object.keys(qs).length;
      qs = {};
      continue;
    }
    line.split('').forEach(char => qs[char] = 1);
  }
  return result;
}

const test = `abc

a
b
c

ab
ac

a
a
a
a

b`.trim().split("\n");

assert(work(test), 11);
assert(work(file('input.txt')), 6443);