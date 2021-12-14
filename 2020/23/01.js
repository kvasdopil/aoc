const { file, assert } = require('../../utils')

const find = (start, value) => {
  let val = value;
  let cur = start;
  while (cur.val !== val) {
    cur = cur.next;
    if (cur === start) {
      val = (val <= 1) ? 9 : val - 1;
    }
  }
  return cur;
}

const print = start => {
  const result = [];
  let cur = start;
  while (true) {
    result.push(cur.val);
    cur = cur.next;
    if (cur === start) return result.join('');
  }
}

const work = (line, limit) => {
  const items = line.split('');
  const head = {};
  let cur = head;
  while (items.length) {
    cur.next = { val: parseInt(items.shift()), next: null };
    cur = cur.next;
  }
  cur.next = head.next;

  cur = head.next;
  let move = 1;
  while (move <= limit) {
    // console.log('move', move, 'current', cur.val, print(head.next, 1));
    const a = cur.next;
    const c = cur.next.next.next;
    cur.next = c.next;
    const dst = find(cur, cur.val - 1);
    // console.log('dst', dst.val);
    c.next = dst.next;
    dst.next = a;
    cur = cur.next;
    move++;
  }
  const first = find(cur, 1);
  return print(first);
}

assert(work('389125467', 10), "192658374");
assert(work('389125467', 100), "167384529");
assert(work('459672813', 100), "168245739");