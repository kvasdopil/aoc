const { file, assert } = require('../../utils')

const work = (lines) => {
  let qs = {};
  let result = 0;
  let groupSize = 0;
  for (const line of lines.concat([''])) {
    if (line === "") {
      result += Object.keys(qs).filter(key => qs[key] === groupSize).length;
      qs = {};
      groupSize = 0;
      continue;
    }
    line.split('').forEach(char => qs[char] = qs[char] ? qs[char] + 1 : 1);
    groupSize++;
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

assert(work(test), 6);
assert(work(file('input.txt')), 3232);