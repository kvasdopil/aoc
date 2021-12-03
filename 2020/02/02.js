const { file, assert } = require('../../utils')

const work = (lines) => lines.filter(line => {
  const [, min, max, letter, pwd] = /^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)/.exec(line);
  return (pwd[min - 1] === letter) ^ (pwd[max - 1] === letter);
}).length;

const test = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`.trim().split("\n");

assert(work(test), 1);
assert(work(file('input.txt')), 422);