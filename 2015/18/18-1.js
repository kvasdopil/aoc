const fs = require("fs");

function print(field, size) {
  const result = [];
  for (let y = 0; y < size; y++) {
    const line = [];
    for (let x = 0; x < size; x++) {
      line.push(field[x + y * size] ? "#" : ".");
    }
    result.push(line.join(""));
  }

  return result;
}

function read(lines) {
  return Array.from(lines.join("")).map(i => (i === "#" ? 1 : 0));
}

function step(field, size) {
  return field.map((item, i) => {
    const x = i % size;
    const score = [
      x > 0 ? field[i - 1] : 0,
      x < size - 1 ? field[i + 1] : 0,
      field[i - size],
      field[i + size],
      x > 0 ? field[i - size - 1] : 0,
      x < size - 1 ? field[i - size + 1] : 0,
      x > 0 ? field[i + size - 1] : 0,
      x < size - 1 ? field[i + size + 1] : 0
    ]
      .map(i => i || 0)
      .reduce((sum, el) => sum + el, 0);
    if (item) {
      return score === 2 || score === 3 ? 1 : 0;
    }

    return score === 3 ? 1 : 0;
  });
}

const init = [".#.#.#", "...##.", "#....#", "..#...", "#.#..#", "####.."];
let field = read(init);

console.log();
console.log(print(field, 6).join("\n"));

console.log();
field = step(field, 6);
console.log(print(field, 6).join("\n"));

console.log();
field = step(field, 6);
console.log(print(field, 6).join("\n"));

console.log();
field = step(field, 6);
console.log(print(field, 6).join("\n"));

console.log();
field = step(field, 6);
console.log(print(field, 6).join("\n"));

const file = fs
  .readFileSync("./18.txt")
  .toString()
  .split("\n");

field = read(file);
for (let i = 0; i < 100; i++) {
  field = step(field, 100);
}

console.log(field.filter(i => i).length);
