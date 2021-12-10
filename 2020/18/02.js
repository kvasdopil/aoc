const { file, assert } = require('../../utils')

const handle = (line) => {
  let input = line;
  while (input.indexOf('(') >= 0) {
    const re = /(\([0-9*+ ]+\))/.exec(input);
    const expr = re[0].substring(1, re[0].length - 1);
    input = input.substring(0, re.index) + handle(expr) + input.substring(re.index + re[0].length);
  }

  while (input.indexOf('+') >= 0) {
    const re = /[0-9]+ \+ [0-9]+/.exec(input);
    const expr = re[0];
    const [a, , b] = expr.split(" ");
    input = input.substring(0, re.index) + (parseInt(a, 10) + parseInt(b, 10)) + input.substring(re.index + re[0].length);
  }

  while (input.indexOf('*') >= 0) {
    const re = /[0-9]+ \* [0-9]+/.exec(input);
    const expr = re[0];
    const [a, , b] = expr.split(" ");
    input = input.substring(0, re.index) + (parseInt(a, 10) * parseInt(b, 10)) + input.substring(re.index + re[0].length);
  }

  return parseInt(input, 10);
}

const work = (lines) => lines.map(line => handle(line)).reduce((a, b) => a + b, 0);

assert(handle(`1 + 2 * 3 + 4 * 5 + 6`), 231);
assert(handle(`1 + (2 * 3) + (4 * (5 + 6))`), 51);
assert(handle(`2 * 3 + (4 * 5)`), 46);
assert(handle(`5 + (8 * 3 + 9 + 3 * 4 * 3)`), 1445);
assert(handle(`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`), 669060);
assert(handle(`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`), 23340);
assert(work(file('input.txt')), 158916);