const { assert, file } = require("../../utils");
const { context, execute } = require("./intcode.js");

const ct = context(file("./17.txt")[0]);

ct.mem[0] = 2;

const prog = execute(ct);

prog.next();

const line = chars => {
  for (let i = 0; i < chars.length; i++) {
    prog.next(chars.charCodeAt(i));
  }
  prog.next(10);
};

//   |      prog here     |
line("A,B,B,C,B,C,B,C,A,A");
line("L,6,R,8,L,4,R,8,L,12");
line("L,12,R,10,L,4");
line("L,12,L,6,L,4,L,4");

ct.output = [];
line("y");

const map = ct.output
  .map(a => String.fromCharCode(a))
  .join("")
  .trim()
  .split("\n")
  .map(line => line.split(""));

map.forEach(line => console.log(line.join("")));

console.log(ct.output[ct.output.length - 1]);
