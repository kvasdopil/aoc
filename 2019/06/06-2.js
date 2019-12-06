const { assert, file } = require("../../utils");

const parse = text => text.map(line => line.split(")"));

const parents = (node, nodes) => {
  const result = [];
  let ct = node;
  while (ct !== undefined) {
    result.unshift(ct);
    ct = nodes[ct];
  }
  return result;
};

const solve = parsed => {
  const nodes = parsed.reduce(
    (old, [from, to]) => ({ ...old, [to]: from }),
    {}
  );

  const p1 = parents("YOU", nodes);
  const p2 = parents("SAN", nodes);

  let last;
  while (p1[0] === p2[0]) {
    p1.shift();
    p2.shift();
  }

  return p1.length + p2.length - 2;
};

const t1 = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L",
  "K)YOU",
  "I)SAN"
];

assert(solve(parse(t1)), 4);

const data = file("./06.txt");
console.log(solve(parse(data)));
