const { file, assert } = require('../../utils')

const test1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw§§`.split('\n')

function work(text) {
  const res = [];
  while (text.length) {
    const a = text.shift();
    const b = text.shift();
    const c = text.shift();
    res.push(a.split("").find(charA => b.includes(charA) && c.includes(charA)));
  }
  return res
    .map(char => char.charCodeAt(0))
    .map(code => code > 97 ? code - 97 + 1 : code - 65 + 27)
    .reduce((a, b) => a + b, 0)
}

assert(work(test1), 70);
assert(work(file('input.txt')), 2545);
