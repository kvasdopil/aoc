function calc(x, y) {
  let sum = 0;

  while (x > 1) {
    x--;
    y++;
    sum++;
  }

  while (y > 1) {
    y--;
    sum += y;
  }

  // return sum + 1;
  return seq(sum + 1);
}

function seq(n) {
  let i = 20151125;
  while (n > 1) {
    n--;
    i = (i * 252533) % 33554393;
  }

  return i;
}

for (let y = 1; y <= 6; y++) {
  const line = [];
  for (let x = 1; x <= 6; x++) {
    line.push(calc(x, y));
  }
  console.log(line);
}

console.log(calc(3083, 2978));
//console.log(nr);
