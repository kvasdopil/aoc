const { assert } = require('../../utils')

let cache = {};
const STEPS = [
  // -2 -1 1 2
  [-1, -1, 2, 2], // left wing
  [-1, 2, 2, -1], // a
  [2, 2, 2, 2], // wall
  [-1, 2, 2, -1],  // b
  [2, 2, 2, 2],  // wall
  [-1, 2, 2, -1],  // c
  [2, 2, 2, 2],  // wall
  [-1, 2, 2, -1],  // d
  [2, 2, -1, -1],  // right wing
]

let scores = { A: 1, B: 10, C: 100, D: 1000 };
const walk = ({ data, score = 0, log = [] }) => {
  const key = data.map(s => (s[1] || '-') + (s[0] || '-')).join('');

  if (cache[key] && cache[key].score <= score) { return {}; }
  cache[key] = { data, score, log };

  const nexts = {};
  data.forEach((s, i) => {
    if (s.length === 0) return;
    if (s[s.length - 1] === 'x') return;
    if (i === 1 && s.length === 1 && s[0] === 'A') return;
    if (i === 3 && s.length === 1 && s[0] === 'B') return;
    if (i === 5 && s.length === 1 && s[0] === 'C') return;
    if (i === 7 && s.length === 1 && s[0] === 'D') return;
    for (const m in [0, 1, 2, 3]) {
      const move = [-2, -1, 1, 2][m];
      let steps = STEPS[i][m];
      if (steps === -1) continue;
      if (s.length === 1) steps++;

      const tgt = data[i + move];
      if (!tgt) continue;
      if (tgt.length === 4) continue;
      if (tgt.length === 0) steps++;

      const copy = data.map(ss => [...ss]);
      const letter = copy[i].pop();

      if (i + move === 1 && letter !== 'A') continue;
      if (i + move === 3 && letter !== 'B') continue;
      if (i + move === 5 && letter !== 'C') continue;
      if (i + move === 7 && letter !== 'D') continue;
      if (i + move === 1 && tgt.some(i => i !== letter)) continue;
      if (i + move === 3 && tgt.some(i => i !== letter)) continue;
      if (i + move === 5 && tgt.some(i => i !== letter)) continue;
      if (i + move === 7 && tgt.some(i => i !== letter)) continue;

      copy[i + move].push(letter);

      const key2 = copy.map(s => (s[1] || '-') + (s[0] || '-')).join('');

      const newscore = score + steps * scores[letter];
      const log2 = [...log, [key2, newscore]];
      const entry = { data: copy, score: newscore, log: log2 };;

      if (!nexts[key2] || nexts[key2].score > entry.score) {
        nexts[key2] = entry;
      }
    }
  });

  return nexts;
}

const parse = (line, size = 4) => {
  let li = line.split('')
  const result = [];
  while (li.length) {
    const sub = li.slice(0, size);
    li = li.slice(size);

    while (sub[0] === '-') sub.shift();
    result.push(sub);
  }
  return result;
}

const work = (line) => {
  cache = {};

  const stacks = parse(line);

  const results = [];

  let res = walk({ data: stacks });
  while (Object.entries(res).length) {
    let res2 = {};
    for (const [key, val] of Object.entries(res)) {
      if (key === '--xxAAAA-xxxBBBB-xxxCCCC-xxxDDDD--xx') {
        results.push(val.score);
        console.log('yay', key, val.score);
        console.log(val.log);
        continue;
      }
      for (const [k2, v2] of Object.entries(walk(val))) {
        if (!res2[k2] || res2[k2].score > v2.score)
          res2[k2] = v2;
      }
    }
    res = res2;
    console.log(Object.keys(res).length);
  }

  return Math.min(...results);
}

assert(work('--xxBDDA-xxxCCBD-xxxBBAC-xxxDACA--xx'), 44169);
// assert(work('--AC-xDC-xAD-xBB--'), 13495); // 13499 high