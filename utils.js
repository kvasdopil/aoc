const assert = (a, b) =>
  console.log(a === b ? "test passed" : `test failed ${a} != ${b}`);

const file = name =>
  require("fs")
    .readFileSync(name)
    .toString()
    .split("\n");

module.exports = { assert, file };
