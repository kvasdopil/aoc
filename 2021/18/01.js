const { file, assert } = require('../../utils')

const walk = (item, cb) => {
  if (item.length === undefined) return cb(item);
  return item.map(i => walk(i, cb));
}

const print = (a) => {
  console.log(JSON.stringify(walk(a, ({ val }) => val)));
}

const work = (lines) => {
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
    first = work(`[${first},${second}]`);
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

assert(work("[[[[[9,8],1],2],3],4]"), "[[[[0,9],2],3],4]");
assert(work("[7,[6,[5,[4,[3,2]]]]]"), "[7,[6,[5,[7,0]]]]");
assert(work("[[6,[5,[4,[3,2]]]],1]"), "[[6,[5,[7,0]]],3]");
assert(work("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"), "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");

assert(work("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"), "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");

const t1 = `[1,1]
[2,2]
[3,3]
[4,4]`.trim().split("\n");
assert(sum(t1), "[[[[1,1],[2,2]],[3,3]],[4,4]]");

const t2 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]`.trim().split("\n");
assert(sum(t2), "[[[[3,0],[5,3]],[4,4]],[5,5]]");

const t3 = `[1,1]
[2,2]
[3,3]
[4,4]
[5,5]
[6,6]`.trim().split("\n");
assert(sum(t3), "[[[[5,0],[7,4]],[5,5]],[6,6]]");

const t4 = `[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
[7,[5,[[3,8],[1,4]]]]
[[2,[2,2]],[8,[8,1]]]
[2,9]
[1,[[[9,3],9],[[9,0],[0,7]]]]
[[[5,[7,4]],7],1]
[[[[4,2],2],6],[8,7]]`.trim().split("\n");
assert(sum(t4), "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");

assert(mag("[[1,2],[[3,4],5]]"), 143);
assert(mag("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"), 1384);
assert(mag("[[[[1,1],[2,2]],[3,3]],[4,4]]"), 445);
assert(mag("[[[[3,0],[5,3]],[4,4]],[5,5]]"), 791);
assert(mag("[[[[5,0],[7,4]],[5,5]],[6,6]]"), 1137);
assert(mag("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"), 3488);

const t5 = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`.trim().split("\n");
assert(mag(sum(t5)), 4140);

assert(mag(sum(file('input.txt'))), 3665)