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
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < i; j++) {
      let a = Math.sign(data[j].x - data[i].x);
      let b = Math.sign(data[j].y - data[i].y);
      let c = Math.sign(data[j].z - data[i].z);
      data[i].vx += a;
      data[i].vy += b;
      data[i].vz += c;
      data[j].vx -= a;
      data[j].vy -= b;
      data[j].vz -= c;
    }
  }

  for (const i of data) {
    i.x += i.vx;
    i.y += i.vy;
    i.z += i.vz;
  }
};

const measure = (text, fld) => {
  const data = parse(text);

  let i = 0;
  while (true) {
    i++;
    step(data);

    if (
      data[0][fld] === 0 &&
      data[1][fld] === 0 &&
      data[2][fld] === 0 &&
      data[3][fld] === 0
    ) {
      return i;
    }
  }
};

const solve = text => {
  const x = measure(text, "vx");
  const y = measure(text, "vy");
  const z = measure(text, "vz");

  let i = 0;
  const n = Math.min(x, Math.min(y, z));
  while (true) {
    i += n;
    if (i % x === 0 && i % y === 0 && i % z === 0) {
      return 2 * i;
    }
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
