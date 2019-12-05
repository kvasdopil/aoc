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

  while (true) {
    for (const item of data) {
      item.v[0] += item.a[0];
      item.v[1] += item.a[1];
      item.v[2] += item.a[2];
      item.p[0] += item.v[0];
      item.p[1] += item.v[1];
      item.p[2] += item.v[2];
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (data[i].removed) {
          continue;
        }
        if (data[j].removed) {
          continue;
        }
        if (data[i] === data[j]) {
          continue;
        }
        if (
          data[i].p[0] === data[j].p[0] &&
          data[i].p[1] === data[j].p[1] &&
          data[i].p[2] === data[j].p[2]
        ) {
          data[i].collide = true;
        }
      }
    }

    data.forEach(data => (data.removed = data.removed || data.collide));

    console.log(data.filter(item => !item.removed).length);
  }
};

const text = file("./20.txt");
console.log(solve(text));
