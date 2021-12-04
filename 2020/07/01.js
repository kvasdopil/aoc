const { file, assert } = require('../../utils')

const parse = (lines) =>
  lines
    .map(line => /^(.+) bags contain (.+)\.$/.exec(line))
    .map(([, name, contains]) => {
      const ct = contains
        .split(', ')
        .map(chunk => /^([0-9]+) (.+) bag/.exec(chunk))
        .filter(a => a)
        .reduce((prev, [, nr, name]) => ({ ...prev, [name]: parseInt(nr, 10) }), {});
      return [name, ct];
    })
    .reduce((obj, [name, contains]) => ({ ...obj, [name]: contains }), {});

const find = (rules, src, tgt) => {
  if (src === tgt) return true;
  if (rules[src][tgt]) return true;
  for (const item of Object.keys(rules[src]))
    if (find(rules, item, tgt)) return true;
  return false;
}

const work = (lines) => {
  const rules = parse(lines);
  const search = 'shiny gold';

  delete rules[search];

  return Object.keys(rules).filter(key => find(rules, key, search)).length;
}

const test = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.trim().split("\n");

assert(work(test), 4);
assert(work(file('input.txt')), 126);