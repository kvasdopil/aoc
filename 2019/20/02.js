const { file, assert } = require('../../utils')

const NS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];

const findSymbol = (map, symbol) => {
  const y = map.findIndex(line => line.includes(symbol));
  if (y < 0) return false;
  const x = map[y].findIndex(ch => ch === symbol);
  return [x, y];
}

const findWays = (map, [sx, sy]) => {
  const copy = map.map(line => line.map(a => a));

  let positions = [[sx, sy, 0]];
  copy[sy][sx] = '#';

  let results = [];
  while (positions.length) {
    let next = [];
    for (const [x, y, steps] of positions) {
      for (const [dx, dy] of directions) {
        const [X, Y] = [x + dx, y + dy];
        if (copy[Y] === undefined) continue;
        const val = copy[Y][X];
        copy[Y][X] = '#';
        if (val === ' ' || val === '#' || val === undefined) continue;
        if (val >= 'A' && val <= 'Z' || (val >= 'a' && val <= 'z')) { results.push([X, Y, val, steps + 1]); continue; }
        next.push([X, Y, steps + 1]);
      }
    }
    positions = next;
  }
  return results;
}

const mergeGraph = (graph) => {
  // calculate how many times each point is used
  const count = {};
  graph.forEach(([a, b]) => {
    if (!count[a]) count[a] = 0;
    if (!count[b]) count[b] = 0;
    count[a]++;
    count[b]++;
  });

  // find points that only used twice, and merge them
  Object.entries(count).filter(([key, val]) => val === 2 && key !== 'A' && key !== 'Z').forEach(([key, val]) => {
    const a = graph.find(([src, dst]) => src === key || dst === key);
    graph = graph.filter(item => item !== a); // a is removed 

    const b = graph.find(([src, dst]) => src === key || dst === key);
    if (a[0] === key) { a[0] = a[1]; };
    if (b[1] === key) { b[1] = b[0]; };
    b[0] = a[0];
    b[2] += a[2] - 1;
  })

  // reorder points, so we can detect duplicates
  graph = graph.map(([a, b, len]) => a > b ? [b, a, len] : [a, b, len]);

  // find duplicates and select smallest one
  const result = {};
  for (const [a, b, len] of graph) {
    const key = `${a}:${b}`;
    if (!result[key]) result[key] = [a, b, len];
    result[key] = [a, b, Math.min(len, result[key][2])];
  }
  graph = Object.values(result);

  return graph;
}

const removeDeadEnds = map => {
  let replace = true;
  while (replace) {
    replace = false;
    for (let y = 1; y < map.length - 1; y++)
      for (let x = 1; x < map[0].length - 1; x++) {
        if (map[y][x] !== '.') continue;
        const walls = NS.filter(([dx, dy]) => map[y + dy][x + dx] === '#').length;
        if (walls === 3) {
          map[y][x] = '#';
          replace = true;
        }
      }
  }
}

const buildGraph = map => {
  let graph = [];

  const nexts = ['A'];
  const visited = {};
  while (nexts.length) {
    const start = nexts.shift();
    if (visited[start]) continue;
    const pos = findSymbol(map, start);
    if (!pos) continue;
    const ways = findWays(map, pos);
    for (const [x, y, end, len] of ways) {
      graph.push([start, end, len]);
      map[y][x] = '#';
      nexts.push(end);
    }
  }

  return graph;
}

const work = (lines) => {
  const map = lines.map(line => line.split(''));


  map[0].fill('#');
  map[1] = map[1].map(ch => (ch === 'A' || ch === 'Z') ? ch : '#');
  map[map.length - 1].fill('#');
  map[map.length - 2] = map[map.length - 2].map(ch => (ch === 'A' || ch === 'Z') ? ch : '#');
  map.forEach((line) => {
    line[0] = '#';
    line[line.length - 1] = '#';
    line[1] = (line[1] === 'A' || line[1] === 'Z') ? line[1] : '#';
    line[line.length - 2] = (line[line.length - 2] === 'A' || line[line.length - 2] === 'Z') ? line[line.length - 2] : '#';
  })

  removeDeadEnds(map);
  console.log(map.map(line => line.map(ch => ch).join('')).join('\n'));

  let graph = buildGraph(map);

  graph = mergeGraph(graph);
  graph = mergeGraph(graph);

  return graph[0][2] - 2;
}

assert(work(file('test.txt')), 58);
assert(work(file('input.txt')), 442);