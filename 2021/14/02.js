const { file, assert } = require('../../utils')

const cts = (data, seq) => {
  const ra = {};
  const first = seq[0];
  const last = seq[seq.length - 1];

  for (const key of Object.keys(data)) {
    const val = data[key];
    const [a, b] = key.split('');
    if (val <= 0) continue;
    if (!ra[a]) ra[a] = 0;
    if (!ra[b]) ra[b] = 0;
    ra[a] += val;
    ra[b] += val;
  }

  if (!ra[first]) ra[first] = 0;
  if (!ra[last]) ra[last] = 0;
  ra[first] += 1;
  ra[last] += 1;

  for (const key of Object.keys(ra))
    ra[key] /= 2;

  return ra;
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
    const v2 = {};
    for (const key of Object.keys(values)) {
      const value = values[key];
      if (value <= 0) continue;
      if (!v2[key]) v2[key] = 0;
      v2[key] += value;

      const c = rules[key];
      if (c) {
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

  const result = cts(values, seq);
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

assert(work(test, 40), 2188189693529);
assert(work(file('input.txt'), 40), 3390034818249);
