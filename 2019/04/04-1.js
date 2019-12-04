const { assert } = require("../../utils");

const test = a => {
  const d = a
    .toString()
    .split("")
    .map(i => parseInt(i, 10));

  const double =
    d[0] == d[1] ||
    d[1] == d[2] ||
    d[2] == d[3] ||
    d[3] == d[4] ||
    d[4] == d[5];

  if (!double) {
    return false;
  }

  const increasing =
    d[1] >= d[0] &&
    d[2] >= d[1] &&
    d[3] >= d[2] &&
    d[4] >= d[3] &&
    d[5] >= d[4];

  if (!increasing) {
    return false;
  }

  return true;
};

const solve = (a, b) => {
  let ct = 0;
  for (let i = a; i <= b; i++) {
    if (test(i)) {
      ct++;
    }
  }

  return ct;
};

assert(test(111111), true);
assert(test(223450), false);
assert(test(123789), false);

console.log(solve(347312, 805915));
