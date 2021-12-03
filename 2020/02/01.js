const { file, assert } = require('../../utils')

const work = (lines) => lines.filter(line => {
  const [, min, max, letter, pwd] = /^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/.exec(line);
  const count = pwd.split('').filter(i => i === letter).length;
  return count >= min && count <= max;
}).length;

const test = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`.trim().split("\n");

assert(work(test), 2);
assert(work(file('input.txt')), 422);