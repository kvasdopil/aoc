const { assert } = require('../../utils')

const work = (line) => {
  const limit = 10000000;
  const items = line.split('');
  const head = {};
  let cur = head;
  let val = items.length + 1;
  while (items.length) {
    cur.next = { val: parseInt(items.shift()), next: null };
    cur = cur.next;
  }
  while (val <= 1000000) {
    cur.next = { val, next: null };
    cur = cur.next;
    val++;
  }
  cur.next = head.next;

  const links = Array.from(Array(1000000)).fill(0);
  let c = head.next;
  while (c != cur) {
    links[c.val] = c;
    c = c.next;
  }
  links[1000000] = cur;

  cur = head.next;
  let move = 1;
  while (move <= limit) {
    const a = cur.next;
    const b = cur.next.next;
    const c = cur.next.next.next;
    cur.next = c.next;

    val = cur.val;
    while (true) {
      val = val - 1;
      if (val <= 0) val = 1000000;
      if (val === a.val) continue;
      if (val === b.val) continue;
      if (val === c.val) continue;
      break;
    }

    const dst = links[val];
    if (!dst) {
      console.log('cant', val);
    }
    c.next = dst.next;
    dst.next = a;
    cur = cur.next;
    move++;
  }

  return links[1].next.val * links[1].next.next.val
}

assert(work('389125467'), 149245887792);
assert(work('459672813'), 219634632000);