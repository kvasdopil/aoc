const { assert, file } = require("../../utils");

const parse = lines =>
  lines.map(line => {
    const l = line
      .replace(/[<>,]/g, "")
      .replace(/=/g, " ")
      .split(" ")
      .map(i => parseInt(i, 10));

    return {
      x: l[1],
      y: l[3],
      z: l[5],
      vx: 0,
      vy: 0,
      vz: 0
    };
  });

const step = data => {
  for (const i of data) {
    for (const j of data) {
      if (i != j) {
        i.vx += Math.sign(j.x - i.x);
        i.vy += Math.sign(j.y - i.y);
        i.vz += Math.sign(j.z - i.z);
      }
    }
  }

  for (const i of data) {
    i.x += i.vx;
    i.y += i.vy;
    i.z += i.vz;
  }
};

const solve = text => {
  const data = parse(text);
  const first = data.map(item => ({ ...item }));

  let i = 1;
  while (true) {
    i++;
    step(data);

    if (
      data.every(
        (item, n) =>
          item.x === first[n].x &&
          item.y === first[n].y &&
          item.z === first[n].z
      )
    ) {
      return i;
    }

    i % 10000000 === 0 ? console.log(i) : null;
  }
};

const i1 = [
  "<x=-1, y=0, z=2>",
  "<x=2, y=-10, z=-7>",
  "<x=4, y=-8, z=8>",
  "<x=3, y=5, z=-1>"
];
assert(solve(i1), 2772);

const i2 = [
  "<x=-8, y=-10, z=0>",
  "<x=5, y=5, z=10>",
  "<x=2, y=-7, z=3>",
  "<x=9, y=-8, z=-3>"
];
assert(solve(i2), 4686774924);

const i3 = [
  "<x=4, y=1, z=1>",
  "<x=11, y=-18, z=-1>",
  "<x=-2, y=-10, z=-4>",
  "<x=-7, y=-2, z=14>"
];
console.log(solve(i3));
