const { file, assert } = require('../../utils')

/*
This one is tricky and fun.
We have an increasing series of numbers starting with 0, interval btw any adjacent numbers is 1, 2 or 3.
Any numbers can be excluded from the series, if the sequence still valid that creates a new combination.
The answer is number of all possible combinations for a given sequence.
*/

const work = (lines) => {
  const data = lines.map(line => parseInt(line, 10)); // the sequence
  data.sort((a, b) => a - b); // any valid sequence should be increasing

  const d2 = [0, ...data]; // add leading 0

  const diffs = d2.map((val, i) => val - d2[i - 1]); // convert numbers to difference btw adjacent numbers
  diffs.shift(); // first item is NaN, ditch it

  // Here we have a sequence of 1,2 and 3s
  // We cant do anything with 3s so we just throw them away, 2s are not included in our input, so skip them
  // Now we work with a bunch of '1..1','1...1' sequences, each of them yielding a few possible combinations.
  // E.g. '11' can be replaced with '2' (making 2 possible combinations)
  // '111' - with '21', '12', and '3' (4 combinations), etc.
  // So we replace each chunk with number of possible combinations for it, multiply, and that would be our answer.

  return diffs.join('').split('3').map(item => {
    if (item === '') return 1;
    if (item === '1') return 1;
    if (item === '11') return 2;
    if (item === '111') return 4;
    if (item === '1111') return 7;
  }).reduce((a, b) => a * b, 1);
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

assert(work(test), 8);
assert(work(test2), 19208);
assert(work(file('input.txt')), 86812553324672);