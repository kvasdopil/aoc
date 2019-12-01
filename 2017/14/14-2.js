const { hash } = require("./hash");
const { assert } = require("../../utils");

const toBits = key =>
  key
    .split("")
    .map(n => parseInt(n, 16))
    .map(n => n.toString(2))
    .map(n => n.padStart(4, "0"))
    .join("");

const buildMap = key => {
  const keys = Array(128)
    .fill(0)
    .map((val, index) => `${key}-${index}`)
    .map(hash)
    .map(toBits);

  return keys.join("").split("");
};

const fill = (map, n) => {
  if (map[n] !== "1") {
    return;
  }

  map[n] = "0";

  if (n % 128 > 0) {
    fill(map, n - 1);
  }
  if (n % 128 < 127) {
    fill(map, n + 1);
  }
  if (n >= 128) {
    fill(map, n - 128);
  }
  if (n <= 128 * 127) {
    fill(map, n + 128);
  }
};

const solve = key => {
  const map = buildMap(key);

  let ct = 0;
  while (true) {
    let n = map.indexOf("1");
    if (n < 0) {
      return ct;
    }
    ct += 1;
    fill(map, n);
  }
};

assert(solve("flqrgnkx"), 1242);
console.log(solve("hwlqcszp"));
