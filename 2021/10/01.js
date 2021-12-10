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
  return true;
}

const work = (lines) => {
  const scores = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  let score = 0;
  for (line of lines) {
    const res = validate(line);
    if (scores[res]) score += scores[res];
  }
  return score;
}

const test = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`.trim().split('\n');

assert(validate("[]"));
assert(validate("([])"));
assert(validate("{()()()}"));
assert(validate("<([{}])>"));
assert(validate("[<>({}){}[([])<>]]"));
assert(validate("(((((((((())))))))))"));
assert(validate("{()()()>"), '>');
assert(validate("<([]){()}[{}])"), ')');

assert(work(test), 26397);
assert(work(file('input.txt')), 392367);