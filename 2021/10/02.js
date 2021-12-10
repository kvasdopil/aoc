const { file, assert } = require('../../utils')

const validate = (line) => {
  const stack = [];
  for (const c of line.split('')) {
    if (['[', '(', '{', '<'].includes(c)) {
      stack.push(c);
      continue;
    }
    const ch = stack.pop();
    if (c === ']' && ch !== '[') return c;
    if (c === ')' && ch !== '(') return c;
    if (c === '}' && ch !== '{') return c;
    if (c === '>' && ch !== '<') return c;
  }
  return stack;
}

const score = (stack) => {
  const scores = { '(': 1, '[': 2, '{': 3, '<': 4 };
  let res = 0;
  while (stack.length) {
    res = res * 5 + scores[stack.pop()];
  }
  return res;
}

const work = (lines) => {

  let scores = [];
  for (line of lines) {
    const res = validate(line);
    if (typeof res === 'string') continue;
    scores.push(score(res));
  }
  scores = scores.sort((a, b) => b - a);
  while (scores.length > 1) {
    scores.pop();
    scores.shift();
  }
  return scores.shift()
}

const test = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
(((({<>}<{<{<>}{[]{[]{}
{<[[]]>}<{[{[{[]{()[[[]
<{([{{}}[<[[[<>{}]]]>[]]`.trim().split('\n');

assert(validate("[]"), []);
assert(validate("([])"), []);
assert(validate("{()()()}"), []);
assert(validate("<([{}])>"), []);
assert(validate("[<>({}){}[([])<>]]"), []);
assert(validate("(((((((((())))))))))"), []);
assert(validate("{()()()>"), '>');
assert(validate("<([]){()}[{}])"), ')');

assert(score(validate('[({(<(())[]>[[{[]{<()<>>')), 288957);
assert(score(validate('[(()[<>])]({[<{<<[]>>(')), 5566);
assert(score(validate('(((({<>}<{<{<>}{[]{[]{}')), 1480781);
assert(score(validate('{<[[]]>}<{[{[{[]{()[[[]')), 995444);
assert(score(validate('<{([{{}}[<[[[<>{}]]]>[]]')), 294);

assert(work(test), 288957);
assert(work(file('input.txt')), 2192104158);