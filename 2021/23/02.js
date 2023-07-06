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

const k = data => data.map(s => (s[3] || '-') + (s[2] || '-') + (s[1] || '-') + (s[0] || '-')).join('');

const dbgs = [
  // "--xxBDDA-xxxCCBD-xxxBBAC-xxx-ACA-Dxx", // 3 x 1000 = 3000
  // "-AxxBDDA-xxxCCBD-xxxBBAC-xxx--CA-Dxx", // 10 x 1 = 3010
  // "-AxxBDDA-xxxCCBD-xxx-BAC-xxx--CABDxx", // 4 x 10 = 3050
  // "-AxxBDDA-xxxCCBD-xxx--ACBxxx--CABDxx", // 3 x 10 = 3080
  // "AAxxBDDA-xxxCCBD-xxx---CBxxx--CABDxx", // 8 x 1 = 3088
  // "AAxxBDDA-xxx--BD-xxx-CCCBxxx--CABDxx", // 12 x 100 = 4288
  //"AAxxBDDA-xxx---DBxxx-CCCBxxx--CABDxx", // 4 x 10 = 4328
  // "AAxxBDDADxxx----Bxxx-CCCBxxx--CABDxx", // 5 x 1000 = 9328
  // "AAxxBDDADxxx-BBB-xxx-CCC-xxx--CA-Dxx",
  // "AAxxBDDADxxx-BBB-xxxCCCC-xxx---A-Dxx",
  // "AAxxBDDADxxx-BBB-xxxCCCC-xxx----ADxx",
  // "AAxxBDDA-xxx-BBB-xxxCCCC-xxx---DADxx",
  // "AAxx-DDA-xxxBBBB-xxxCCCC-xxx---DADxx",
  // "AAxx-DDA-xxxBBBB-xxxCCCC-xxx---DADxx",
  // "--xx-AAA-xxxBBBB-xxxCCCC-xxx-DDDADxx",
  // "--xxAAAA-xxxBBBB-xxxCCCC-xxx-DDD-Dxx",
]

let scores = { A: 1, B: 10, C: 100, D: 1000 };
const walk = ({ data, score = 0, log = [] }) => {
  const key = k(data);

  if (dbgs.includes(key)) console.log(key, score, log);

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
      steps++;
      steps += (3 - s.length);

      const tgt = data[i + move];
      if (!tgt) continue;
      if (tgt.length === 4) continue;
      steps += (3 - tgt.length);

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

      const key2 = k(copy);

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
    result.push(sub.reverse());
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

  return results.sort();
}

// assert(work('--xxBDDA-xxxCCBD-xxxBBAC-xxxDACA--xx'), 44169);
assert(work('--xxADDC-xxxDCBC-xxxABAD-xxxBACB--xx'), 13495); // 43029 low