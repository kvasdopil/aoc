const { assert, file } = require("../../utils");
const { parse, context, execute } = require("./intcode.js");

const code = parse(file("./13.txt")[0]);

const build = code => {
  const ct = context(code, []);
  const map = [];
  const prog = execute(ct);
  prog.next();

  while (ct.output.length) {
    const x = ct.output.shift();
    const y = ct.output.shift();
    const t = ct.output.shift();
    map.push({ x, y, t });
  }

  return map;
};

console.log(build(code).filter(({ t }) => t === 2).length);
