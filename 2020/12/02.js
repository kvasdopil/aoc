const { file, assert } = require('../../utils')

// A robot-on-map implementation, with vector bearing, and bearing rotation 

const work = (lines) => {
  let x = 0;
  let y = 0;
  let wx = 10;
  let wy = 1;
  const cmds = lines.map(line => /^(.)([0-9]+)$/.exec(line)).map(([, cmd, arg]) => [cmd, parseInt(arg, 10)]);
  cmds.forEach(([cmd, arg]) => {
    if (cmd === 'N') wy += arg;
    if (cmd === 'S') wy -= arg;
    if (cmd === 'W') wx -= arg;
    if (cmd === 'E') wx += arg;
    if (cmd === 'L') {
      while (arg >= 90) {
        [wx, wy] = [-wy, wx]
        arg -= 90;
      }
    }
    if (cmd === 'R') {
      while (arg >= 90) {
        [wx, wy] = [wy, -wx]
        arg -= 90;
      }
    }
    if (cmd === 'F') {
      x += arg * wx;
      y += arg * wy;
    }
  })

  return Math.abs(x) + Math.abs(y)
}

const test = `F10
N3
F7
R90
F11`.trim().split("\n");

assert(work(test), 286);
assert(work(file('input.txt')), 54404);