const { assert, file } = require("../../utils");

const step = (prev, cmd) => {
  const len = prev.length;
  if (cmd[0] === "s") {
    let b = len - cmd[1];
    return prev.map((val, n) => prev[(n + b) % len]);
  }
  if (cmd[0] === "x") {
    const a = cmd[1];
    const b = cmd[2];

    const n = prev[a];
    prev[a] = prev[b];
    prev[b] = n;
    return prev;
  }
  if (cmd[0] === "p") {
    const a = prev.indexOf(cmd[1]);
    const b = prev.indexOf(cmd[2]);

    const n = prev[a];
    prev[a] = prev[b];
    prev[b] = n;
    return prev;
  }
  return prev;
};

const solve = (prog, input, limit) => {
  const data = input.split("");
  for (let n = 0; n < limit; n++) {
    data = prog.reduce(step, data);
    if (n % 100 === 0) {
      console.log(n);
    }
  }
  return data.join("");
};

assert(step("abcde".split(""), ["s", 3]), "cdeab".split(""));
assert(step("abcde".split(""), ["s", 1]), "eabcd".split(""));
assert(step("eabcd".split(""), ["x", 3, 4]), "eabdc".split(""));
assert(step("eabdc".split(""), ["p", "e", "b"]), "baedc".split(""));

const parse = cmd => {
  const c = cmd[0];
  if (c === "s") {
    return [c, parseInt(cmd.substring(1), 10)];
  }
  if (c === "x") {
    const args = cmd
      .substring(1)
      .split("/")
      .map(a => parseInt(a, 10));
    return [c, ...args];
  }
  if (c === "p") {
    return [c, cmd[1], cmd[2]];
  }
};

assert(
  solve(
    [
      ["s", 1],
      ["x", 3, 4],
      ["p", "e", "b"]
    ],
    "abcde",
    2
  ),
  "ceadb"
);

const prog = file("./16.txt")
  .toString()
  .split(",")
  .map(parse);
console.log(solve(prog, "abcdefghijklmnop", 1000000000));
