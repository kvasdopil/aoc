const { file, assert } = require('../../utils')

const process = (expr) => {
  const ops = expr.split(' ');
  let value = parseInt(ops.shift(), 10);
  while (ops.length) {
    const op = ops.shift();
    const arg = parseInt(ops.shift(), 10);
    if (op === '+') value += arg;
    if (op === '*') value *= arg;
  }
  return value;
}

const handle = (line) => {
  let input = line;
  while (input.indexOf('(') >= 0) {
    const re = /(\([0-9*+ ]+\))/.exec(input);
    const expr = re[0].substring(1, re[0].length - 1);
    input = input.substring(0, re.index) + handle(expr) + input.substring(re.index + re[0].length);
  }
  return process(input);
}

const work = (lines) => {
  return lines.map(line => handle(line)).reduce((a, b) => a + b, 0);
}


assert(handle(`1 + 2 * 3 + 4 * 5 + 6`), 71);
assert(handle(`(1 + 2 * 3 + 4 * 5 + 6)`), 71);
assert(handle(`1 + (2 * 3) + (4 * (5 + 6))`), 51);
assert(handle(`2 * 3 + (4 * 5)`), 26);
assert(handle(`5 + (8 * 3 + 9 + 3 * 4 * 3)`), 437);
assert(handle(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`), 12240);
assert(handle(`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`), 13632);
assert(work(file('input.txt')), 158916);