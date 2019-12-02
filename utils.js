const assert = (a, b) =>
  console.log(
    JSON.stringify(a) === JSON.stringify(b)
      ? "test passed"
      : `test failed ${a} != ${b}`
  );

const file = name =>
  require("fs")
    .readFileSync(name)
    .toString()
    .split("\n");

module.exports = { assert, file };
