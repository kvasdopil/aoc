const { file, assert } = require('../../utils')

const calcDiffs = (data) => {
  let one = 0;
  let three = 0;
  data.forEach((val, i) => {
    if (!i) return;
    if (val - data[i - 1] === 1) one++;
    if (val - data[i - 1] === 3) three++;
  });
  return [one, three];
}

const work = (lines) => {
  const data = lines.map(line => parseInt(line, 10));
  data.sort((a, b) => a - b);
  return calcDiffs([0, ...data, data[data.length - 1] + 3]);
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