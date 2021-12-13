const { file, assert } = require('../../utils')

const parse = (lines) => {
  const [a, b] = lines.join("\n").split("\n\n");
  return {
    dots: a.split("\n").map(line => line.split(",").map(a => parseInt(a, 10))),
    folds: b.split("\n").map(line => /([xy])=([0-9]+)/.exec(line)).map(([, coord, val]) => [coord, parseInt(val, 10)]),
  }
}

const work = (lines) => {
  const { dots, folds } = parse(lines);

  for (const [coord, val] of folds) {
    for (dot of dots) {
      const [x, y] = dot;
      if (coord === 'y' && y > val) dot[1] = val - y + val;
      if (coord === 'x' && x > val) dot[0] = val - x + val;
    }
  }

  const [maxX, maxY] = dots.reduce(([ax, ay], [bx, by]) => [Math.max(ax, bx), Math.max(ay, by)], [0, 0]);
  const field = Array.from(Array(maxY + 1)).map(() => Array.from(Array(maxX + 1).fill(' ')));

  dots.forEach(([x, y]) => field[y][x] = '#');

  console.log(field.map(line => line.join('')).join('\n'))
}

const test = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`.trim().split("\n");

work(test);
work(file('input.txt'));