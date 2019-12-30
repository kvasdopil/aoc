const { assert, file } = require("../../utils");
const { context, execute } = require("./intcode.js");

// const ct = context(file("./17.txt")[0]);

// ct.mem[0] = 2;

// const prog = execute(ct);

// prog.next();

// const line = chars => {
//   for (let i = 0; i < chars.length; i++) {
//     prog.next(chars.charCodeAt(i));
//   }
//   prog.next(10);
// };

// //   |      prog here     |
// line("A,C,C,C,C,C,C,B,C,C");
// line("L");
// line("R");
// line("1");

// ct.output = [];
// line("y");

// const map = ct.output
//   .map(a => String.fromCharCode(a))
//   .join("")
//   .trim()
//   .split("\n")
//   .map(line => line.split(""));

// map.forEach(line => console.log(line.join("")));

const cmds = ["A", "B", "C"];
for (let c = 0; c < 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3 * 3; c++) {
  const vals = [
    Math.floor(c / 1) % 3,
    Math.floor(c / 3) % 3,
    Math.floor(c / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3 / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3 / 3 / 3 / 3 / 3) % 3,
    Math.floor(c / 3 / 3 / 3 / 3 / 3 / 3 / 3 / 3 / 3) % 3
  ]
    .map(v => cmds[v])
    .join(",");
  console.log(vals);
}
