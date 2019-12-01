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
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1
};

for (const sue of file) {
  let fail = false;
  for (const prop in props) {
    if (sue[prop] !== undefined && sue[prop] !== props[prop]) {
      fail = true;
      break;
    }
  }

  if (!fail) {
    console.log(sue);
  }
}
