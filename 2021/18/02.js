const { file, assert } = require('../../utils')

const walk = (item, cb) => {
  if (item.length === undefined) return cb(item);
  return item.map(i => walk(i, cb));
}

const print = (a) => {
  console.log(JSON.stringify(walk(a, ({ val }) => val)));
}

const process = (lines) => {
  let items = JSON.parse(lines);
  let vals = [];
  items = walk(items, val => {
    const res = { val };
    vals.push(res);
    return res;
  });

  while (true) {
    // print(items);

    let exploded = false;
    items = explode(items, 0, ([a, b]) => {
      if (exploded) return [a, b]; // only do one replace per cycle
      exploded = 1;
      const id = vals.findIndex(val => val === a);
      const prev = vals[id - 1];
      const next = vals[id + 2];
      if (prev) prev.val += a.val;
      if (next) next.val += b.val;
      a.val = 0; // a becomes 0
      vals.splice(id + 1, 1); // remove b
      return a;
    });
    if (exploded) continue;

    let splitted = false;
    items = split(items, (a) => {
      if (splitted) return a; // only do one replace per cycle
      splitted = 1;
      const id = vals.findIndex(val => val === a);
      const { val } = a;
      a.val = Math.floor(val / 2); // value becomes a
      const b = { val: Math.ceil(val / 2) };
      vals.splice(id + 1, 0, b); // insert b
      return [a, b];
    });

    if (splitted) continue;
    break;
  }

  items = walk(items, ({ val }) => val);
  return JSON.stringify(items);
}

const explode = (items, nest = 0, cb) => {
  if (!items.length) return items;
  const [a, b] = items;
  if (!a.length && !b.length && nest >= 4) {
    return cb(items);
  }
  return items.map(i => explode(i, nest + 1, cb))
}

const split = (item, cb) => {
  if (item.length) return item.map(i => split(i, cb));
  if (item.val >= 10) return cb(item);
  return item;
}

const sum = (lines => {
  let first = lines.shift();
  while (lines.length) {
    const second = lines.shift();
    first = process(`[${first},${second}]`);
  }
  return first;
})

const mag = item => {
  const data = JSON.parse(item);
  const process = i => {
    if (i.length !== undefined) return process(i[0]) * 3 + process(i[1]) * 2;
    return i;
  }

  return process(data);
}

const work = list => {
  let result = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (i === j) continue;

      const m = mag(process(`[${list[i]},${list[j]}]`));
      result = Math.max(m, result);
      // console.log(i, j, m);
    }
  }
  return result;
}

const test = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.trim().split("\n");

assert(work(test), 3993);
assert(work(file('input.txt')), 4775);