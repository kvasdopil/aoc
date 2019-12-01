const { hash } = require("./hash");
const { assert } = require("../../utils");

const toBits = key =>
  key
    .split("")
    .map(n => parseInt(n, 16))
    .map(n => n.toString(2))
    .map(n => n.padStart(4, "0"))
    .join("");

const solve = key => {
  const keys = Array(128)
    .fill(0)
    .map((val, index) => `${key}-${index}`)
    .map(hash)
    .map(toBits);

  return keys
    .join("")
    .split("")
    .filter(n => n === "1").length;
};

assert(solve("flqrgnkx"), 8108);
console.log(solve("hwlqcszp"));
