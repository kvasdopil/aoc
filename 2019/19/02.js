const { assert, file, array2d } = require("../../utils");

const parse = text => {
  return text.split(",").map(i => parseInt(i, 10));
}

const context = (prog, input) => ({
  pos: 0,
  base: 0,
  mem: prog.reduce((res, val, i) => ({ ...res, [i]: val }), {}),
  input
});

const execute = context => {
  const getv = type => {
    const p = context.mem[context.pos++];
    if (type === 2) return context.mem[p + context.base];
    if (type === 1) return p;
    return context.mem[p];
  };

  const geta = type => {
    const p = context.mem[context.pos++];
    return type === 2 ? p + context.base : p;
  };

  while (context.mem[context.pos] !== undefined) {
    const cmd = getv(1);
    const op = cmd % 100;
    const typeA = Math.round(cmd / 100) % 10;
    const typeB = Math.round(cmd / 1000) % 10;
    const typeC = Math.round(cmd / 10000) % 10;

    switch (op) {
      case 1: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        const c = geta(typeC);
        context.mem[c] = vala + valb;
        continue;
      }

      case 2: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        const c = geta(typeC);
        context.mem[c] = vala * valb;
        continue;
      }

      case 3: {
        const a = geta(typeA);
        if (context.input.length === 0) {
          throw new Error("underflow");
        }
        context.mem[a] = context.input.shift();
        continue;
      }

      case 4: {
        const vala = getv(typeA);
        return vala;
      }

      case 5: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        if (vala !== 0) {
          context.pos = valb;
        }
        continue;
      }

      case 6: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        if (vala === 0) {
          context.pos = valb;
        }
        continue;
      }

      case 7: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        const c = geta(typeC);
        context.mem[c] = vala < valb ? 1 : 0;
        continue;
      }

      case 8: {
        const vala = getv(typeA);
        const valb = getv(typeB);
        const c = geta(typeC);
        context.mem[c] = vala === valb ? 1 : 0;
        continue;
      }

      case 9: {
        const vala = getv(typeA);
        context.base += vala;
        continue;
      }

      case 99: {
        return undefined;
      }

      default:
        throw new Error("Unknown opcode", op);
    }
  }
  throw new Error("Terminated unexpectedly", context.pos);
};

const solve = (prog) => {
  const p = parse(prog);
  let y = 100;
  let x = 0;

  const get = (ix, iy) => {
    const ctx = context(p, [ix, iy]);
    return execute(ctx);
  }

  while (true) {
    while (get(x, y) === 0) x++;
    let x2 = x;
    let y2 = y;
    while (get(x2, y2) !== 0) { x2++; y2-- };
    if (x2 - x >= 100) {
      break;
    }
    y++;
  }

  y -= 99;
  return x * 10000 + y;
};

assert(solve(file('input.txt').shift()), 17302065);
