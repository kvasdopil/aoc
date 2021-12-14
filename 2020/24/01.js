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

const work = (lines) => {
  const res = {};
  for (const [x, y] of lines.map(process)) {
    const id = `${x}:${y}`;
    if (!res[id]) res[id] = false;
    res[id] = !res[id];
  }
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