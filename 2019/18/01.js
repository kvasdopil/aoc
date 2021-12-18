const { assert } = require('../../utils');

// 

// const findPaths = (input, start) => {
//   const result = input.map(line => line.map(ch => ch === '#' ? '#' : '.'));


//   const [x, y] = start;
//   result[y][x] = 0;

//   let i = 0;

//   while (true) {
//     let working = false;
//     result.forEach((line, y) =>
//       line.forEach((ch, x) => {
//         if (ch !== i) {
//           return;
//         }
//         n.forEach(([xx, yy]) => {
//           if (result[y + yy][x + xx] === '.') {
//             working = true;
//             result[y + yy][x + xx] = i + 1;
//           }
//         })
//       })
//     )
//     if (!working) {
//       break;
//     }
//     i++;
//   }

//   return result;
// }

const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
// const wayfinder = (getFn, doneFn, start) => {
//   let [x, y] = start;
//   const map = {};
//   map[`${x},${y}`] = { x, y, val: 0 };

//   for (const pt in map) {
//     if (map[pt].val === ct) {
//       directions.forEach(([xx, yy]) => {
//         const x2 = x + xx;
//         const y2 = y + yy;
//         const val = map[`${x2},${y2}`] || getFn(x2, y2);
//         if (val === true) {
//           if (doneFn(x2, y2)) {
//             map[`${x2},${y2}`] = ct;
//           } else {
//             map[`${x2},${y2}`] = ct + 1;
//           }
//         }
//       })
//     }
//   }
// }

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

const solve = (input, prefix, s) => {
  let map = input.map(line => line.split(""));
  const path = [];

  let ways = findWays(map)
    .map(([x, y, letter, steps]) => {
      const door = letter.toUpperCase();

      const copy = map.map(line => line.map(ch => {
        if (ch === door) return '.';
        if (ch === letter) return '@';
        if (ch === '@') return '.';
        return ch;
      }));
      return solve(copy, prefix + letter, steps + s);
    });


}

const i1 = [
  '#########',
  '#b.A.@.a#',
  '#########',
];

assert(solve(i1), "ab");

const i2 = [
  '########################',
  '#f.D.E.e.C.b.A.@.a.B.c.#',
  '######################.#',
  '#d.....................#',
  '########################',
]

assert(solve(i2), "abcdef");
