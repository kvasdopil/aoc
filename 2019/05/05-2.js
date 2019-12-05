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
        const vala = typeA ? a : mem[a];
        const b = mem[n++];
        const valb = typeB ? b : mem[b];
        const c = mem[n++];
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

      case 5: {
        const a = mem[n++];
        const vala = typeA ? a : mem[a];
        const b = mem[n++];
        const valb = typeB ? b : mem[b];
        if (vala !== 0) {
          n = valb;
        }
        continue;
      }

      case 6: {
        const a = mem[n++];
        const vala = typeA ? a : mem[a];
        const b = mem[n++];
        const valb = typeB ? b : mem[b];
        if (vala === 0) {
          n = valb;
        }
        continue;
      }

      case 7: {
        const a = mem[n++];
        const vala = typeA ? a : mem[a];
        const b = mem[n++];
        const valb = typeB ? b : mem[b];
        const c = mem[n++];
        const valc = c;
        mem[valc] = vala < valb ? 1 : 0;
        continue;
      }

      case 8: {
        const a = mem[n++];
        const vala = typeA ? a : mem[a];
        const b = mem[n++];
        const valb = typeB ? b : mem[b];
        const c = mem[n++];
        const valc = c;
        mem[valc] = vala === valb ? 1 : 0;
        continue;
      }

      default:
        return { out, mem: Object.values(mem) };
    }
  }

  return { out, mem: Object.values(mem) };
};

assert(execute(parse("3,9,8,9,10,9,4,9,99,-1,8"), [8]).out[0], 1);
assert(execute(parse("3,9,8,9,10,9,4,9,99,-1,8"), [9]).out[0], 0);

assert(execute(parse("3,9,7,9,10,9,4,9,99,-1,8"), [7]).out[0], 1);
assert(execute(parse("3,9,7,9,10,9,4,9,99,-1,8"), [8]).out[0], 0);

assert(execute(parse("3,3,1108,-1,8,3,4,3,99"), [8]).out[0], 1);
assert(execute(parse("3,3,1108,-1,8,3,4,3,99"), [9]).out[0], 0);

assert(execute(parse("3,3,1107,-1,8,3,4,3,99"), [7]).out[0], 1);
assert(execute(parse("3,3,1107,-1,8,3,4,3,99"), [567]).out[0], 0);

const c0 = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9";

assert(execute(parse(c0), [0]).out[0], 0);
assert(execute(parse(c0), [1]).out[0], 1);
assert(execute(parse(c0), [1234]).out[0], 1);

const c1 = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1";

assert(execute(parse(c1), [0]).out[0], 0);
assert(execute(parse(c1), [1]).out[0], 1);
assert(execute(parse(c1), [1234]).out[0], 1);

const c2 =
  "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31," +
  "1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104," +
  "999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";

assert(execute(parse(c2), [7]).out[0], 999);
assert(execute(parse(c2), [8]).out[0], 1000);
assert(execute(parse(c2), [9]).out[0], 1001);

const data = file("./05.txt");
console.log(execute(parse(data[0]), [5]).out);
