const { file, assert } = require('../../utils')

const splitX = ([ax1, ax2, ...rest], x) => [
  (ax1 > x) ? null : [ax1, x, ...rest],
  (ax2 <= x) ? null : [x + 1, ax2, ...rest],
];

const splitAlongX = (items, depth = 0) => {
  const result = [];

  if (!items.length) return 0;

  if (depth === 2) {
    // console.log(items);
  }

  if (depth === 3) {
    return items.pop().pop();
  }

  const xs = [
    ...items.map(([[x1]]) => x1),
    ...items.map(([[, x2]]) => x2 - 1)
  ].sort((a, b) => a - b);

  let list = items;
  while (xs.length) {
    const left = [];
    const right = [];
    const x = xs.shift();
    list.map(([sq, mul]) => [splitX(sq, x), mul]).forEach(([[a, b], mul]) => {
      if (a) left.push([a, mul]);
      if (b) right.push([b, mul]);
    })
    result.push(left);
    list = right;
  }
  result.push(list);

  let sum = 0;


  result.map(list => {
    const li = list.map(([[x1, x2, ...rest], mul]) => [rest, mul * (x2 - x1 + 1)]);
    sum += splitAlongX(li, depth + 1);
  });

  return sum;
}

const work = (lines) => {
  const items = lines
    .map(line => /(on|off) x=([0-9-]+)..([0-9-]+),y=([0-9-]+)..([0-9-]+),z=([0-9-]+)..([0-9-]+)$/.exec(line))
    .map(([, state, x1, x2, y1, y2, z1, z2]) => [
      ...[x1, x2, y1, y2, z1, z2].map(a => parseInt(a, 10)),
      state === 'on' ? 1 : 0,
    ]);

  const xs = [
    ...items.map(([x1]) => x1),
    ...items.map(([, x2]) => x2 + 1)
  ].sort((a, b) => a - b);
  const ys = [
    ...items.map(([, , y1]) => y1),
    ...items.map(([, , , y2]) => y2 + 1)
  ].sort((a, b) => a - b);
  const zs = [
    ...items.map(([, , , , z1]) => z1),
    ...items.map(([, , , , , z2]) => z2 + 1)
  ].sort((a, b) => a - b);

  let sum = 0;


  for (let i = 1; i < xs.length; i++)
    for (let j = 1; j < ys.length; j++)
      for (let k = 1; k < zs.length; k++) {
        let on = 0;
        for (const [x1, x2, y1, y2, z1, z2, mul] of items) {
          const [xa, ya, za] = [xs[i - 1], ys[j - 1], zs[k - 1]];
          const [xb, yb, zb] = [xs[i], ys[j], zs[k]];
          if (xa == xb || ya == yb || za == zb) continue;
          if (x1 <= xa && xa < x2 && y1 <= ya && ya < y2 && z1 <= za && za < z2) {
            // console.log(xa, xb);
            // console.log(ya, yb);
            // console.log(za, zb);
            on = mul * (xb - xa) * (zb - za) * (yb - ya);
            // console.log('on', on)
          }
        }
        sum += on;
      }

  return sum;
}

const t1 = 'on x=0..99,y=0..99,z=0..99'.trim().split('\n');
assert(work(t1), 1000000);

const t2 = `
on x=0..99,y=0..99,z=0..99
on x=0..50,y=0..99,z=0..99
`.trim().split('\n');
assert(work(t2), 1000000);

const t3 = `
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
`.trim().split("\n");

assert(work(t3), 590784);
// assert(work(file('test.txt')), 2758514936282235);
// assert(work(file('input.txt')), 1752);
