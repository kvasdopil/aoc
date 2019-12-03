const { assert } = require("../../utils");

const solve = (skip, limit) => {
  let value = 0;
  let pos = 0;
  for (let n = 1; n <= limit + 1; n++) {
    pos = (pos + skip) % n;
    if (pos === 0) {
      value = n;
    }
    pos += 1;
  }
  return value;
};

assert(solve(3, 9), 9);
assert(solve(363, 2017), 1627);
assert(solve(363, 10000), 9234);
assert(solve(363, 20000), 17920);

console.log(solve(363, 50000000));
