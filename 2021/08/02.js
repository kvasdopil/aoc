const { file, assert, permutation } = require('../../utils')

const sortString = s => s.split('').sort().join('');

const detectNumbers = (samples) => {
  const freqs = samples.join('').split('').reduce((res, char) => {
    res[char] = (res[char] || 0) + 1;
    return res;
  }, {});

  const chars = 'abcdefg'.split('');

  const one = samples.find(sample => sample.length === 2);
  const seven = samples.find(sample => sample.length === 3);
  const four = samples.find(sample => sample.length === 4);

  let B = chars.find(char => freqs[char] === 6);
  let E = chars.find(char => freqs[char] === 4);
  let F = chars.find(char => freqs[char] === 9);
  let C = one.split('').filter(a => a != F).shift();
  let A = seven.split('').filter(a => a != F).filter(a => a !== C).shift();
  let D = four.split('').filter(a => a !== C).filter(a => a !== B).filter(a => a !== F).shift();
  let G = chars.find(char => [A, B, C, D, E, F].indexOf(char) === -1);

  return { [A]: 'a', [B]: 'b', [C]: 'c', [D]: 'd', [E]: 'e', [F]: 'f', [G]: 'g' };
}

const NUMS = {
  cf: 1,
  acf: 7,
  bcdf: 4,
  acdfg: 3,
  acdeg: 2,
  abdfg: 5,
  abdefg: 6,
  abcefg: 0,
  abcdfg: 9,
  abcdefg: 8,
}

const process = (line) => {
  const [left, right] = line.trim().split(' | ');
  const samples = left.split(' ').map(sortString);
  const numbers = right.split(' ').map(sortString);

  const code = detectNumbers(samples);

  const res = numbers
    .map(
      number => number
        .split('')
        .map(char => code[char])
        .sort()
        .join('')
    ).map(a => NUMS[a])
    .join('');

  return parseInt(res, 10);
}

const work = (lines) => lines.map(process).reduce((a, b) => a + b, 0);

assert(process(`acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`), 5353);
assert(work(file('input.txt')), 1055164);