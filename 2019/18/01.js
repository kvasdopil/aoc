const { assert, file } = require('../../utils');

const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
const print = map => console.log(map.map(line => line.join('')).join("\n"))

const findStart = (map) => {
  const y = map.findIndex(line => line.includes("@"));
  const x = map[y].findIndex(ch => ch === '@');
  return [x, y];
}

const findWays = (map) => {
  const copy = map.map(line => line.map(a => a));

  const [sx, sy] = findStart(map);
  let positions = [[sx, sy, 0]];
  copy[sy][sx] = '#';

  let results = [];
  while (positions.length) {
    let next = [];
    for (const [x, y, steps] of positions) {
      for (const [dx, dy] of directions) {
        const [X, Y] = [x + dx, y + dy];
        if (copy[Y] === undefined) continue;
        const val = copy[Y][X];
        copy[Y][X] = '#';
        if (val === undefined || val === '#' || (val >= 'A' && val <= 'Z')) continue;
        if (val >= 'a' && val <= 'z') results.push([X, Y, val, steps + 1]);
        next.push([X, Y, steps + 1]);
      }
    }
    positions = next;
  }
  return results;
}

const work = (input) => {
  let map = input.map(line => line.split(""));
  const [path, steps] = solve(map).sort(([, a], [, b]) => a - b).shift();
  return steps;
}

const solve = (map, prefix = "", steps = 0) => {
  const result = [];

  let ways = findWays(map);
  if (ways.length === 0) return [[prefix, steps]];

  for (const [x, y, letter, s] of ways) {
    const copy = applyKey(map, letter);
    for (const next of solve(copy, prefix + letter, steps + s)) {
      result.push(next);
    }
  }

  return result;
}

const applyKey = (map, letter) => {
  const door = letter.toUpperCase();
  return map.map(line => line.map(ch => {
    if (ch === door) return '.';
    if (ch === letter) return '@';
    if (ch === '@') return '.';
    return ch;
  }));
}

const t1 = [
  '#########',
  '#b.A.@.a#',
  '#########',
];
assert(work(t1), 8);

const t2 = [
  '########################',
  '#f.D.E.e.C.b.A.@.a.B.c.#',
  '######################.#',
  '#d.....................#',
  '########################',
]
assert(work(t2), 86);

const t3 = `
  ########################
  #...............b.C.D.f#
  #.######################
  #.....@.a.B.c.d.A.e.F.g#
  ########################`.trim().split('\n');
assert(work(t3), 132)

const t4 = `
########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`.trim().split('\n');
assert(work(t4), 81)

const t5 = `
#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`.trim().split('\n');
assert(work(t5), 136)

assert(work(file('input.txt')), 1)
