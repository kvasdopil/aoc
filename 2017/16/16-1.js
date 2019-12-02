const { assert, file } = require("../../utils");

const solve = (prog, input) =>
  prog.reduce((prev, cmd) => {
    if (cmd[0] === "s") {
      const n = prev.length - parseInt(cmd.substring(1), 10);
      return prev.substring(n) + prev.substring(0, n);
    }
    if (cmd[0] === "x") {
      const args = cmd
        .substring(1)
        .split("/")
        .map(n => parseInt(n, 10));

      const res = prev.split("");
      res[args[0]] = prev[args[1]];
      res[args[1]] = prev[args[0]];
      return res.join("");
    }
    if (cmd[0] === "p") {
      const a = prev.indexOf(cmd[1]);
      const b = prev.indexOf(cmd[3]);

      const res = prev.split("");
      res[a] = prev[b];
      res[b] = prev[a];
      return res.join("");
    }
    return prev;
  }, input);

assert(solve(["s3"], "abcde"), "cdeab");
assert(solve(["s1"], "abcde"), "eabcd");
assert(solve(["s1", "x3/4"], "abcde"), "eabdc");
assert(solve(["s1", "x3/4", "pe/b"], "abcde"), "baedc");

const prog = file("./16.txt")
  .toString()
  .split(",");
console.log(solve(prog, "abcdefghijklmnop"));
