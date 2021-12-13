const { file, assert } = require('../../utils')

const work = (lines) => {
  const stacks = lines
    .join('\n').split('\n\n')
    .map(stack =>
      stack
        .split("\n")
        .slice(1)
        .map(a => parseInt(a, 10))
    )

  let winner = 0;
  while (stacks.every(stack => stack.length > 0)) {
    const cards = stacks.map(stack => stack.shift());
    winner = cards.indexOf(Math.max(...cards));
    stacks[winner] = stacks[winner].concat(cards.sort((a, b) => b - a));
  }

  return stacks[winner].reverse().reduce((a, b, n) => a + (n + 1) * b, 0)
}

const test = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`.trim().split("\n");

assert(work(test), 306);
assert(work(file('input.txt')), 33434);