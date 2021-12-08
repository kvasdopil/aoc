const { file, assert } = require('../../utils')

const neighbours = (field, x, y, z, w) => {
  let sum = 0;
  for (let dw = -1; dw <= 1; dw++)
    for (let dz = -1; dz <= 1; dz++)
      for (let dy = -1; dy <= 1; dy++)
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0 && dz === 0 && dw === 0) continue;
          if (!field[w + dw]) continue;
          if (!field[w + dw][z + dz]) continue;
          if (!field[w + dw][z + dz][y + dy]) continue;
          if (field[w + dw][z + dz][y + dy][x + dx] === '#') sum++;
        }
  return sum;
}

const step = (field) =>
  field.map((cube, w) =>
    cube.map((slice, z) =>
      slice.map((line, y) =>
        line.map((val, x) => {
          const n = neighbours(field, x, y, z, w);
          if (val === '#') return (n === 2 || n === 3) ? '#' : '.';
          return (val === '.' && n === 3) ? '#' : '.';
        })
      )
    )
  );

const work = (lines, size) => {
  let field = Array.from(Array(size))
    .map(() => Array.from(Array(size))
      .map(() => Array.from(Array(size))
        .map(() => Array.from(Array(size).fill('.'))
        )
      )
    );

  const startw = size / 2;
  const startz = size / 2;
  const startx = size / 2 - Math.round(lines.length / 2);
  const starty = size / 2 - Math.round(lines.length / 2);
  lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
      if (char === '#')
        field[startw][startz][starty + y][startx + x] = '#';
    })
  });

  for (let cycle = 0; cycle < 6; cycle++) {
    field = step(field);
    // console.log('.');
  }

  // for (const w in field)
  //   for (const z in field[w]) {
  //     console.log();
  //     console.log(z, w);
  //     console.log(field[w][z].map(line => line.join('')).join('\n') + "\n");
  //   }

  return field.map(
    cube => cube.map(
      slice => slice.map(
        line => line.join('')
      ).join('')
    ).join('')
  ).join('').split('').filter(a => a === '#').length;
}

const test = `.#.
..#
###`.trim().split("\n");

assert(work(test, 16), 848);
assert(work(file('input.txt'), 18), 2292);