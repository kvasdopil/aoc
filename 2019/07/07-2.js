const { assert, file } = require("../../utils");

const parse = text => text.split(",").map(i => parseInt(i, 10));

const context = (prog, input) => ({
  pos: 0,
  mem: prog.reduce((res, val, i) => ({ ...res, [i]: val }), {}),
  input
});

const execute = context => {
  while (context.mem[context.pos] !== undefined) {
    const cmd = context.mem[context.pos++];
    const op = cmd % 100;
    const typeA = Math.round(cmd / 100) % 10;
    const typeB = Math.round(cmd / 1000) % 10;

    switch (op) {
      case 1: {
        const a = context.mem[context.pos++];
        const b = context.mem[context.pos++];
        const c = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const valb = typeB ? b : context.mem[b];
        context.mem[c] = vala + valb;
        continue;
      }

      case 2: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const b = context.mem[context.pos++];
        const valb = typeB ? b : context.mem[b];
        const c = context.mem[context.pos++];
        context.mem[c] = vala * valb;
        continue;
      }

      case 3: {
        const a = context.mem[context.pos++];
        if (context.input.length === 0) {
          throw new Error("underflow");
        }
        context.mem[a] = context.input.shift();
        continue;
      }

      case 4: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        return vala;
      }

      case 5: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const b = context.mem[context.pos++];
        const valb = typeB ? b : context.mem[b];
        if (vala !== 0) {
          context.pos = valb;
        }
        continue;
      }

      case 6: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const b = context.mem[context.pos++];
        const valb = typeB ? b : context.mem[b];
        if (vala === 0) {
          context.pos = valb;
        }
        continue;
      }

      case 7: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const b = context.mem[context.pos++];
        const valb = typeB ? b : context.mem[b];
        const c = context.mem[context.pos++];
        const valc = c;
        context.mem[valc] = vala < valb ? 1 : 0;
        continue;
      }

      case 8: {
        const a = context.mem[context.pos++];
        const vala = typeA ? a : context.mem[a];
        const b = context.mem[context.pos++];
        const valb = typeB ? b : context.mem[b];
        const c = context.mem[context.pos++];
        const valc = c;
        context.mem[valc] = vala === valb ? 1 : 0;
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

const run = (prog, setting) => {
  const ctx = [
    context(prog, [setting[0]]),
    context(prog, [setting[1]]),
    context(prog, [setting[2]]),
    context(prog, [setting[3]]),
    context(prog, [setting[4]])
  ];

  ctx[0].input.push(0);
  let val;

  while (ctx[0].input[0] !== undefined) {
    val = ctx[0].input[0];
    if (ctx[0].input[0] === undefined) {
      break;
    }
    ctx[1].input.push(execute(ctx[0]));
    if (ctx[1].input[0] === undefined) {
      break;
    }
    ctx[2].input.push(execute(ctx[1]));
    if (ctx[2].input[0] === undefined) {
      break;
    }
    ctx[3].input.push(execute(ctx[2]));
    if (ctx[3].input[0] === undefined) {
      break;
    }
    ctx[4].input.push(execute(ctx[3]));
    if (ctx[4].input[0] === undefined) {
      break;
    }
    ctx[0].input.push(execute(ctx[4]));
  }

  return val;
};

const solve = p => {
  const prog = parse(p);
  let best = [0, 0, 0, 0, 0];
  let max = 0;
  for (let a = 5; a < 10; a++) {
    for (let b = 5; b < 10; b++) {
      for (let c = 5; c < 10; c++) {
        for (let d = 5; d < 10; d++) {
          for (let e = 5; e < 10; e++) {
            if (
              a !== b &&
              a !== c &&
              a !== d &&
              a !== e &&
              b !== c &&
              b !== d &&
              b !== e &&
              c !== d &&
              c !== e &&
              d !== e
            ) {
              const res = run(prog, [a, b, c, d, e]);
              if (res >= max) {
                best = [a, b, c, d, e];
                max = res;
              }
            }
          }
        }
      }
    }
  }
  return [best, max];
};

assert(
  solve(
    "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"
  ),
  [[9, 8, 7, 6, 5], 139629729]
);

assert(
  solve(
    "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"
  ),
  [[9, 7, 8, 5, 6], 18216]
);

const p = file("07.txt");
console.log(solve(p[0]));
