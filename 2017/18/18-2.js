const { assert, file } = require("../../utils");

const parse = line => {
  const [cmd, a, b] = line.split(" ");
  vala = parseInt(a, 10);
  valb = parseInt(b, 10);
  return { cmd, a, b, valb, vala };
};

const context = id => {
  const regs = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .reduce((res, val) => ({ ...res, [val]: 0 }), {});

  regs.p = id;
  return { id, pos: 0, in: [], out: [], regs, sends: [] };
};

const step = (text, ctx) => {
  while (true) {
    const command = text[ctx.pos];
    if (command === undefined) {
      console.log(ctx.id, "oob");
      return;
    }

    const { cmd, a, b, vala, valb } = command;
    const valuea = isNaN(vala) ? ctx.regs[a] : vala;
    const valueb = isNaN(valb) ? ctx.regs[b] : valb;

    switch (cmd) {
      case "snd":
        ctx.out.push(valuea);
        ctx.sends.push(valuea);
        break;
      case "set":
        ctx.regs[a] = valueb;
        break;
      case "add":
        ctx.regs[a] += valueb;
        break;
      case "mul":
        ctx.regs[a] *= valueb;
        break;
      case "mod":
        ctx.regs[a] %= valueb;
        break;
      case "rcv":
        if (ctx.in.length) {
          ctx.regs[a] = ctx.in.shift();
        } else {
          return;
        }
        break;
      case "jgz":
        if (valuea > 0) {
          ctx.pos += valueb - 1;
        }
        break;
      default:
    }
    ctx.pos += 1;
  }
};

const solve = prog => {
  const text = prog.map(parse);

  const ctxa = context(0);
  const ctxb = context(1);

  ctxa.in = ctxb.out;
  ctxb.in = ctxa.out;

  while (true) {
    step(text, ctxa);
    step(text, ctxb);

    if (ctxa.in.length === 0 && ctxb.in.length === 0) {
      return ctxb.sends.length;
    }
  }
};

const prog = ["snd 1", "snd 2", "snd p", "rcv a", "rcv b", "rcv c", "rcv d"];

assert(solve(prog), 3);

const p1 = file("./18.txt");
console.log(solve(p1));
