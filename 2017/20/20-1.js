const { file } = require("../../utils");

const parse = (line, n) => {
  const data = line.split(/[=<>,]/).map(i => parseInt(i, 10));
  return {
    p: [data[2], data[3], data[4]],
    v: [data[8], data[9], data[10]],
    a: [data[14], data[15], data[16]],
    n
  };
};

const dist = vec => Math.abs(vec[0]) + Math.abs(vec[1]) + Math.abs(vec[2]);

const solve = input => {
  const data = input.map(parse);

  const diameter = data.reduce((prev, vec) => Math.max(prev, dist(vec.p)), 0);
  while (true) {
    for (const item of data) {
      item.v[0] += item.a[0];
      item.v[1] += item.a[1];
      item.v[2] += item.a[2];
      item.p[0] += item.v[0];
      item.p[1] += item.v[1];
      item.p[2] += item.v[2];
    }

    const dists = data.map(item => [dist(item.p), item.n]);
    dists.sort((a, b) => a[0] - b[0]);

    console.log(dists[0][1]);
  }
};

const pts = [
  "p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>",
  "p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>"
];

// console.log(solve(pts));

const text = file("./20.txt");
console.log(solve(text)); /// 253  low
