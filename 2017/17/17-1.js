const { assert } = require("../../utils");

const add = (item, val) => {
  item.next = { val, next: item.next };
};

const solve = (skip, limit) => {
  let start = { val: 0 };
  start.next = start;

  for (let n = 1; n <= limit; n++) {
    for (let i = 0; i < skip; i++) {
      start = start.next;
    }

    add(start, n);
    start = start.next;
  }
  return start.next.val;
};

assert(solve(3, 9), 5);

console.log(solve(363, 2017));
