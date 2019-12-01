const fs = require("fs");

const file = fs
  .readFileSync("./15.txt")
  .toString()
  .split("\n")
  .map(parse);

function parse(line) {
  const data = line.replace(/[,:]/g, "").split(" ");
  return {
    name: data[0],
    props: [
      parseInt(data[2], 10),
      parseInt(data[4], 10),
      parseInt(data[6], 10),
      parseInt(data[8], 10)
    ],
    cals: parseInt(data[10], 10)
  };
}

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function solve(ingrs) {
  const results = [];

  const MAX = 0;
  let c = 0;
  let d = 0;
  for (let a = 0; a <= 100; a++) {
    console.log(".");
    for (let b = 0; b <= 100; b++) {
      for (let c = 0; c <= 100; c++) {
        for (let d = 0; d <= 100; d++) {
          if (a + b + c + d !== 100) {
            continue;
          }
          const amounts = [a, b, c, d];

          let score = 1;

          const calories = ingrs.reduce(
            (sum, ingr, i) => sum + ingr.cals * amounts[i],
            0
          );

          if (calories != 500) {
            continue;
          }

          for (propId in ingrs[0].props) {
            let propScore = 0;
            for (ingrId in ingrs) {
              const ingrScore = ingrs[ingrId].props[propId] * amounts[ingrId];
              propScore += ingrScore;
            }

            score *= Math.max(0, propScore);
          }
          results.push({ score, amounts });
        }
      }
    }
  }

  return results.sort((a, b) => a.score - b.score).pop();
}

const input = [
  "Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8",
  "Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3"
].map(parse);

assert(input, [
  { name: "Butterscotch", props: [-1, -2, 6, 3], cals: 8 },
  { name: "Cinnamon", props: [2, 3, -2, -1], cals: 3 }
]);

assert(solve(input).amounts, [40, 60, 0, 0]);

console.log(solve(file));
