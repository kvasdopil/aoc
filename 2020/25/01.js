const { file, assert } = require('../../utils')

const findLoop = (key) => {
  let val = 1;
  let subj = 7;
  let loop = 1;
  while (true) {
    val *= subj;
    val %= 20201227;
    if (val === key) return loop;
    loop++;
  }
}

const transform = (subj, size) => {
  let val = 1;
  for (let i = 0; i < size; i++) {
    val *= subj;
    val %= 20201227;
  }
  return val;
}

const work = (a, b) => {
  const la = findLoop(a);
  return transform(b, la);
}

assert(findLoop(5764801), 8);
assert(findLoop(17807724), 11);
assert(transform(5764801, 11), 14897079);
assert(transform(17807724, 8), 14897079);
assert(work(14788856, 19316454), 0);