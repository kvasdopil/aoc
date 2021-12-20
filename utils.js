const assert = (a, b = true) => {
  if (JSON.stringify(a) === JSON.stringify(b)) {
    console.log("test passed");
  } else {
    console.log("test failed", a, "!=", b);
  }
};

const file = name =>
  require("fs")
    .readFileSync(name)
    .toString()
    .split("\n");

const uniq = input =>
  Object.keys(input.reduce((res, a) => ({ ...res, [a]: 1 }), {}));

function permutation(array) {
  // Find non-increasing suffix
  var i = array.length - 1;
  while (i > 0 && array[i - 1] >= array[i])
    i--;
  if (i <= 0)
    return false;

  // Find successor to pivot
  var j = array.length - 1;
  while (array[j] <= array[i - 1])
    j--;
  var temp = array[i - 1];
  array[i - 1] = array[j];
  array[j] = temp;

  // Reverse suffix
  j = array.length - 1;
  while (i < j) {
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    i++;
    j--;
  }
  return true;
}

const array2d = (x, y) => Array.from(Array(y)).map(line => Array.from(Array(x)).fill(0));

module.exports = { assert, file, uniq, permutation, array2d };
