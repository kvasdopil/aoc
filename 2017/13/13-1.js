function parse(line) {
  const data = line.replace(":", "").split(" ");
  return { layer: data[0], val: parseInt(data[1], 10) };
}

function convert(input) {
  const max = input.reduce((a, item) => Math.max(a, item.layer), 0);

  const data = Array(max + 1).fill(0);
  for (const inp of input) {
    data[inp.layer] = inp.val;
  }

  return data;
}

function solve2(input) {
  const layers = convert(input);
  const positions = layers.map(() => 0);
  let sum = 0;

  const pos = (i, p) => {
    const max = (i + 1) % (2 * layers[p] - 2);
    const m2 = 2 * layers[p] - 2 - (i % (2 * layers[p] - 2)) - 1;
    return Math.min(max, m2);
  };

  for (let i = 0; i < positions.length; i++) {
    if (layers[i]) {
      const val = pos(i - 1, i);
      if (val === 0) {
        sum += i * layers[i];
      }
    }
  }

  return sum;
}

const testInput = ["0: 3", "1: 2", "4: 4", "6: 4"].map(parse);

console.log(solve2(testInput));

const file = require("fs")
  .readFileSync("./13.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(solve2(file));
