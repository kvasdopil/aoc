const { assert, file } = require("../../utils");
const { parse, context, execute } = require("./intcode.js");

const code = parse(file("./13.txt")[0]);

const build = code => {
  const ct = context(code, []);
  const map = [];
  while (true) {
    const x = execute(ct);
    if (x === undefined) {
      return map;
    }
    const y = execute(ct);
    const t = execute(ct);
    map.push({ x, y, t });
  }
};

console.log(build(code).filter(({ t }) => t === 2).length);
