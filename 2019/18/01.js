const { assert, file, permutation } = require('../../utils');

const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
const chm = (ch) => {
  if (ch === '#') return ' ';
  return ch;
}
const print = map => console.log(map.map(line => line.map(chm).join('')).join("\n"))

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

const optimize = (map) => {
  const o = () => {
    for (let y = 1; y < map.length - 1; y++)
      for (let x = 1; x < map[0].length - 1; x++) {
        const walls = directions
          .map(([dx, dy]) => map[y + dy][x + dx])
          .filter(val => val === '#')
          .length;
        if (walls === 3 && (map[y][x] === '.' || (map[y][x] >= 'A' && map[y][x] <= 'Z'))) {
          map[y][x] = '#';
          return true;
        }
      }
  }

  while (o()) {
    //    print(map);
  }
  print(map);
}

const work = (input, limit = 999999) => {
  let map = input.map(line => line.split(""));
  optimize(map);
  let min = 999999;
  while (true) {
    map = input.map(line => line.split(""));
    let path = '';
    let len = 0;

    while (true) {
      const res = solve({ map, limit }).sort(([, a], [, b]) => a - b);

      const n = Math.floor(Math.random() * res.length / 50);
      const [[prefix, steps]] = res[n];
      path += prefix;
      len += steps;

      if (prefix.length < limit) break;

      for (const letter of prefix.split(""))
        map = applyKey(map, letter);
    }

    if (len < min) {
      console.log(path, len);
      min = len;
    }
  }
  return len;
}

const solve = ({ map, prefix = "", steps = 0, limit }) => {
  const result = [];


  let ways = findWays(map);
  if (ways.length === 0) return [[[prefix, steps]]];

  for (const [x, y, letter, s] of ways) {
    if (limit === 0) {
      result.push([[prefix + letter, steps + s]]);
    } else {
      const copy = applyKey(map, letter);
      for (const next of solve({ map: copy, prefix: prefix + letter, steps: steps + s, limit: limit - 1 })) {
        result.push(next);
      }
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
// assert(work(t1), 8);

const t2 = [
  '########################',
  '#f.D.E.e.C.b.A.@.a.B.c.#',
  '######################.#',
  '#d.....................#',
  '########################',
]
// assert(work(t2), 86);

const t3 = `
  ########################
  #...............b.C.D.f#
  #.######################
  #.....@.a.B.c.d.A.e.F.g#
  ########################`.trim().split('\n');
// assert(work(t3), 132)

const t4 = `
########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`.trim().split('\n');
// assert(work(t4), 81)

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
// assert(work(t5, 2), 136)

assert(work(file('input.txt'), 4), 1)

// 6000 too high