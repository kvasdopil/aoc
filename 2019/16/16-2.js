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

// const process = input =>
//   input.map((_, n) => {
//     const p = pattern(n + 1);
//     const v = input.reduce((res, val) => res + val * p.next().value, 0);
//     return Math.abs(v) % 10;
//   });

const calculate = (numbers, n, generation) => {
  if (generation === 0) {
    return numbers[n];
  }

  let result = 0;
  const p = pattern(n + 1);
  for (let i = 0; i < numbers.length; i++) {
    const m = p.next().value;
    if (m > 0) {
      result += calculate(numbers, i, generation - 1);
    }
    if (m < 0) {
      result -= calculate(numbers, i, generation - 1);
    }
  }

  // let result = 0;
  // for (let i = 0; i < n; i++) {
  //   let j = n - 1 + i;
  //   while (j < numbers.length) {
  //     result += calculate(numbers, j, generation - 1);
  //     j += n * 4;
  //   }
  //   j = n + n + n + i - 1;
  //   while (j < numbers.length) {
  //     result -= calculate(numbers, j, generation - 1);
  //     j += n * 4;
  //   }
  // }

  return Math.abs(result) % 10;
};

const solve = (input, gen, start = 0, len = 8) => {
  const numbers = input.split("").map(n => parseInt(n, 10));

  const res = [];
  for (let i = 0; i < len; i++) {
    res.push(calculate(numbers, start + i, gen));
  }

  return res.join("");
};

assert(solve("12345678", 1), "48226158");
assert(solve("12345678", 2), "34040438");
assert(solve("12345678", 3), "03415518");
assert(solve("12345678", 4), "01029498");

assert(
  solve("80871224585914546619083218645595", 100),
  "24176176480919046114038763195595"
); // 24176176
// assert(
//   solve("19617804207202209144916044189917", 100),
//   "73745418557257259149466599639917"
// ); // 73745418
// assert(
//   solve("69317163492948606335995924319873", 100),
//   "52432133292998606880495974869873"
// ); // 52432133

// console.log(solve(file("./16.txt")[0].repeat(1), 100).substring(0, 8));
// console.log(solve(file("./16.txt")[0].repeat(2), 100).substring(0, 8));
// console.log(solve(file("./16.txt")[0].repeat(3), 100).substring(0, 8));
// console.log(solve(file("./16.txt")[0].repeat(4), 100).substring(0, 8));
