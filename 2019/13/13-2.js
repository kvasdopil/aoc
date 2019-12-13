const { assert, file } = require("../../utils");
const { parse, context, execute } = require("./intcode.js");

const code = parse(file("./13.txt")[0]);

const build = code => {
  const ct = context(code, []);
  const map = {};
  while (true) {
    const x = execute(ct);
    if (x === undefined) {
      return map;
    }
    const y = execute(ct);
    const t = execute(ct);
    map[`${x},${y}`] = t;
  }
};

const tiles = {
  0: " ",
  1: "#",
  2: ".",
  3: "-",
  4: "o"
};

const map = build(code);
for (let y = 0; y < 23; y++) {
  const line = [];
  for (let x = 0; x < 50; x++) {
    line.push(tiles[map[`${x},${y}`]]);
  }
  console.log(line.join(""));
}
