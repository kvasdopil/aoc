const { file, assert, array3d } = require('../../utils')

const work = (lines) => {
  const items = lines
    .map(line => /(on|off) x=([0-9-]+)..([0-9-]+),y=([0-9-]+)..([0-9-]+),z=([0-9-]+)..([0-9-]+)$/.exec(line))
    .map(([, state, x1, x2, y1, y2, z1, z2]) => [
      state === 'on' ? 1 : 0,
      ...[x1, x2, y1, y2, z1, z2].map(a => 50 + parseInt(a, 10))
    ])
    .filter(([, ...args]) => args.every(a => a >= 0 && a <= 101));

  const area = array3d(101, 101, 101);
  items.forEach(([state, x1, x2, y1, y2, z1, z2]) => {
    for (let x = x1; x <= x2; x++)
      for (let y = y1; y <= y2; y++)
        for (let z = z1; z <= z2; z++)
          area[x][y][z] = state;
  });

  let res = 0;
  for (let x = 0; x <= 100; x++)
    for (let y = 0; y <= 100; y++)
      for (let z = 0; z <= 100; z++)
        res += area[x][y][z];

  return res;
}

const test = `
on x=-20..26,y=-36..17,z=-47..7
on x=-20..33,y=-21..23,z=-26..28
on x=-22..28,y=-29..23,z=-38..16
on x=-46..7,y=-6..46,z=-50..-1
on x=-49..1,y=-3..46,z=-24..28
on x=2..47,y=-22..22,z=-23..27
on x=-27..23,y=-28..26,z=-21..29
on x=-39..5,y=-6..47,z=-3..44
on x=-30..21,y=-8..43,z=-13..34
on x=-22..26,y=-27..20,z=-29..19
off x=-48..-32,y=26..41,z=-47..-37
on x=-12..35,y=6..50,z=-50..-2
off x=-48..-32,y=-32..-16,z=-15..-5
on x=-18..26,y=-33..15,z=-7..46
off x=-40..-22,y=-38..-28,z=23..41
on x=-16..35,y=-41..10,z=-47..6
off x=-32..-23,y=11..30,z=-14..3
on x=-49..-5,y=-3..45,z=-29..18
off x=18..30,y=-20..-8,z=-3..13
on x=-41..9,y=-7..43,z=-33..15
on x=-54112..-39298,y=-85059..-49293,z=-27449..7877
on x=967..23432,y=45373..81175,z=27513..53682
`.trim().split("\n");

assert(work(test), 590784);
assert(work(file('input.txt')), 611176);