const { assert } = require('../../utils');

const n = [[-1, 0], [1, 0], [0, 1], [0, -1]];

const findPaths = (input, start) => {
  const result = input.map(line => line.map(ch => ch === '#' ? '#' : '.'));


  const [x, y] = start;
  result[y][x] = 0;

  let i = 0;

  while (true) {
    let working = false;
    result.forEach((line, y) =>
      line.forEach((ch, x) => {
        if (ch !== i) {
          return;
        }
        n.forEach(([xx, yy]) => {
          if (result[y + yy][x + xx] === '.') {
            working = true;
            result[y + yy][x + xx] = i + 1;
          }
        })
      })
    )
    if (!working) {
      break;
    }
    i++;
  }

  return result;
}

const solve = (input) => {
  const doors = {};
  const keys = {};
  const items = {};

  const map = input.map(line => line.split(''));

  map.forEach((line, y) =>
    line.forEach((ch, x) => {
      if (ch >= 'A' && ch <= 'Z') {
        doors[ch] = [x, y];
      } else if (ch >= 'a' && ch <= 'z') {
        keys[ch] = [x, y];
      } else {
        items[ch] = [x, y];
      }
    })
  );

  let totalSteps = 0;
  let pos = items['@'];
  while (true) {
    for (let door in doors) {
      const [x, y] = doors[door];
      map[y][x] = '#';
    }
    const paths = findPaths(map, pos);
    const nextPoints = Object.keys(keys)
      .map(key => {
        const [x, y] = keys[key];
        return {
          key,
          steps: paths[y][x],
        }
      })
      .filter(({ steps }) => steps !== '.');

    console.log(nextPoints.map(({ key }) => key));

    const nextPoint = nextPoints
      .sort((a, b) => a.steps - b.steps)
      .pop();

    const nextKey = nextPoint.key;
    totalSteps += nextPoint.steps;

    console.log('moving to', nextKey, keys[nextKey]);
    pos = keys[nextKey];

    if (doors[nextKey.toUpperCase()]) {
      const [x, y] = doors[nextKey.toUpperCase()];
      map[y][x] = '.';
      delete doors[nextKey.toUpperCase()];
    } else {
      return totalSteps;
    }

    delete keys[nextKey];
  }
}

const i1 = [
  '#########',
  '#b.A.@.a#',
  '#########',
];

assert(solve(i1), 8);

const i2 = [
  '########################',
  '#f.D.E.e.C.b.A.@.a.B.c.#',
  '######################.#',
  '#d.....................#',
  '########################',
]

console.log(solve(i2));