const { file, assert } = require('../../utils')

const work = (lines) => {
  let mask = 0;
  let ignored = 0;
  let prefix = '';
  const values = {};
  for (const line of lines) {
    if (/^mask = /.test(line)) {
      const maskline = line.split(' ').pop()
      const M = parseInt(maskline.split('').map(c => c === '1' ? '1' : '0').join(''), 2);
      const I = parseInt(maskline.split('').map(c => c === 'X' ? '0' : '1').join(''), 2);
      mask = M & 0b1111111111111111;
      ignored = I & 0b1111111111111111;
      prefix = maskline.substring(0, 20);

      continue;
    }

    const [, addr, v] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
    // console.log(
    //   //Number(prefix).toString(2).padStart(20, '0'),
    //   Number((addr & ignored) | mask).toString(2).padStart(16, '0'),
    //   Number(ignored).toString(2).padStart(16, '0'),
    // );
    for (let i = 0; i < 0xffff; i++) {
      if ((i & ignored) === ((addr | mask) & ignored)) {
        // console.log(i);
        if (!values[i]) values[i] = [];
        values[i].push([prefix, parseInt(v, 10)]);
      }
    }
  }

  // for (const key of Object.keys(values))
  //   console.log(key, values[key]);

  console.log(Object.keys(values).length)
  const kk = Object.keys(values);
  for (const k of kk)
    if (values[k].length < 2)
      delete values[k];

  // console.log(Object.keys(values).length)
  for (const k of Object.keys(values)) {
    // console.log(values[k]);
    const items = values[k];
    for (let i = 1; i < items.length; i++)
      for (let j = 0; j < i; j++) {
        let good = true;
        for (let m = 0; m < 20; m++)
          if (items[i][m] !== items[j][m] && items[i][m] !== 'X' && items[j][m] !== 'X') {
            good = false;
            break;
          }
        if (good) {
          console.log(items[j])
        }
      }
  }
  // let mask = [];
  // const memory = {};

  // for (const line of lines) {
  //   if (/^mask = /.test(line)) {
  //     mask = line.split(' ').pop().split('');
  //     continue;
  //   }

  //   const [, addr, v] = /^mem\[([0-9]+)\] = ([0-9]+)$/.exec(line);
  //   const val = Number(v).toString(2).padStart(mask.length, '0');
  //   // const res = mask.map((bit, n) => bit === 'X' ? val[n] : bit);

  //   let m2 = [...mask].replace('X', 'a');
  //   while(true) {
  //     for(let i = 0; i<mask.length; i++)
  //     {
  //       if (mask[i])
  //     }
  //   }

  //   memory[addr] = res;
  // }
  // return Object.values(memory)
  //   .map(mem => parseInt(mem.join(''), 2))
  //   .reduce((a, b) => a + b, 0)
}

// const test = `mask = 000000000000000000000000000000X1001X
// mem[42] = 100
// mask = 00000000000000000000000000000000X0XX
// mem[26] = 1`.trim().split("\n");

// assert(work(test), 165);
assert(work(file('input.txt')), 15018100062885);
