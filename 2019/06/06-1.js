const { assert, file } = require("../../utils");

const parse = text => text.map(line => line.split(")"));

const solve = parsed => {
  let orbits = 0;
  const nodes = parsed.reduce(
    (old, [from, to]) => ({ ...old, [to]: from }),
    {}
  );

  Object.keys(nodes).forEach(node => {
    let pt = node;
    while (pt !== "COM") {
      pt = nodes[pt];
      orbits++;
    }
  });

  return orbits;
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
  "K)L"
];

assert(solve(parse(t1)), 42);

const data = file("./06.txt");
console.log(solve(parse(data)));
