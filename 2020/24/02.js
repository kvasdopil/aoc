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

    // console.log(dir, x, y)
  }
}

const step = tiles => {
  const active = tiles.filter()
}

const work = (lines) => {
  let tiles = lines.map(process);
  tiles = step(tiles);
  return Object.values(res).filter(a => a).length;
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

assert(process("esew"), [0, -1]);
assert(process("nwwswee"), [0, 0]);
assert(work(test), 10);
assert(work(file('input.txt')), 523);