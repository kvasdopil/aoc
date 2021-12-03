const { file, assert } = require('../../utils')

const decode = (line) => parseInt(line.replace(/[FL]/g, '0').replace(/[BR]/g, '1'), 2);

const work = (lines) => {
  const ids = lines.map(decode);
  let maxid = 0;
  for (id of ids) maxid = Math.max(maxid, id);

  for (let id = 8; id < maxid - 8; id++) {
    if (ids.indexOf(id) === -1) return id;
  }
}

assert(decode('FBFBBFFRLR'), 357);
assert(decode('BFFFBBFRRR'), 567);
assert(decode('FFFBBBFRRR'), 119);
assert(decode('BBFFBBFRLL'), 820);

assert(work(file('input.txt')), 685);