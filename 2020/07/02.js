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

const walk = (rules, src) =>
  Object.keys(rules[src])
    .reduce((sum, key) => (sum + rules[src][key] * walk(rules, key)), 1);

const work = (lines) => {
  const rules = parse(lines);
  return walk(rules, 'shiny gold') - 1;
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

const test2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.trim().split("\n");

assert(work(test), 32);
assert(work(test2), 126);
assert(work(file('input.txt')), 220149);