const { file, assert } = require('../../utils')

// A simple robot-on-map implementation, with 'heading' feature and rotations

const work = (lines) => {
  let x = 0;
  let y = 0;
  let h = 90;
  const cmds = lines.map(line => /^(.)([0-9]+)$/.exec(line)).map(([, cmd, arg]) => [cmd, parseInt(arg, 10)]);
  cmds.forEach(([cmd, arg]) => {
    if (cmd === 'N') y -= arg;
    if (cmd === 'S') y += arg;
    if (cmd === 'W') x -= arg;
    if (cmd === 'E') x += arg;
    if (cmd === 'L') h = (360 + h - arg) % 360;
    if (cmd === 'R') h = (360 + h + arg) % 360;
    if (cmd === 'F') {
      if (h === 0) y -= arg;
      if (h === 90) x += arg;
      if (h === 180) y += arg;
      if (h === 270) x -= arg;
    }
  })

  return Math.abs(x) + Math.abs(y)
}

const test = `F10
N3
F7
R90
F11`.trim().split("\n");

assert(work(test), 25);
assert(work(file('input.txt')), 2392); // 2392 too high