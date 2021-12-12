const { file, assert } = require('../../utils')

const walk = (graph, path) => {
  const start = path[path.length - 1];
  if (start === 'end') return [path];

  return graph
    .filter(([a, b]) => a === start || b === start)
    .map(([a, b]) => a === start ? b : a)
    .filter((n) => (n.toUpperCase() === n) ? true : (path.indexOf(n) === -1))
    .map(next => walk(graph, [...path, next]))
    .reduce((res, p) => res.concat(p), []);
}

const work = (lines) => {
  const graph = lines.map(line => line.split('-'));
  return walk(graph, ['start']).length;
}

const test = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`.trim().split("\n");
assert(work(test), 10);

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
assert(work(test2), 19);

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
assert(work(test3), 226);
assert(work(file('input.txt')), 5874);