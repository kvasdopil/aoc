const { file, assert } = require('../../utils')

const parse = (lines) => {
  const fields = [];
  const tickets = [];
  const names = [];
  while (true) {
    const line = lines.shift();
    if (line === '') break;
    const [, name, a1, a2, b1, b2] = /^(.+): (.+)-(.+) or (.+)-(.+)$/.exec(line);
    fields.push([a1, a2, b1, b2].map(a => parseInt(a, 10)));
    names.push(name);
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

  return { fields, ticket, tickets, names };
}

const testField = ([a1, a2, b1, b2], val) => (val >= a1 && val <= a2) || (val >= b1 && val <= b2)

const isInvalidTicket = (fields, ticket) => {
  for (const val of ticket) {
    const possibleFields = fields.filter(f => testField(f, val));
    if (!possibleFields.length)
      return val;
  }
  return 0;
}

const getFieldMask = (field, tickets) =>
  tickets
    .map(
      ticket => ticket
        .map(val => testField(field, val) ? 1 : 0)
        .join('')
    )
    .map(a => parseInt(a, 2))
    .reduce((a, b) => a & b, 0xffffffff)

const bit2str = (a, wi = 32) => Number(a).toString(2).padStart(wi, '0')

const onlyOneBitOn = (mask) => mask.toString(2).split('').filter(a => a === '1').length === 1;
const bit = mask => {
  let i = 0;
  while (mask) {
    i++;
    mask >>= 1
  }
  return i;
}

const findFields = (lines) => {
  const { fields, tickets, ticket, names } = parse(lines);

  // filter invalid tickets
  const good = tickets.filter(t => !isInvalidTicket(fields, t));

  // generate bit masks for each field
  // 1 in bit mask indicates a possible field position
  let masks = fields
    .map(field => getFieldMask(field, good))

  const result = [];
  while (true) {
    masks
      .map((mask, i) => [i, Number(mask).toString(2).padStart(32, 0), names[i]])
      .filter(([i]) => masks[i])
      .sort(([, a], [, b]) => a - b)
      .forEach(([, text, name]) => console.log(text, name))

    // find a mask index with only 1 bit on
    const fieldNr = masks.findIndex(onlyOneBitOn);
    if (fieldNr < 0) break;

    const mask = masks[fieldNr];
    // clear this bit on every other mask
    masks = masks.map(m => (0xffffffff - mask) & m);

    // store the result
    result[ticket.length - bit(mask)] = fieldNr;
    console.log(ticket.length - bit(mask), names[fieldNr]);
  }
  return result;
}

const work = (lines) => {
  const { names, ticket } = parse([...lines]);


  const pos = findFields(lines);
  ticket.map((val, n) => {
    const fieldId = pos[n];
    const fieldName = names[fieldId];
    if (fieldName === undefined || /^depa/.test(fieldName))
      console.log(fieldName, val);
  })
  return pos;
}

const test = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`.trim().split("\n");

assert(findFields(test), ['row', 'class', 'seat']);
assert(work(file('input.txt')), 158916);

for (i of [71, 137, 89])
  console.log(61 * 179 * 139 * 173 * 167 * i);

// 6007320566647 hi
// 3113282921401 low
// 3902565915559 <-- correct answer