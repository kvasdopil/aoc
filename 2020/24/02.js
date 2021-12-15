const { file, assert } = require('../../utils')

const process = (cmd) => {
  let line = cmd;
  let dir = '';
  let [x, y] = [0, 0];
  while (true) {
    const res = /^(e|w|se|sw|nw|ne)(.*)$/.exec(line);
    if (!res) return [x, y];
    [, dir, line] = res;

    if (dir === 'e') x++;
    if (dir === 'w') x--;
    if (dir === 'se') y--;
    if (dir === 'nw') y++;
    if (dir === 'ne') { y++; x++ };
    if (dir === 'sw') { y--; x-- };
  }
}

NS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [1, 1],
  [-1, -1],
]

const isActive = (tiles, x, y) => tiles.findIndex(([X, Y]) => X === x && Y === y) >= 0;
const neighbours = (tiles, x, y) => NS.filter(([dx, dy]) => isActive(tiles, x + dx, y + dy)).length;

const uniq = (a) => {
  const u = {};
  return a.filter(([x, y]) => {
    const key = `${x}:${y}`;
    if (u[key]) return false;
    u[key] = 1;
    return true;
  });
}

const print = (n) => {
  let yy = 0;
  for (let y = 10; y > -10; y--) {
    yy++;
    let line = [" ".repeat(yy)]
    for (let x = -5; x < 10; x++) {
      const a = n.find(([X, Y]) => X === x && Y === y);
      if (!a) {
        line.push(' ');
        continue;
      }
      const [, , ac, ne] = a;
      if (ac) {
        line.push((ne === 0 || ne > 2) ? ne : ne);
      } else {
        line.push((ne === 2 ? '+' : '.'));
      }
    }
    console.log(line.join(' '));
  }
  console.log('');
}

const step = tiles => {
  const nexts = [...tiles];
  tiles.forEach(([x, y]) => NS.forEach(([dx, dy]) => nexts.push([dx + x, dy + y])));
  const n = uniq(nexts)
    .map(([x, y]) => [x, y, isActive(tiles, x, y), neighbours(tiles, x, y)])

  // print(n);

  const re = n.filter(([x, y, a, n]) => {
    if (a) return (n === 1 || n === 2);
    return (n === 2);
  }).map(([x, y]) => [x, y]);

  return re;
}

const work = (lines, count) => {
  let tiles = [];
  for (const [x, y] of lines.map(process)) {
    const tile = tiles.find(([X, Y]) => x === X && y === Y);
    if (tile) {
      tiles = tiles.filter(([X, Y]) => !(x === X && y === Y));
    } else {
      tiles.push([x, y]);
    }
  }

  while (count) {
    console.log(count);
    tiles = step(tiles);
    count--;
  }
  return tiles.length;
}

const test = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`.trim().split("\n");

assert(work(test, 1), 15);
assert(work(test, 2), 12);
assert(work(test, 3), 25);
assert(work(test, 4), 14);
assert(work(test, 5), 23);
assert(work(test, 6), 28);
assert(work(test, 7), 41);
assert(work(test, 8), 37);
assert(work(test, 9), 49);
assert(work(test, 10), 37);
assert(work(test, 100), 2208);
assert(work(file('input.txt'), 100), 523);