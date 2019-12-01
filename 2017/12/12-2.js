const fs = require("fs");

function parse(line) {
  return line
    .replace(" <-> ", ",")
    .split(",")
    .slice(1)
    .map(i => parseInt(i, 10));
}

function solve(input, start = 0) {
  const group = [start];

  while (true) {
    const len = group.length;
    for (const i of group) {
      const targets = input[i];
      for (const t of targets) {
        if (group.indexOf(t) === -1) {
          group.push(t);
        }
      }
    }
    if (group.length === len) {
      return group;
    }
  }
}

function process(input) {
  const results = {};
  for (let i = 0; i < input.length; i++) {
    const res = solve(input, i)
      .sort()
      .join();

    results[res] = true;
  }

  return Object.keys(results);
}

const testInput = [
  "0 <-> 2",
  "1 <-> 1",
  "2 <-> 0, 3, 4",
  "3 <-> 2, 4",
  "4 <-> 2, 3, 6",
  "5 <-> 6",
  "6 <-> 4, 5"
].map(parse);

console.log(process(testInput));

const file = fs
  .readFileSync("./12.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(process(file).length);
