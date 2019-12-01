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

  for (let i = 0; i < 64; i++) {
    const lengths = cmd.map(i => i);
    while (lengths.length) {
      let len = lengths.shift();
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
  }
  return list;
}

// console.log(solve([3, 4, 1, 5, 17, 31, 73, 47, 23], 5)); // , [3, 4, 2, 1, 0]);

function process(line) {
  const data = Array.from(line)
    .map(a => a.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);

  const solution = solve(data, 256);

  const hashes = Array(16)
    .fill(0)
    .map((a, i) =>
      Array(16)
        .fill(0)
        .map((b, j) => solution[i * 16 + j])
    );

  const short = hashes
    .map(array => pad(array.reduce((a, b) => a ^ b, 0).toString(16)))
    .join("");

  return short;
}

function pad(a) {
  if (a.length == 1) {
    return `0${a}`;
  }

  return a;
}

assert(process(""), "a2582a3a0e66e6e86e3812dcb672a272");
assert(process("AoC 2017"), "33efeb34ea91902bb2f59c9920caa6cd");
assert(process("1,2,3"), "3efbe78a8d82f29979031a4aa0b16a9d");
assert(process("1,2,4"), "63960835bcdc130f0b66d7ff4f6a5a8e");

console.log(process("120,93,0,90,5,80,129,74,1,165,204,255,254,2,50,113"));

// const res = solve(data, 256);
// console.log(res[0] * res[1]);
