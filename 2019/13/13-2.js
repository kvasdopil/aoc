const { assert, file } = require("../../utils");
const { parse, context, execute } = require("./intcode.js");

const code = parse(file("./13.txt")[0]);

const tiles = {
  0: " ",
  1: "#",
  2: ".",
  3: "-",
  4: "o"
};

const print = map => {
  console.log(map["-1,0"]);
  for (let y = 0; y < 23; y++) {
    const line = [];
    for (let x = 0; x < 50; x++) {
      line.push(tiles[map[`${x},${y}`]]);
    }
    console.log(line.join(""));
  }
};

const build = code => {
  const ct = context(code, [0]);
  ct.mem[0] = 2;

  let ball19;
  let ball20;
  let pos;

  const map = {};
  while (true) {
    const x = execute(ct);
    if (x === undefined) {
      return map;
    }
    const y = execute(ct);
    const t = execute(ct);

    map[`${x},${y}`] = t;
    if (t === 3) {
      pos = x;
      console.log("y", y);
    }
    if (t === 4) {
      if (y === 19) {
        ball19 = x;
      }
      if (y === 20) {
        ball20 = x;
      }
      // console.log(ball - pos);
      ct.input.push(0);
      // pos += Math.sign(ball - pos);
      print(map);
    }
  }
};

const map = build(code);
