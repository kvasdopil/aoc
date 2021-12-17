const { file, assert } = require('../../utils');

const run = (x1, x2, y1, y2, xiv, yiv) => {
  let x = 0;
  let y = 0;
  let xv = xiv;
  let yv = yiv;
  const my = Math.min(y1, y2);
  const My = Math.max(y1, y2);
  while (y >= my) {
    x += xv;
    y += yv;
    // console.log(x, y, x1, x, x2, y1, y, y2)
    if (x1 <= x && x <= x2 && my <= y && y <= My) return true;
    yv--;
    if (xv > 0) xv--;
    if (xv < 0) xv++;
  }
  return false;
}

const work = (x1, x2, y1, y2) => {
  let ct = 0;
  for (let xv = 0; xv <= x2; xv++) {
    for (let yv = -1000; yv <= 1000; yv++) {
      const hit = run(x1, x2, y1, y2, xv, yv);
      if (!hit) continue;
      ct++;
    }
  }
  return ct;
}

assert(work(20, 30, -5, -10), 112);
assert(work(230, 283, -107, -57), 4556);
