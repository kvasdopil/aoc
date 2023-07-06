const { file, assert } = require('../../utils')

const play = (pos, limit) => {
  const score = pos.map(() => 0);

  pos.forEach((p, i) => pos[i]--);

  let rolls = 0;
  let i = 0;
  while (true) {
    i = rolls % pos.length;
    pos[i] += 6 + 9 * rolls;
    rolls++;

    score[i] += (pos[i] % 10) + 1;
    if (score[i] >= limit) return { score, rolls: 3 * rolls };
  }
}

const work = (lines) => {
  const pos = lines.map(line => parseInt(line.split(": ").pop(), 10));

  const { score, rolls } = play(pos, 1000);

  const losing = score.find(a => a < 1000);
  return losing * rolls;
}

const test = `Player 1 starting position: 4
Player 2 starting position: 8`.trim().split("\n");

assert(work(test), 739785);
assert(work(file('input.txt')), 913560);