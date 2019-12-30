const { assert, file } = require("../../utils");
const { context, execute } = require("./intcode.js");

const ct = context(file("./17.txt")[0]);
const prog = execute(ct);

prog.next();

const map = ct.output
  .map(a => String.fromCharCode(a))
  .join("")
  .trim()
  .split("\n")
  .map(line => line.split(""));

let count = 0;
map.forEach((line, Y) =>
  line.forEach((char, X) => {
    if (char !== "#") {
      return;
    }

    if (X == 0 || Y == 0) {
      return;
    }

    if (X === line.length - 1 || Y === map.length - 1) {
      return;
    }

    if (
      map[Y - 1][X] === "#" &&
      map[Y + 1][X] == "#" &&
      map[Y][X - 1] === "#" &&
      map[Y][X + 1] === "#"
    ) {
      count += X * Y;
    }
  })
);

console.log(map.map(line => line.join("")));

console.log(count);
