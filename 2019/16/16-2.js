const { assert, file } = require("../../utils");

function* pattern(n) {
  const pat = [0, 1, 0, -1];
  let a = 0;
  let b = 1;

  while (true) {
    while (b < n) {
      yield pat[a % 4];
      b++;
    }
    b = 0;
    a++;
  }
}

const add = (a, b) => a.map((vala, n) => vala + b[n]);
const sub = (a, b) => a.map((vala, n) => vala - b[n]);

const process = input =>
  input.map((val, n) => {
    const p = pattern(n + 1);

    let res = input[0].map(() => 0);
    for (let i = 0; i < input.length; i++) {
      const multiplier = p.next().value;
      if (multiplier > 0) {
        res = add(res, input[i]);
      }
      if (multiplier < 0) {
        res = sub(res, input[i]);
      }
    }
    return res;
  });

let pat = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],

  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
];

for (let i = 0; i < 120; i++) {
  pat = process(pat);
}

pat.map(n => console.log(n.join()));
