const { assert, file } = require("../../utils");

function* pattern(n) {
  const pat = [0, 1, 0, -1];
  let a = 0;
  let b = 1;

  while (true) {
    while (b < n) {
      yield pat[a % 4];
      b++;
    }
    b = 0;
    a++;
  }
}

const process = input =>
  input.map((_, n) => {
    const p = pattern(n + 1);
    const v = input.reduce((res, val) => res + val * p.next().value, 0);
    return Math.abs(v) % 10;
  });

const solve = (input, count) => {
  let val = input.split("").map(n => parseInt(n, 10));
  for (let i = 0; i < count; i++) {
    val = process(val);
  }
  return val.join("");
};

assert(solve("12345678", 1), "48226158");
assert(solve("12345678", 2), "34040438");
assert(solve("12345678", 3), "03415518");
assert(solve("12345678", 4), "01029498");

assert(
  solve("80871224585914546619083218645595", 100),
  "24176176480919046114038763195595"
); // 24176176
assert(
  solve("19617804207202209144916044189917", 100),
  "73745418557257259149466599639917"
); // 73745418
assert(
  solve("69317163492948606335995924319873", 100),
  "52432133292998606880495974869873"
); // 52432133

console.log(solve(file("./16.txt")[0], 100));
