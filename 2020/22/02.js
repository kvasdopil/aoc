const { file, assert } = require('../../utils')

const play = (stacks) => {
  const oldRounds = {};

  let winner = 0;
  while (stacks.every(stack => stack.length > 0)) {
    const id = stacks.map(s => s.join()).join(":");
    if (oldRounds[id]) return { winner: 0 };
    oldRounds[id] = 1;
    const cards = stacks.map(stack => stack.shift());
    const recurse = cards.every((card, player) => card <= stacks[player].length);
    if (recurse) {
      const res = play(stacks.map((stack, player) => stack.slice(0, cards[player])));
      winner = res.winner;
      stacks[winner].push(cards[winner]);
      stacks[winner].push(cards[1 - winner]);
    } else {
      winner = cards.indexOf(Math.max(...cards));
      stacks[winner] = stacks[winner].concat(cards.sort((a, b) => b - a));
    }
  }
  return { stacks, winner };
}
const work = (lines) => {
  const stacks = lines
    .join('\n').split('\n\n')
    .map(stack =>
      stack
        .split("\n")
        .slice(1)
        .map(a => parseInt(a, 10))
    )

  const { stacks: s, winner } = play(stacks);

  return s[winner].reverse().reduce((a, b, n) => a + (n + 1) * b, 0)
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

assert(work(test), 291);
assert(work(file('input.txt')), 33434);