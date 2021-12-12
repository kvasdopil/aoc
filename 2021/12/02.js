const { file, assert } = require('../../utils')

const countLetters = array => array.reduce((res, a) => ({ ...res, [a]: (res[a] || 0) + 1 }), {})

const check = (path, n) => {
  // console.log(path, n)
  if (n === 'start') return false;
  if (n.toUpperCase() === n) return true;

  const letters = countLetters(path);
  if (!letters[n]) return true;
  //if (Object.values(letters).includes(2)) return letters[n] < 1;
  //return letters[n] < 2;
  return letters[n] < 2;
}

const verify = (line) => {
  const letters = countLetters(line);
  return Object.keys(letters)
    .filter(key => (key.toUpperCase() !== key))
    .map(key => letters[key])
    .filter(val => val === 2)
    .length < 2;
}

const walk = (graph, path) => {
  if (!verify(path)) return [];

  const start = path[path.length - 1];
  if (start === 'end') return [path];

  return graph
    .filter(([a, b]) => a === start || b === start)
    .map(([a, b]) => a === start ? b : a)
    .filter(n => check(path, n))
    .map(next => walk(graph, [...path, next]))
    .reduce((res, p) => res.concat(p), []);
}

const work = (lines) => {
  const graph = lines.map(line => line.split('-'));
  const w = walk(graph, ['start']);
  return w.filter(verify).length;
}

const test = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.trim().split("\n");
assert(work(test), 36);

const test2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`.trim().split('\n');
assert(work(test2), 103);

const test3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`.trim().split('\n');
assert(work(test3), 3509);
assert(work(file('input.txt')), 5874);