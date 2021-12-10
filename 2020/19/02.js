const { file, assert } = require('../../utils')

const parse = lines => {
  const rules = {};
  let messages = [];

  while (true) {
    const line = lines.shift();
    if (line === "") break;
    const re = /^([0-9]+): ([0-9 ]+) \| ([0-9 ]+)$/.exec(line);
    if (re) {
      rules[re[1]] = [re[2], re[3]].map(line => line.split(" ").map(a => parseInt(a, 10)));
      continue;
    }

    const re2 = /^([0-9]+): ([0-9 ]+)$/.exec(line);
    if (re2) {
      rules[re2[1]] = [re2[2].split(" ").map(a => parseInt(a, 10))];
      continue;
    }

    const re3 = /^([0-9]+): "([ab])"$/.exec(line);
    if (re3) {
      rules[re3[1]] = [[re3[2]]];
      continue;
    }

    console.log(line);
  }

  messages = [...lines];

  return { rules, messages };
}

const expand = (rules, seq, filter) => {
  let i;
  if (filter)
    i = seq.findIndex(val => val === filter);
  else
    i = seq.findIndex(val => typeof val !== 'string');
  if (i < 0) return [seq];

  const value = seq[i];
  const rule = rules[value];
  return rule.map(subst => [
    ...seq.slice(0, i),
    ...subst,
    ...seq.slice(i + 1),
  ]);
}

const work = (lines) => {
  const { rules, messages } = parse(lines);
  let next = 7;

  while (true) {
    for (const key of Object.keys(rules)) {
      rules[key] = rules[key].map(seq => expand(rules, seq, next)).reduce((res, seq) => res.concat(seq), []);
    }

    const nums = {};
    for (const rule of Object.values(rules)) {
      for (const seq of rule) {
        for (const val of seq) {
          nums[val] = nums[val] ? nums[val] + 1 : 1;
        }
      }
    }
    delete nums['a'];
    delete nums['b'];

    if (Object.keys(nums).length === 2) {
      console.log(nums);
      break;
    }

    const [nxt, freq] = Object.keys(nums).map(key => [key, nums[key]]).sort(([, a], [, b]) => b - a).filter(a => a !== 11).filter(a => a !== 8).shift();
    console.log(nxt, freq);
    next = parseInt(nxt, 10);
  }

  const r31 = {};
  // const r42 = {};
  for (const seq of rules[31])
    r31[seq.join('')] = 1;
  // for (const seq of rules[31])
  //   r42[seq.join('')] = 1;

  // for (const key of Object.keys(r31)) {
  //   if (!r42[key]) console.log('only in 31', key);
  // }

  const len = Object.keys(r31)[0].length;
  console.log(len);
  return messages.filter(m => {
    let str = m;
    console.log('s', str);
    while (str.length) {
      const sub = str.slice(0, len);
      console.log(sub);
      if (!r31[sub]) return false;
      str = str.slice(len);
    }
    return true;
  }).length;
  // console.log(Object.keys(r31).length, Object.keys(r42).length)
}

const test = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`.trim().split("\n");

assert(work(file('input.txt')), 132);