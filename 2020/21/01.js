const { file, assert } = require('../../utils')

const parse = (lines) => {
  return lines.map(line => {
    const [, a, b] = /^(.+) .contains (.+).$/.exec(line);
    return {
      ingrs: a.split(' '),
      allergens: b.split(', ')
    };
  })
}

const findAllergen = (items, allergen) => {
  const recepts = items.filter(({ allergens }) => allergens.includes(allergen));
  const first = recepts.shift().ingrs;

  const options = recepts.reduce((res, { ingrs }) => res.filter(ingr => ingrs.includes(ingr)), first);
  if (options.length === 1) return options.shift();
  return false;
}

const findOne = (items) => {
  const allAs = items.map(({ allergens }) => allergens).reduce((a, b) => a.concat(b), []).reduce((a, b) => ({ ...a, [b]: 1 }), {});
  return Object.keys(allAs).map(al => [al, findAllergen(items, al)]).filter(([, ingr]) => ingr).shift();
}
const work = (lines) => {
  let items = parse(lines);

  while (true) {
    const found = findOne(items);
    if (!found) break;
    const [a1, i1] = found;
    items = items.map(({ ingrs, allergens }) => ({
      ingrs: ingrs.filter(i => i !== i1),
      allergens: allergens.filter(a => a !== a1)
    }));
  }

  return items.map(({ ingrs }) => ingrs).reduce((a, b) => a.concat(b), []).length;
}

const test = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`.trim().split("\n");

assert(work(test), 5);
assert(work(file('input.txt')), 2282);