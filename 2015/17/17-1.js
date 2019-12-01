function solve(data, target) {
  let result = [];
  for (let i = 0; i < Math.pow(2, data.length); i++) {
    const res = data.reduce(
      (sum, el, j) => sum + (i & Math.pow(2, j) ? el : 0),
      0
    );
    if (res == target) {
      result.push({ i, res });
    }
  }

  return result;
}

const init = [20, 15, 10, 5, 5];
console.log(solve(init, 25));

const data = [
  43,
  3,
  4,
  10,
  21,
  44,
  4,
  6,
  47,
  41,
  34,
  17,
  17,
  44,
  36,
  31,
  46,
  9,
  27,
  38
];

console.log(solve(data, 150).length);
