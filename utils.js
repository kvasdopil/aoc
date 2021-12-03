const assert = (a, b = true) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    console.log("test passed");
  } else {
    console.log("test failed", a, "!=", b);
  }
};

const file = name =>
  require("fs")
    .readFileSync(name)
    .toString()
    .split("\n");

const uniq = input =>
  Object.keys(input.reduce((res, a) => ({ ...res, [a]: 1 }), {}));

module.exports = { assert, file, uniq };
