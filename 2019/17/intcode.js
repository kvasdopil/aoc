const parse = text => text.split(",").map(i => parseInt(i, 10));

const context = prog => ({
  pos: 0,
  base: 0,
  mem: parse(prog).reduce((res, val, i) => ({ ...res, [i]: val }), {}),
  output: []
});

function* execute(context) {
  const getv = type => {
    const p = context.mem[context.pos++];
    if (type === 2) {
      return context.mem[p + context.base];
    }
    if (type === 1) {
      return p;
    }
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
        context.mem[a] = yield;
        continue;
      }

      case 4: {
        const vala = getv(typeA);
        context.output.push(vala);
        continue;
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
}

module.exports = {
  parse,
  context,
  execute
};
