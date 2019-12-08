const { assert, file } = require("../../utils");

const numd = (layer, digit) => {
  let result = 0;
  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === digit) {
      result++;
    }
  }
  return result;
};

const solve = (data, x, y) => {
  const len = x * y;
  let layers = [];
  for (let p = 0; p < data.length; p += len) {
    layers.push(data.substring(p, p + len));
  }

  let minn = 0;
  let min = len;
  layers.forEach((layer, n) => {
    const val = numd(layer, "0");
    if (val < min) {
      min = val;
      minn = n;
    }
  });

  return numd(layers[minn], "1") * numd(layers[minn], "2");
};

const i1 = "123456789012";
assert(solve(i1, 3, 2), 1);

const i2 = file("./08.txt")[0];
console.log(solve(i2, 25, 6));
