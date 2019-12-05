const SPLIT = ["0145", "2367", "89cd", "abef"];
const splitPatterns = SPLIT.map(line =>
  line.split("").map(i => parseInt(i, 16))
);

const parse = rules =>
  rules.map(rule => {
    const [from, to] = rule
      .replace(/ /g, "")
      .replace(/\//g, "")
      .split("=>");

    if (to.length === 9) {
      return { from, to: [to] };
    }

    return {
      from,
      to: splitPatterns.map(pattern => pattern.map(n => to[n]).join(""))
    };
  });

const P3 = [
  "012345678",
  "036147258",
  "852741630",
  "876543210",
  "630741852",
  "678345012",
  "210543876",
  "258147036"
];
const pattern3 = P3.map(pat => pat.split("").map(i => parseInt(i, 10)));

const rots = input => {
  if (input.length === 9) {
    return pattern3.map(pattern => pattern.map(pi => input[pi]).join(""));
  }
  return [input];
};

const start = ".#...####";

const transform = (input, rules) => {
  for (const rule of rules) {
    if (rots(rule.from).some(pattern => input === pattern)) {
      return rule.to;
    }
  }

  return false;
};

const rules = ["../.# => ##./#../...", ".#./..#/### => #..#/..../..../#..#"];

console.log(transform(start, parse(rules)));
