const { file, assert } = require('../../utils')

const parse = (lines) => {
  lines.push("");
  let result = [];
  let tile = [];
  let number = 0;
  for (const line of lines) {
    const re = /Tile ([0-9]+):/.exec(line);
    if (re) {
      number = re[1];
      continue;
    }

    if (line === "") {
      result.push({ number, tile });
      tile = [];
      continue;
    }

    tile.push(line.split(''));
  }
  return result;
}

const bitmaps = ({ tile }) => {
  const topA = tile[0].map(ch => ch === '#' ? '1' : '0');
  const btmA = tile[tile.length - 1].map(ch => ch === '#' ? '1' : '0');
  const lftA = tile.map(line => line[0]).map(ch => ch === '#' ? '1' : '0');
  const rgtA = tile.map(line => line[line.length - 1]).map(ch => ch === '#' ? '1' : '0');

  return {
    str: [
      parseInt(topA.join(''), 2),
      parseInt(btmA.join(''), 2),
      parseInt(lftA.join(''), 2),
      parseInt(rgtA.join(''), 2),
    ],
    inv: [
      parseInt(topA.reverse().join(''), 2),
      parseInt(btmA.reverse().join(''), 2),
      parseInt(lftA.reverse().join(''), 2),
      parseInt(rgtA.reverse().join(''), 2),
    ]
  };
}

const work = (lines) => {
  const tiles = parse(lines);
  const bmps = tiles.map(bitmaps);
  const peers = {};

  for (const i in tiles) {
    const num = tiles[i].number;
    const t1 = bmps[i];

    for (const s1 of t1.str) {
      const matches = bmps.map((t2, j) => {
        if (i === '' + j) return 0;
        return (t2.str.some(val => val === s1) || t2.inv.some(val => val === s1)) ? j : 0;
      }).filter(a => a).map(j => tiles[j].number);

      if (matches.length) {
        if (!peers[num]) peers[num] = {};
        if (!peers[matches[0]]) peers[matches[0]] = {};
        peers[num][matches[0]] = 1;
        peers[matches[0]][num] = 1;
      }
    }

    for (const s1 of t1.inv) {
      const matches = bmps.map((t2, j) => {
        if (i === '' + j) return 0;
        return (t2.str.some(val => val === s1) || t2.inv.some(val => val === s1)) ? j : 0;
      }).filter(a => a).map(j => tiles[j].number)

      if (matches.length) {
        if (!peers[num]) peers[num] = {};
        if (!peers[matches[0]]) peers[matches[0]] = {};
        peers[num][matches[0]] = 1;
        peers[matches[0]][num] = 1;
      }
    }

  }

  return Object
    .keys(peers)
    .filter(id => Object.keys(peers[id]).length === 2)
    .map(i => parseInt(i, 10))
    .reduce((a, b) => a * b, 1)
}

assert(work(file('test.txt')), 20899048083289);
assert(work(file('input.txt')), 17148689442341);