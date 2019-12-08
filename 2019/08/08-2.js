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

  const result = Array(y)
    .fill(0)
    .map(() => Array(x).fill(0));

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      let n = 0;
      while (layers[n][j * x + i] === "2") {
        n++;
      }

      result[j][i] = layers[n][j * x + i] === "1" ? "#" : " ";
    }
  }

  return result.map(line => line.join(""));
};

const i1 = "0222112222120000";
assert(solve(i1, 2, 2), [" #", "# "]);

const i2 = file("./08.txt")[0];
console.log(solve(i2, 25, 6).join("\n"));
