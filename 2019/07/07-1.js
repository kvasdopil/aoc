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

const run = (prog, setting) => {
  const p1 = execute(prog, [setting[0], 0]);
  const p2 = execute(prog, [setting[1], p1.out[0]]);
  const p3 = execute(prog, [setting[2], p2.out[0]]);
  const p4 = execute(prog, [setting[3], p3.out[0]]);
  const p5 = execute(prog, [setting[4], p4.out[0]]);
  return p5.out[0];
};

const solve = p => {
  const prog = parse(p);
  let best = [0, 0, 0, 0, 0];
  let max = 0;
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      for (let c = 0; c < 5; c++) {
        for (let d = 0; d < 5; d++) {
          for (let e = 0; e < 5; e++) {
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
              // console.log(res, [a, b, c, d, e]);
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

assert(solve("3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"), [
  [4, 3, 2, 1, 0],
  43210
]);
assert(
  solve(
    "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
  ),
  [[0, 1, 2, 3, 4], 54321]
);
assert(
  solve(
    "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
  ),
  [[1, 0, 4, 3, 2], 65210]
);

const p = file("07.txt");
console.log(solve(p[0]));
