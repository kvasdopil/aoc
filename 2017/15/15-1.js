const { assert } = require("../../utils");

const gen = (factor, start) => {
  let val = start;
  return () => (val = (val * factor) % 2147483647);
};

const a = gen(16807, 65);
const b = gen(48271, 8921);

assert(a(), 1092455);
assert(a(), 1181022009);
assert(a(), 245556042);
assert(a(), 1744312007);
assert(a(), 1352636452);

assert(b(), 430625591);
assert(b(), 1233683848);
assert(b(), 1431495498);
assert(b(), 137874439);
assert(b(), 285222916);

const solve = (starta, startb) => {
  const a = gen(16807, starta);
  const b = gen(48271, startb);
  let ct = 0;
  for (let i = 0; i < 40000000; i++) {
    if ((a() & 0xffff) === (b() & 0xffff)) {
      ct++;
    }
  }
  return ct;
};

assert(solve(65, 8921), 588);

console.log(solve(512, 191));
