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
const wayfinder = (getFn, doneFn, start) => {
  let [x, y] = start;
  const map = {};
  map[`${x},${y}`] = { x, y, val: 0 };

  for (const pt in map) {
    if (map[pt].val === ct) {
      directions.forEach(([xx, yy]) => {
        const x2 = x + xx;
        const y2 = y + yy;
        const val = map[`${x2},${y2}`] || getFn(x2, y2);
        if (val === true) {
          if (doneFn(x2, y2)) {
            map[`${x2},${y2}`] = ct;
          } else {
            map[`${x2},${y2}`] = ct + 1;
          }
        }
      })
    }
  }
}

const solve = (input) => {

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
