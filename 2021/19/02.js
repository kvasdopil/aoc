const { file, assert } = require('../../utils')

const len = ([xa, ya, za], [xb, yb, zb]) => Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb) + (za - zb) * (za - zb))


const rotZ = ([x, y, z]) => [-y, x, z];
const rotX = ([x, y, z]) => [x, -z, y];
const rotY = ([x, y, z]) => [z, y, -x];

const findRotation = (a, b) => {
  for (let [x, y, z] of a) {
    const dsta = a.filter(v => v != a).map(([xb, yb, zb]) => [xb - x, yb - y, zb - z]);
    for (let [x2, y2, z2] of b) {
      let dstb = b.filter(v => v != b).map(([xb, yb, zb]) => [xb - x2, yb - y2, zb - z2]);
      let dstv = [x2, y2, z2];
      for (let xr = 0; xr < 4; xr++) {
        for (let yr = 0; yr < 4; yr++) {
          for (let zr = 0; zr < 4; zr++) {
            let ct = dsta.filter(v1 => dstb.some(v2 => len(v1, v2) < 0.00001)).length;
            if (ct > 10) {
              return {
                points: [...dstb.map(([X, Y, Z]) => [X + x, Y + y, Z + z]), [x, y, z]],
                pos: [x - dstv[0], y - dstv[1], z - dstv[2]],
              }
            }
            dstv = rotZ(dstv);
            dstb = dstb.map(rotZ);
          }
          dstv = rotY(dstv);
          dstb = dstb.map(rotY);
        }
        dstv = rotX(dstv);
        dstb = dstb.map(rotX);
      }
    }
  }
  return null;
}

const findCommon = (a, b) => {
  for (let pa of a) {
    const dsta = a.map(pt => len(pt, pa));
    for (let pb of b) {
      const dstb = b.map(pt => len(pt, pb));
      const ct = dsta.filter(v1 => dstb.some(v2 => Math.abs(v2 - v1) < 0.00001)).length;
      if (ct === 12) return ct;
    }
  }
}

const findNeighbours = (data) => {
  const result = [];
  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < i; j++) {
      if (i === j) continue;
      const found = findCommon(data[i], data[j]);
      if (found > 10) {
        result.push([i, j]);
        result.push([j, i]);
      }
    }
  }
  return result;
}

const findPositions = (pairs, data) => {
  let valid = { "0": [0, 0, 0] };
  let nexts = [0];
  while (nexts.length) {
    let current = nexts.shift();
    pairs
      .filter(([a]) => a === current)
      .filter(([, b]) => !valid[b])
      .forEach(([a, b]) => {
        let { points, pos } = findRotation(data[a], data[b]);

        valid[b] = pos;
        data[b] = points;

        nexts.push(b);
      });
  }

  return valid;
}

const work = (lines) => {
  const data = lines
    .join("\n")
    .split("\n\n")
    .map(chunk => chunk
      .split("\n")
      .slice(1)
      .map(line => line
        .split(",")
        .map(a => parseInt(a, 10)
        )
      )
    );

  const pairs = findNeighbours(data);
  const pos = findPositions(pairs, data);

  let max = 0;

  const ps = Object.values(pos);
  for (let [ax, ay, az] of ps)
    for (let [bx, by, bz] of ps) {
      const dst = [Math.abs(ax - bx), Math.abs(ay - by), Math.abs(az - bz)].reduce((a, b) => a + b, 0);
      max = Math.max(max, dst);
    }

  return max;
}

assert(work(file('test.txt')), 3621);
assert(work(file('input.txt')), 12149);