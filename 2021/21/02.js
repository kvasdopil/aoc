const { file, assert, array2d } = require('../../utils')

// instead of 3 dices we roll 1 dice with values 3-9
// each value has 'a number of universes' created by it
const outcomes = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];

const unpack = (state) => [state % 10, Math.floor((state) / 10)];
const pack = (position, score) => score * 10 + position;

const next = (position, score) =>
  [3, 4, 5, 6, 7, 8, 9].map(dice => {
    const count = outcomes[dice];
    const newPosition = (position + dice) % 10;
    const newScore = score + 1 + newPosition;

    return [pack(newPosition, newScore), count];
  });

const work = (lines) => {
  const [p1, p2] = lines.map(line => parseInt(line.split(": ").pop(), 10));

  let states = array2d(200, 200);
  states[pack(p1 - 1, 0)][pack(p2 - 1, 0)] = 1;

  let win1 = 0;
  let win2 = 0;
  while (states.some(line => line.some(a => a))) {
    let sum = 0;
    let nextStates = states.map(line => line.map(() => 0));
    states.forEach((line, s1) => {
      const [pos1, score1] = unpack(s1);
      line.forEach((count, s2) => {
        if (!count) return;
        // console.log('processing', s1, s2, count);
        next(pos1, score1).forEach(([nn, newcount]) => {
          if (nn >= 200) {
            win1 += count * newcount;
          } else {
            nextStates[nn][s2] += count * newcount;
            sum += count * newcount;
          }
        })
      })
    });

    states = nextStates;
    // states.forEach((line, s1) => {
    //   const [pos1, score1] = unpack(s1);
    //   line.forEach((count, s2) => {
    //     const [pos2, score2] = unpack(s2);
    //     if (count)
    //       console.log(s1, s2, count);
    //   });
    // });
    // break;

    console.log(win1, win2, sum);

    sum = 0;
    nextStates = states.map(line => line.map(() => 0));
    states.forEach((line, s1) => {
      line.forEach((count, s2) => {
        if (!count) return;
        const [pos2, score2] = unpack(s2);
        next(pos2, score2).forEach(([nn, newcount]) => {
          if (nn >= 200) {
            win2 += count * newcount;
          } else {
            nextStates[s1][nn] += count * newcount;
            sum += count * newcount;
          }
        })
      })
    });

    console.log(win1, win2, sum);
    states = nextStates;

    // break;
  }

  return [win1, win2];
}

const test = `Player 1 starting position: 4
Player 2 starting position: 8`.trim().split("\n");

assert(work(test), [444356092776315, 341960390180808]);
//assert(work(file('input.txt')), 913560);

