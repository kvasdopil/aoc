const { file, assert } = require('../../utils')

const values = (start) => {
  const result = [];
  let cur = start;
  while (cur) {
    result.push(cur.val);
    cur = cur.next;
  }
  return result;
}

const match = (rules, start) => {
  let cur = start;
  while (cur.next) {
    const next = cur.next;
    //console.log('cur', cur.val)
    rules.forEach(([src, letter]) => {
      if (src[0] !== cur.val || src[1] !== next.val) return;
      console.log('match', src, letter)
      cur.next = { val: letter, next: cur.next };
    });
    cur = next;
  }
}

const cts = (start) => {
  const counts = {};
  cur = start;
  while (cur) {
    if (!counts[cur.val]) counts[cur.val] = 0;
    counts[cur.val]++;
    cur = cur.next;
  }
  return counts;
}

const work = (lines, steps) => {
  const seq = lines.shift().split('');
  lines.shift();
  const rules = lines.map(line => line.split(" ")).map(([a, , b]) => [a, b]);

  const head = {};
  let cur = head;
  while (seq.length) {
    cur.next = { val: seq.shift(), next: null };
    cur = cur.next;
  }

  while (steps) {
    console.log("step");
    match(rules, head.next);
    steps--;
    console.log(values(head.next).join(''))
  }

  const counts = cts(head.next);
  console.log(counts);
  const freqs = Object.entries(counts).sort(([, a], [, b]) => b - a);
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

// assert(work(test, 10), 1588);
assert(work(file('input.txt'), 2), 2937);


