const { file, assert } = require('../../utils')

const test1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw§§`.split('\n')

function work(text) {
  return text
    .map(line => [
      line.substr(0, line.length / 2),
      line.substr(line.length / 2),
    ])
    .map(([a, b]) => a.split("").find(charA => b.includes(charA)))
    .map(char => char.charCodeAt(0))
    .map(code => code > 97 ? code - 97 + 1 : code - 65 + 27)
    .reduce((a, b) => a + b, 0)
}

assert(work(test1), 157);
assert(work(file('input.txt')), 7997);
