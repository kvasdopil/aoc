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
  let result = 0;
  while (true) {
    const val = get(bits, 5);
    result = (result << 4) + (val & 0b1111);
    if ((val & 0b10000) === 0) return result;
  }
}

const process = bits => {
  const version = get(bits, 3);
  const type = get(bits, 3);

  if (type === 4) return { version, type, value: getN(bits) };

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

  return { version, type, packets };
}


const parse = (line) => {
  const bits = line.split('').map(ch => parseInt(ch, 16).toString(2).padStart(4, '0')).join('').split('');

  return process(bits);
}

const work = line => {
  const d = parse(line);
  const walk = root => {
    if (root.packets) return root.packets.reduce((sum, p) => sum + walk(p), root.version);
    return root.version;
  }

  return walk(d);
}

assert(parse("D2FE28"), { version: 6, type: 4, value: 2021 });
assert(parse("38006F45291200"), {
  version: 1,
  type: 6,
  packets: [
    { version: 6, type: 4, value: 10 },
    { version: 2, type: 4, value: 20 }
  ]
})
assert(parse("EE00D40C823060"), {
  version: 7,
  type: 3,
  packets: [
    { version: 2, type: 4, value: 1 },
    { version: 4, type: 4, value: 2 },
    { version: 1, type: 4, value: 3 }
  ]
})
assert(work("8A004A801A8002F478"), 16);
assert(work("620080001611562C8802118E34"), 12);
assert(work("C0015000016115A2E0802F182340"), 23);
assert(work("A0016C880162017C3686B18A3D4780"), 31);
assert(work(file('input.txt').shift()), 917);