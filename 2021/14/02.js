const { file, assert } = require('../../utils')

const cts = (data) => {
  const ra = {};
  const rb = {};

  for (const key of Object.keys(data)) {
    const val = data[key];
    const [a, b] = key.split('');
    if (val <= 0) continue;
    if (a === 'P' || b === 'P')
      console.log(a, b, val)
    if (!ra[a]) ra[a] = 0;
    if (!rb[b]) rb[b] = 0;
    ra[a] += val;
    rb[b] += val;
  }

  // console.log(data)

  return Object.keys(ra).reduce((res, key) => ({ ...res, [key]: Math.max(ra[key], rb[key]) }), {});
}

const work = (lines, steps) => {
  const seq = lines.shift().split('');
  lines.shift();
  const rules = lines.map(line => line.split(" ")).reduce((res, [a, , b]) => ({ ...res, [a]: b }), {});

  let values = {};
  for (let i = 0; i < seq.length - 1; i++) {
    const key = seq[i] + seq[i + 1];
    if (!values[key]) values[key] = 0;
    values[key]++;
  }

  while (steps) {
    console.log("step");
    const v2 = {};
    for (const key of Object.keys(values)) {
      const value = values[key];
      if (value <= 0) continue;
      if (!v2[key]) v2[key] = 0;
      v2[key] += value;

      const c = rules[key];
      if (c) {
        console.log('match', key, c, value)
        const [a, b] = key.split('');
        if (!v2[a + c]) v2[a + c] = 0;
        if (!v2[c + b]) v2[c + b] = 0;
        v2[a + c] += value;
        v2[c + b] += value;
        v2[key] -= value;
      }
    }
    values = v2;
    steps--;
  }

  const result = cts(values);
  console.log(result);
  const freqs = Object.entries(result).sort(([, a], [, b]) => b - a);

  const [, a] = freqs.shift();
  const [, b] = freqs.pop();
  return a - b;
}

const test = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`.trim().split("\n");

// assert(work(test, 40), 2188189693529);
assert(work(file('input.txt'), 2), 2937);

/// 3033229588636 low
/// 3390034818250 high
/*













match PF N
match FV C
match VK H
match KO K
match OB C
match BS C
match SH V
match HP K
match PS P
match SP V
match PO S

match OO S
match OC N
match CO B
match OH H
match HB V
match BP F
match PN F
match NF H
match FC S

match CV K
match VH V
match HK H
match KK N
match KO K

match OC N
match CB V
match BC H
match CS B
match SV K

match KP K
match PP K
match PS P
match VP H

match SO C
match OS N
match ON V

match NC H
match BO N
match OH H
match HH B
match HV F
match VB S
match BF V
match FP F











































match PF N 1
match FV C 1
match VK H 1
match KO K 1
match OB C 1
match BS C 1
match SH V 1
match HP K 1
match PS P 1
match SP V 1
match PO S 1

match OO S 3
match OC N 1
match CO B 1
match OH H 1
match HB V 1
match BP F 1
match PN F 1
match NF H 1
match FC S 1

match CV K 1
match VH V 2
match HK H 2
match KO K 1
match KK N 1

match OC N 1
match CB V 2
match BC H 1
match CS B 1
match SV K 2

match KP K 1
match PS P 2
match PP K 1
match VP H 1

match SO C 4
match OS N 3
match ON V 1

match NC H 1
match BO N 1
match OH H 1
match HH B 1
match HV F 1
match VB S 1
match BF V 1
match FP F 1

*/