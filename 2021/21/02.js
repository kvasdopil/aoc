const { file, assert } = require('../../utils')

let cache = {};

const solve = (p1, p2) => {
  const key = `${p1.pos},${p1.score},${p2.pos},${p2.score}`;
  if (cache[key]) return cache[key];

  // console.log(key);

  let [win1, win2] = [0, 0];
  [1, 2, 3].forEach(a => {
    [1, 2, 3].forEach(b => {
      [1, 2, 3].forEach(c => {
        const pos = (p1.pos + a + b + c) % 10;
        const score = p1.score + 1 + pos;
        if (score >= 21) {
          win1++;
        } else {
          const [w2, w1] = solve(p2, { pos, score });
          win1 += w1;
          win2 += w2;
        }
      })
    })
  })

  cache[key] = [win1, win2];
  return [win1, win2];
}

const work = (a, b) => {
  cache = {};
  return solve({ pos: a, score: 0 }, { pos: b, score: 0 });
}

assert(work(4, 8), [444356092776315, 341960390180808]);
assert(work(4, 1), 110271560863819);

