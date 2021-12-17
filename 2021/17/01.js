const { copyFile } = require('fs');
const { file, assert } = require('../../utils')

const run = (x1, x2, y1, y2, xiv, yiv) => {
  let x = 0;
  let y = 0;
  let xv = xiv;
  let yv = yiv;
  let my = y;
  while (y >= Math.min(y1, y2)) {
    x += xv;
    y += yv;
    my = Math.max(y, my);
    if (x1 <= x && x <= x2 && y1 <= y && y <= y2) return my;
    yv--;
    if (xv > 0) xv--;
    if (xv < 0) xv++;
  }
  return false;
}

const work = (x1, x2, y1, y2) => {
  let max = 0;
  for (let xv = 0; xv <= x2; xv++) {
    for (let yv = 0; yv <= 1000; yv++) {
      const hit = run(x1, x2, y1, y2, xv, yv);
      if (!hit) continue;
      max = Math.max(hit, max);
      // console.log(xv, yv, hit);
    }
  }
  return max;
}

assert(work(20, 30, -10, -5), 45);
assert(work(230, 283, -107, -57), 5671);