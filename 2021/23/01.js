const { assert } = require('../../utils')

let cache = {};
const STEPS = [
  // -2 -1 1 2
  [-1, -1, 2, 2], // left wing
  [-1, 2, 2, 2], // wall
  [-1, 2, 2, -1], // a
  [2, 2, 2, 2],  // wall
  [-1, 2, 2, -1],  // b
  [2, 2, 2, 2],  // wall
  [-1, 2, 2, -1],  // c
  [2, 2, 2, -1],  // wall
  [2, 2, -1, -1],  // right wing
]
let scores = { A: 1, B: 10, C: 100, D: 1000 };
const walk = ({ data, score = 0 }) => {
  const key = data.map(s => (s[1] || '-') + (s[0] || '-')).join('');
  // if (key === "--AAx-BBx-CCx-DD--") { console.log('yes'); return {}; }
  if (cache[key]) { return {}; }
  cache[key] = data;

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
      // if (steps === -1) continue;
      if (s.length === 1) steps++;

      if (((i % 2) === 1) && ((move % 2) === 0)) continue;
      const tgt = data[i + move];
      if (!tgt) continue;
      if (tgt.length === 2) continue;
      if (tgt.length === 0) steps++;

      const copy = data.map(ss => [...ss]);
      const letter = copy[i].pop();
      copy[i + move].push(letter);

      const key2 = copy.map(s => (s[1] || '-') + (s[0] || '-')).join('');
      if (cache[key2]) continue;

      nexts[key2] = { data: copy, score: score + steps * scores[letter] };
    }
  });

  return nexts;
}

const work = (line) => {
  cache = {};

  const stacks = [
    [],
    [line[3], line[2]],
    ['x'],
    [line[7], line[6]],
    ['x'],
    [line[11], line[10]],
    ['x'],
    [line[15], line[14]],
    [],
  ];

  let res = walk({ data: stacks });
  while (Object.entries(res).length) {
    let res2 = {};
    for (const [key, val] of Object.entries(res)) {
      if (key === '--AA-xBB-xCC-xDD--') console.log('yay', key, val.score);
      for (const [k2, v2] of Object.entries(walk(val))) {
        res2[k2] = v2;
      }
    }
    res = res2;
    console.log(Object.keys(res).length);
  }
}

assert(work('--BA-xCD-xBC-xDA--'), 12521);
assert(work('--AC-xDC-xAD-xBB--'), 1752);
/*
--BA-xCD-xBC-xDA--
--BA-xCDBx-C-xDA--
--BABxCD-x-C-xDA--
--BABx-DCx-C-xDA--
--BABx-D-xCC-xDA--
--BABx--DxCC-xDA--
--BA-x-BDxCC-xDA--
---ABx-BDxCC-xDA--
---A-xBBDxCC-xDA--
---A-xBBDxCCDx-A--
---A-xBBDxCCDx---A
---A-xBBDxCC-x-D-A
---A-xBB-xCCDx-D-A
---A-xBB-xCC-xDD-A
---A-xBB-xCCAxDD--
---A-xBBAxCC-xDD--
---AAxBB-xCC-xDD--
--AA-xBB-xCC-xDD--
*/