function knot(cmd, size) {
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

function hash(line) {
  const data = Array.from(line)
    .map(a => a.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);

  const solution = knot(data, 256);

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

module.exports = { hash };
