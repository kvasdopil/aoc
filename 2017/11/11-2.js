const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function dist(x, y) {
  if (x == -y) {
    return Math.abs(x);
  }
  return Math.abs(x) + Math.abs(y);
}

function solve(steps) {
  const input = steps.split(",");
  let x = 0;
  let y = 0;

  let m = 0;

  while (input.length) {
    const i = input.shift();
    switch (i) {
      case "s":
        y--;
        break;
      case "n":
        y++;
        break;
      case "ne":
        x++;
        break;
      case "nw":
        y++;
        x--;
        break;
      case "se":
        y--;
        x++;
        break;
      case "sw":
        x--;
        break;
    }

    const d = dist(x, y);
    if (d >= m) {
      m = d;
    }
  }

  return m;
}

// assert(solve("ne,ne,ne"), 3);
// assert(solve("ne,ne,sw,sw"), 0);
// assert(solve("ne,ne,s,s"), 2);
// assert(solve("se,sw,se,sw,sw"), 3);

const file = fs.readFileSync("./11.txt").toString();

console.log(solve(file));
