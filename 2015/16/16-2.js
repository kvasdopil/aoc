const fs = require("fs");

const file = fs
  .readFileSync("./16.txt")
  .toString()
  .split("\n")
  .map(parse);

function parse(line) {
  const data = line.replace(/[:,]/g, "").split(" ");

  const res = {};
  res.Sue = data[1];
  res[data[2]] = parseInt(data[3], 10);
  res[data[4]] = parseInt(data[5], 10);
  res[data[6]] = parseInt(data[7], 10);
  return res;
}

const props = {
  children: 3,
  samoyeds: 2,
  akitas: 0,
  vizslas: 0,
  cars: 2,
  perfumes: 1
};

// goldfish: 5,
// pomeranians: 3,
//  trees: 3,
// cats: 7,

for (const sue of file) {
  let fail = false;
  for (const prop in props) {
    if (sue[prop] !== undefined && sue[prop] !== props[prop]) {
      fail = true;
      break;
    }
  }

  if (sue.goldfish !== undefined && sue.goldfish >= 5) {
    continue;
  }
  if (sue.pomeranians !== undefined && sue.pomeranians >= 3) {
    continue;
  }
  if (sue.trees !== undefined && sue.trees <= 3) {
    continue;
  }
  if (sue.cats !== undefined && sue.cats <= 7) {
    continue;
  }

  if (!fail) {
    console.log(sue);
  }
}
