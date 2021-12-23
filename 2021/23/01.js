const { file, assert } = require('../../utils')

const work = (line) => {
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

  console.log(stacks);

  const cache = {};

  const walk = (st) => {
    const key = st.map(s => (s[1] || '-') + (s[0] || '-')).join('');
    if (key === "--AAx-BBx-CCx-DD--") { console.log('yes'); return 1; }
    if (cache[key]) { return 0; }
    // if (/^--BABx-D-xCC-xDA--/.test(key)) console.log(key, nest);
    cache[key] = st;

    // if (nest > 1000) return 0;

    // console.log(nest, key);

    const nexts = {};

    st.forEach((s, i) => {
      if (s.length === 0) return;
      if (s[s.length - 1] === 'x') return;
      if (i === 1 && s.length === 1 && s[0] === 'A') return;
      if (i === 3 && s.length === 1 && s[0] === 'B') return;
      if (i === 5 && s.length === 1 && s[0] === 'C') return;
      if (i === 7 && s.length === 1 && s[0] === 'D') return;
      for (const move of [-2, -1, 1, 2]) {
        if (((i % 2) === 1) && ((move % 2) === 0)) continue;
        const tgt = st[i + move];
        if (!tgt) continue;
        if (tgt.length === 2) continue;

        // if (key === '---A-xBBDxCCDx---A') console.log(key, s, i, i + move);
        const copy = st.map(ss => [...ss]);
        const val = copy[i].pop();
        copy[i + move].push(val);
        // nexts.push(copy);

        const key2 = copy.map(s => (s[1] || '-') + (s[0] || '-')).join('');
        if (cache[key2]) continue;
        // if (key === '---A-xBBDxCCDx---A') console.log(key2);

        nexts[key2] = copy;
      }
    });

    return nexts;
  }

  let res = walk(stacks);
  for (let i = 0; i < 50; i++) {
    let res2 = {};
    for (const [key, val] of Object.entries(res)) {
      if (key === '--AA-xBB-xCC-xDD--') console.log('yay', key);
      for (const [k2, v2] of Object.entries(walk(val))) {
        res2[k2] = v2;
      }
    }
    res = res2;
    console.log(i, Object.keys(res).length);


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