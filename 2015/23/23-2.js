const fs = require("fs");

function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    process.exit(1);
  }
  console.log("PASS");
}

function parse(line) {
  const data = line.replace(",", "").split(" ");

  return { ins: data[0], arg: data[1], off: parseInt(data[2], 10) || 0 };
}

function solve(prog, aval = 0) {
  const reg = { a: aval, b: 0 };
  let i = 0;
  let ct = 0;

  while (i >= 0 && i < prog.length) {
    const { ins, arg, off } = prog[i];
    switch (ins) {
      case "hlf":
        reg[arg] = reg[arg] / 2;
        i++;
        break;
      case "tpl":
        reg[arg] = reg[arg] * 3;
        i++;
        break;
      case "inc":
        reg[arg] = reg[arg] + 1;
        i++;
        break;
      case "jmp":
        i += parseInt(arg, 10);
        break;
      case "jie":
        if (reg[arg] % 2 === 0) {
          i += off;
        } else {
          i++;
        }
        break;
      case "jio":
        if (reg[arg] === 1) {
          i += off;
        } else {
          i++;
        }
        break;
    }
  }
  return reg;
}

const testData = ["inc a", "jio a, +2", "tpl a", "inc a"].map(parse);
assert(testData, [
  { ins: "inc", arg: "a", off: 0 },
  { ins: "jio", arg: "a", off: 2 },
  { ins: "tpl", arg: "a", off: 0 },
  { ins: "inc", arg: "a", off: 0 }
]);

assert(solve(testData), { a: 2, b: 0 });

const file = fs
  .readFileSync("./23.txt")
  .toString()
  .split("\n")
  .map(parse);

console.log(solve(file, 1));
