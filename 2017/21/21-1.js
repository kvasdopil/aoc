const { assert, file } = require("../../utils");

const SPLIT = ["0145", "2367", "89cd", "abef"];
const splitPatterns = SPLIT.map(line =>
  line.split("").map(i => parseInt(i, 16))
);

const rots = input => {
  if (input.length === 9) {
    return uniq(pattern3.map(pattern => pattern.map(pi => input[pi]).join("")));
  }
  if (input.length === 4) {
    return uniq(pattern2.map(pattern => pattern.map(pi => input[pi]).join("")));
  }
};

const parse = rules =>
  rules.map(rule => {
    const [from, to] = rule
      .replace(/ /g, "")
      .replace(/\//g, "")
      .split("=>");

    if (to.length === 9) {
      return { from: rots(from), to: [to] };
    }

    return {
      from: rots(from),
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

const P2 = ["0123", "2301", "1032", "3210"];
const pattern2 = P2.map(pat => pat.split("").map(i => parseInt(i, 10)));

const start = ".#...####";

const transform = (input, rules) => {
  for (const rule of rules) {
    if (rule.from.some(pattern => input === pattern)) {
      return rule.to;
    }
  }

  return null;
};

const uniq = a => {
  const result = {};
  a.forEach(i => (result[i] = 1));
  return Object.keys(result);
};

const solve = rules => {
  let patterns = [start];

  for (let i = 0; i < 6; i++) {
    const next = [];
    patterns.forEach(pattern => {
      const tf = transform(pattern, rules);
      if (tf) {
        tf.map(t => next.push(t));
      } else {
        next.push(pattern);
      }
    });
    patterns = next;
  }

  return patterns
    .join("")
    .split("")
    .filter(i => i === "#").length;
};

const rules = ["../.# => ##./#../...", ".#./..#/### => #..#/..../..../#..#"];

assert(solve(parse(rules)), 12);

const data = parse(file("./21.txt"));
console.log(solve(data));

// 87 wrong
// 129 hi
