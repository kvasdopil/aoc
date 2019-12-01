function solve(data, target) {
  let result = [];
  for (let i = 0; i < Math.pow(2, data.length); i++) {
    const res = data.reduce(
      (sum, el, j) => sum + (i & Math.pow(2, j) ? el : 0),
      0
    );
    const count = data.reduce(
      (sum, el, j) => sum + (i & Math.pow(2, j) ? 1 : 0),
      0
    );
    if (res == target) {
      result.push({ i, res, count });
    }
  }

  return result;
}

function count(solutions) {
  const min = solutions.reduce((res, sol) => Math.min(res, sol.count), 99999);

  return solutions.filter(sol => sol.count === min).length;
}

const init = [20, 15, 10, 5, 5];
const res = solve(init, 25);
console.log(count(res));

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

const res2 = solve(data, 150);
console.log(count(res2));
