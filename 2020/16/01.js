const { file, assert } = require('../../utils')

const parse = (lines) => {
  const fields = [];
  const tickets = [];
  while (true) {
    const line = lines.shift();
    if (line === '') break;
    const [, , a1, a2, b1, b2] = /^(.+): (.+)-(.+) or (.+)-(.+)$/.exec(line);
    fields.push([a1, a2, b1, b2].map(a => parseInt(a, 10)));
  }
  lines.shift(); // your ticket
  const ticket = lines.shift().split(',').map(a => parseInt(a, 10));
  lines.shift();

  lines.shift(); // nearby tickets
  while (lines.length) {
    const line = lines.shift();
    if (line === '') break;
    tickets.push(line.split(',').map(a => parseInt(a, 10)));
  }

  return { fields, ticket, tickets };
}

const verifyTicket = (fields, ticket) => {
  for (const val of ticket) {
    const possibleFields = fields.filter(([a1, a2, b1, b2]) => (val >= a1 && val <= a2) || (val >= b1 && val <= b2));
    if (!possibleFields.length)
      return val;
  }
  return 0;
}

const work = (lines) => {
  const { fields, tickets } = parse(lines);
  return tickets
    .map(t => verifyTicket(fields, t))
    .reduce((a, b) => a + b, 0);
}

const test = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`.trim().split("\n");

assert(work(test), 71);
assert(work(file('input.txt')), 158916);