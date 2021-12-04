const { file, assert } = require('../../utils')

const work = (lines) => {
  const data = lines.map(line => parseInt(line, 10));
  data.sort((a, b) => a - b);

  const d2 = [0, ...data]; // add leading 0

  const diffs = d2.map((val, i) => val - d2[i - 1]); // convert numbers to difference btw adjacent numbers
  diffs.shift(); // first item is NaN, ditch it

  const ones = diffs.filter(n => n === 1).length;
  const threes = diffs.filter(n => n === 3).length;

  return [ones, threes + 1];
}

const test = `16
10
15
5
1
11
7
19
6
12
4`.trim().split("\n");

const test2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`.trim().split("\n");

assert(work(test), [7, 5]);
assert(work(test2), [22, 10]);
assert(work(file('input.txt')), [71, 29]);