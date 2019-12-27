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

  const prog = execute(ct);

  let done = false;
  const map = {};
  let ball = { x: 0, y: 0 };
  let pad = { x: 0, y: 0 };
  let tgt = 0;

  while (true) {
    while (ct.output.length) {
      const x = ct.output.shift();
      const y = ct.output.shift();
      const t = ct.output.shift();

      if (t === 3) {
        pad = { x, y };
      }
      if (t === 4) {
        if (y === ball.y + 1) {
          const dx = ball.x - x;
          const he = 20 - y;
          tgt = x - dx * he;
        } else {
          tgt = x;
        }
        ball = { x, y };
      }

      map[`${x},${y}`] = t;
    }
    print(map);

    if (done) {
      return;
    }

    const sign = Math.sign(tgt - pad.x);
    done = prog.next(sign).done;
  }
};

const map = build(code);
