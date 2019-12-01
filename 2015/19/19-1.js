const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function parse(line) {
  const data = line.replace(/[=>]/g, "").split(" ");
  return { from: data[0], to: data[2] };
}

function allTransforms(input, transform) {
  const result = [];
  const re = new RegExp(transform.from, "g");
  while (true) {
    const match = re.exec(input);
    if (!match) {
      break;
    }

    const out = [
      input.slice(0, match.index),
      transform.to,
      input.slice(match.index + transform.from.length)
    ].join("");

    result.push(out);
  }

  return result;
}

const uniq = input =>
  Object.keys(input.reduce((res, a) => ({ ...res, [a]: 1 }), {}));

function solve(input, data) {
  let result = [];
  for (const transform of data) {
    result = [...result, ...allTransforms(input, transform)];
  }

  return uniq(result);
}

// ===========================================================================

const file = fs
  .readFileSync("./19.txt")
  .toString()
  .split("\n");

const testData = ["H => HO", "H => OH", "O => HH"].map(parse);
assert(solve("HOH", testData), ["HOOH", "HOHO", "OHOH", "HHHH"]);

const input = file.pop();
file.pop();

const data = file.map(parse);
console.log(solve(input, data).length);
