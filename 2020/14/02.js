const { file, assert } = require('../../utils')

// Oh, this is a good one
// A naive approach would be:
// a) going thru the whole 36-bit address space for each instruction
// b) checking if the address suits the current mask and address 
// c) writing the value
// However, this is impractical, as cycling 0...2^36 takes forever.
//
// Instead as we can see, instruction addresses never exceed 0xffff, so we can split the address space.
//
// Step one) Find all the short addresses (0x0000-0xffff) that are affected, and for each one
// store a list of instructions (aka full address mask + value)
//
// Step two) For each of the addresses perform 'a naive approach' algorythim on the rest of address space.
// That would only have 20bit size, pretty manageable.

const parseMask = (mask) => {
  const mx = parseInt(mask.split('').map(c => c === 'X' ? '0' : '1').join(''), 2);
  const m1 = parseInt(mask.split('').map(c => c === '1' ? '1' : '0').join(''), 2);

  return [mx, m1];
}

const calcSubgroup = (subgroup) => {
  const memory = {};

  // An optimization: for a single entry we don't need to go thru the address space at all
  // instead, we just calculate a number of possible addresses = 2^(number of X's in mask)
  // and multuply by value
  if (subgroup.length === 1) {
    const [mask, value] = subgroup[0];
    return value * Math.pow(2, mask.split('').filter(c => c === 'X').length);
  }

  // For each entry go thru the address space, find suitable addresses and write the value
  for (const entry of subgroup) {
    const [mask, value] = entry;
    const [ignored, m1] = parseMask(mask);

    for (let i = 0; i <= 0b11111111111111111111; i++)
      if ((i & ignored) === (m1 & ignored))
        memory[i] = value;
  }

  return Object.keys(memory).reduce((a, key) => a + memory[key], 0);
}

const work = (lines) => {
  let mask1 = 0;
  let maskX = 0;
  let groupMask = '';
  const groups = {};

  for (const line of lines) {
    if (/^mask = /.test(line)) {
      const maskLine = line.split(' ').pop();
      const [I, M] = parseMask(maskLine);

      // On the 1st step we only need lower 16 bit of the mask
      mask1 = M & 0b1111111111111111;
      maskX = I & 0b1111111111111111;
      groupMask = maskLine.substring(0, 20);

      continue;
    }

    const [, addr, v] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
    const value = parseInt(v, 10);
    const address = addr | mask1;

    // Go thru the address space, find a suitable address and store the value and mask prefix
    for (let i = 0; i <= 0xffff; i++)
      if ((i & maskX) === (address & maskX)) {
        if (!groups[i]) groups[i] = [];
        groups[i].push([groupMask, value]);
      }
  }

  return Object.keys(groups).reduce((sum, key) => sum + calcSubgroup(groups[key]), 0);
}

const test = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.trim().split("\n");

assert(work(test), 208);
assert(work(file('input.txt')), 5724245857696);
