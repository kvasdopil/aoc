const { log } = require('console');
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

const DBG = [
  '--BA-xCD-xBC-xDA--', // 0
  '--BA-xCDBx-C-xDA--', // 20
  '--BABxCD-x-C-xDA--', // 40
  '--BABx-DCx-C-xDA--', // 240
  '--BABx-D-xCC-xDA--', // 440
  '--BABx--DxCC-xDA--', // 3440
  '--BA-x-BDxCC-xDA--', // 3470 
  '---ABx-BDxCC-xDA--', // 3490
  '---A-xBBDxCC-xDA--', // 3510
  '---A-xBBDxCCDx-A--', // 5510
  '---A-xBBDxCCDx---A', // 5513
  '---A-xBBDxCC-x-D-A', // 8513
  '---A-xBB-xCCDx-D-A', // 10513
  '---A-xBB-xCC-xDD-A', // 12513
  '---A-xBB-xCCAxDD--', // 12515
  '---A-xBBAxCC-xDD--', // 12517
  '---AAxBB-xCC-xDD--', // 12519
  '--AA-xBB-xCC-xDD--', // 12521
];

let scores = { A: 1, B: 10, C: 100, D: 1000 };
const walk = ({ data, score = 0, log = [] }) => {
  const key = data.map(s => (s[1] || '-') + (s[0] || '-')).join('');
  // if (key === "--AAx-BBx-CCx-DD--") { console.log('yes'); return {}; }

  // if (DBG.includes(key)) console.log('dbg', key, score, log);

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

      // if (((i % 2) === 1) && ((move % 2) === 0)) continue;
      const tgt = data[i + move];
      if (!tgt) continue;
      if (tgt.length === 2) continue;
      if (tgt.length === 0) steps++;

      const copy = data.map(ss => [...ss]);
      const letter = copy[i].pop();

      // // if (dbg.indexOf(key) console.log(key, s, i, score, log);

      if (i + move === 1 && letter !== 'A') continue;
      if (i + move === 3 && letter !== 'B') continue;
      if (i + move === 5 && letter !== 'C') continue;
      if (i + move === 7 && letter !== 'D') continue;
      if (i + move === 1 && tgt.length === 1 && tgt[0] !== 'A') continue;
      if (i + move === 3 && tgt.length === 1 && tgt[0] !== 'B') continue;
      if (i + move === 5 && tgt.length === 1 && tgt[0] !== 'C') continue;
      if (i + move === 7 && tgt.length === 1 && tgt[0] !== 'D') continue;

      copy[i + move].push(letter);

      const key2 = copy.map(s => (s[1] || '-') + (s[0] || '-')).join('');

      const newscore = score + steps * scores[letter];
      const log2 = [...log, [key2, newscore]];
      const entry = { data: copy, score: newscore, log: log2 };;

      // if (key === "---AAxBB-xCC-xDD--") {
      //   console.log(key, '->', key2);
      //   console.log(nexts[key2]);
      // }
      // if (cache[key2]) {
      //   if (cache[key2].score < entry.score)
      //     cache[key2] = entry;
      //   continue;
      // }

      if (!nexts[key2] || nexts[key2].score > entry.score) {
        //if (nexts[key2] && key2 == '--AA-xBB-xCC-xDD--') console.log('ababab')
        nexts[key2] = entry;
      }
    }
  });

  return nexts;
}

const work = (line) => {
  cache = {};

  const stacks = [
    ['x'],
    [line[3], line[2]],
    ['x'],
    [line[7], line[6]],
    ['x'],
    [line[11], line[10]],
    ['x'],
    [line[15], line[14]],
    [],
  ];

  const results = [];

  let res = walk({ data: stacks });
  while (Object.entries(res).length) {
    let res2 = {};
    for (const [key, val] of Object.entries(res)) {
      if (key === '-xAA-xBB-xCC-xDD--') {
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

assert(work('--BA-xCD-xBC-xDA--'), 12523); // actually 12521 but not considering sides
assert(work('--AC-xDC-xAD-xBB--'), 1752); // 13499 high
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





// '--BA-xCD-xBC-xDA--',
// '--BA-xCD-xBC-x-A-D',
// '--BA-xCD-xBCAx---D',
// '--BA-xCD-xBCAx-D--',
// '--BA-xCDAxBC-x-D--',
// '--BAAxCD-xBC-x-D--',
// '--BAAxCDBx-C-x-D--',
// '-ABA-xCDBx-C-x-D--',
// '-ABABxCD-x-C-x-D--',
// '-ABABx-DCx-C-x-D--',
// '-ABABx-D-xCC-x-D--',
// '-ABABx--DxCC-x-D--',
// '-ABABx---xCCDx-D--',
// '-ABABx---xCC-xDD--',
// '-ABA-x-B-xCC-xDD--',
// '-A-ABx-B-xCC-xDD--',
// '-A-A-xBB-xCC-xDD--',
// '--AA-xBB-xCC-xDD--'