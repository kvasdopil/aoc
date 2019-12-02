const { assert } = require("../../utils");

const gen = (factor, start, mod) => {
  let val = start;
  return () => {
    while (true) {
      val = (val * factor) % 2147483647;
      if (val % mod === 0) {
        return val;
      }
    }
  };
};

const a = gen(16807, 65, 4);
const b = gen(48271, 8921, 8);

assert(a(), 1352636452);
assert(a(), 1992081072);
assert(a(), 530830436);
assert(a(), 1980017072);
assert(a(), 740335192);

assert(b(), 1233683848);
assert(b(), 862516352);
assert(b(), 1159784568);
assert(b(), 1616057672);
assert(b(), 412269392);

const solve = (starta, startb) => {
  const a = gen(16807, starta, 4);
  const b = gen(48271, startb, 8);
  let ct = 0;
  for (let i = 0; i < 5000000; i++) {
    if ((a() & 0xffff) === (b() & 0xffff)) {
      ct++;
    }
  }
  return ct;
};

assert(solve(65, 8921), 309);

console.log(solve(512, 191));
