const { assert, file } = require("../../utils");

const parse = text => text.split(",").map(i => parseInt(i, 10));

const execute = (prog, input) => {
  const out = [];
  const mem = prog.reduce((res, val, i) => ({ ...res, [i]: val }), {});
  let n = 0;

  while (mem[n] !== undefined) {
    const cmd = mem[n++];
    const op = cmd % 100;
    const typeA = Math.round(cmd / 100) % 10;
    const typeB = Math.round(cmd / 1000) % 10;
    const typeC = Math.round(cmd / 10000) % 10;

    switch (op) {
      case 1: {
        const a = mem[n++];
        const b = mem[n++];
        const c = mem[n++];
        const vala = typeA ? a : mem[a];
        const valb = typeB ? b : mem[b];
        mem[c] = vala + valb;
        continue;
      }

      case 2: {
        const a = mem[n++];
        const b = mem[n++];
        const c = mem[n++];
        const vala = typeA ? a : mem[a];
        const valb = typeB ? b : mem[b];
        mem[c] = vala * valb;
        continue;
      }

      case 3: {
        const a = mem[n++];
        mem[a] = input.shift();
        continue;
      }

      case 4: {
        const a = mem[n++];
        const vala = typeA ? a : mem[a];
        out.push(vala);
        continue;
      }

      default:
        return { out, mem: Object.values(mem) };
    }
  }

  return { out, mem: Object.values(mem) };
};

assert(execute(parse("1002,4,3,4,33")).mem, [1002, 4, 3, 4, 99]);
assert(execute(parse("1101,100,-1,4,0")).mem, [1101, 100, -1, 4, 99]);
assert(execute(parse("3,0,4,0,99"), [12345]).out, [12345]);

const data = file("./05.txt");
console.log(execute(parse(data[0]), [1]).out);
