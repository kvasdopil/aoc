function assert(a, b) {
  if (JSON.stringify(a) != JSON.stringify(b)) {
    console.log("FAIL", a, "!=", b);
    return;
  }
  console.log("PASS");
}

function solve(cmd, size) {
  const list = Array(size)
    .fill(0)
    .map((a, i) => i);

  let pos = 0;
  let skip = 0;
  while (cmd.length) {
    let len = cmd.shift();
    let end = pos + len - 1;
    let endNext = pos + len;

    while (pos < end) {
      const v1 = list[pos % list.length];
      const v2 = list[end % list.length];
      list[pos % list.length] = v2;
      list[end % list.length] = v1;
      pos++;
      end--;
    }
    pos = (endNext + skip) % list.length;
    skip++;
  }
  return list;
}

assert(solve([3, 4, 1, 5], 5), [3, 4, 2, 1, 0]);

const data = [
  120,
  93,
  0,
  90,
  5,
  80,
  129,
  74,
  1,
  165,
  204,
  255,
  254,
  2,
  50,
  113
];

const res = solve(data, 256);
console.log(res[0] * res[1]);
