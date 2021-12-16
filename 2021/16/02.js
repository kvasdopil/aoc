const { file, assert } = require('../../utils')

const get = (bits, n) => {
  let res = [];
  if (bits.length < n) throw new Error(`Unable to read ${n} bytes, len=${bits.length}`)
  for (let i = 0; i < n; i++) {
    res.push(bits.shift());
  }
  return parseInt(res.join(''), 2);
}

const getN = (bits) => {
  const res = [];
  while (true) {
    const val = get(bits, 5);
    res.push(Number(val & 0b1111).toString(2).padStart(4, '0'));
    if ((val & 0b10000) === 0) break;
  }
  return parseInt(res.join(''), 2);
}

const process = bits => {
  const version = get(bits, 3);
  const type = get(bits, 3);

  if (type === 4) return getN(bits);

  const i = get(bits, 1);
  const packets = [];
  if (i === 0) {
    let len = get(bits, 15);
    if (bits.length < len) throw new Error(`Unable to slice ${len}, len=${bits.length}`);
    const subpacket = bits.slice(0, len);
    while (subpacket.length) packets.push(process(subpacket));
    for (let j = 0; j < len; j++) bits.shift();
  } else {
    let count = get(bits, 11);
    for (let j = 0; j < count; j++) packets.push(process(bits));
  }

  // console.log(["+", "*", "m", "M", " ", ">", "<", "="][type], packets);

  if (type === 0) return packets.reduce((a, b) => a + b, 0);
  if (type === 1) return packets.reduce((a, b) => a * b, 1);
  if (type === 2) return Math.min(...packets);
  if (type === 3) return Math.max(...packets);
  if (type === 5) return packets[0] > packets[1] ? 1 : 0;
  if (type === 6) return packets[0] < packets[1] ? 1 : 0;
  if (type === 7) return packets[0] === packets[1] ? 1 : 0;

  throw new Error("Unknown type", type)
}

const work = line => {
  const bits = line.split('').map(ch => parseInt(ch, 16).toString(2).padStart(4, '0')).join('').split('');
  return process(bits);
}

assert(work('C200B40A82'), 3);
assert(work('04005AC33890'), 54);
assert(work('880086C3E88112'), 7);
assert(work('CE00C43D881120'), 9);
assert(work('D8005AC2A8F0'), 1);
assert(work('F600BC2D8F'), 0);
assert(work('9C005AC2F8F0'), 0);
assert(work('9C0141080250320F1802104A08'), 1);
assert(work(file('input.txt').shift()), 2536453523344);