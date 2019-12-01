function parse(line) {
  const data = line
    .replace(/[.=,]/g, " ")
    .replace(/\s+/g, " ")
    .split(" ");
  const p1a = `${data[0]}a`;
  const p1b = `${data[0]}b`;
  const p2a = `${data[2]}a`;
  const p2b = `${data[2]}b`;
  return {
    [p1a]: parseInt(data[1], 10),
    [p1b]: parseInt(data[1], 10),
    [p2a]: parseInt(data[3], 10),
    [p2b]: parseInt(data[4], 10)
  };
}

function buildMap(input) {
  const xmin = input.reduce((res, item) => Math.min(res, item.xa), 9999) - 1;
  const xmax = input.reduce((res, item) => Math.max(res, item.xb), -9999) + 2;
  const ymin = 1; // input.reduce((res, item) => Math.min(res, item.ya), 9999) - 1;
  const ymax = input.reduce((res, item) => Math.max(res, item.yb), -9999) + 2;

  const result = Array(ymax - ymin)
    .fill(0)
    .map(() => Array(xmax - xmin).fill(" "));

  for (const inp of input) {
    for (let y = inp.ya; y <= inp.yb; y++) {
      for (let x = inp.xa; x <= inp.xb; x++) {
        result[y - ymin][x - xmin] = "#";
      }
    }
  }

  result[0][500 - xmin] = "v";

  return result;
}

function print(field) {
  console.log(field.map(line => line.join("")).join("\n"));
}

function findAll(field, letter) {
  const result = [];
  for (let y = field.length - 1; y >= 0; y--) {
    for (let x = field[y].length - 1; x >= 0; x--) {
      if (field[y][x] === letter) {
        result.push({ x, y });
      }
    }
  }
  return result;
}

function walkDown(field, starts) {
  const maxy = field.length - 1;

  starts.forEach(start => {
    let { x, y } = start;
    field[y][x] = "|";

    while (y < maxy && field[y + 1][x] !== "#") {
      y++;
      field[y][x] = "|";
    }

    if (y === maxy) {
      return;
    }

    field[y][x] = "x";
  });
}

function walkSideways(field, starts) {
  const cleanups = [];
  starts.forEach(start => {
    let { x, y } = start;

    let added = 0;
    let vadded = 0;

    while (
      (field[y][x - 1] === " " || field[y][x - 1] === "~") &&
      field[y + 1][x - 1] === "#"
    ) {
      x--;
      field[y][x] = "~";
    }

    if (field[y][x - 1] === " ") {
      x--;
      field[y][x] = "v";
      vadded++;
    }
    if (field[y][x - 1] !== "#") {
      added++;
    }

    x = start.x;
    while (
      (field[y][x + 1] === " " || field[y][x + 1] === "~") &&
      field[y + 1][x + 1] === "#"
    ) {
      x++;
      field[y][x] = "~";
    }

    if (field[y][x + 1] === " ") {
      x++;
      field[y][x] = "v";
      vadded++;
    }

    if (field[y][x + 1] !== "#") {
      added++;
    }

    field[y][start.x] = "~";
    if (!added) {
      walkFlood(field, start);
    }
    if (vadded) {
      cleanups.push(start);
    }
  });

  cleanups.forEach(cl => cleanupXF(field, cl));
}

function cleanupXF(field, start) {
  //console.log("before");
  let { x, y } = start;
  //const old = field[y][x];
  //field[y][x] = "S";
  //print(field);
  //field[y][x] = old;
  if (y == 0) {
    return;
  }
  while (field[y][x - 1] && x >= 0) {
    x--;
    if (field[y][x] === "x") {
      field[y][x] = "P";
    }
    // if (field[y][x] === "v") {
    //   field[y][x] = "|";
    // }
    if (field[y - 1][x] === "x") {
      field[y - 1][x] = "P";
    }
    // if (field[y - 1][x] === "v") {
    //   field[y - 1][x] = "|";
    // }
  }
  x = start.x;
  while (field[y][x + 1] && x < field[y].length) {
    x++;
    if (field[y][x] === "x") {
      field[y][x] = "P";
    }
    // if (field[y][x] === "v") {
    //   field[y][x] = "|";
    // }
    if (field[y - 1][x] === "x") {
      field[y - 1][x] = "P";
    }
    // if (field[y - 1][x] === "v") {
    //   field[y - 1][x] = "|";
    // }
  }
  //console.log("after");
  //print(field);
}

function walkFlood(field, start) {
  let { x, y } = start;
  field[y][x] = "#";
  if (field[y - 1][x] === "|") {
    field[y - 1][x] = "x";
  }
  while (field[y][x - 1] == "~") {
    x--;
    field[y][x] = "#";
    if (field[y - 1][x] === "|") {
      field[y - 1][x] = "x";
    }
  }
  x = start.x;
  while (field[y][x + 1] == "~") {
    x++;
    field[y][x] = "#";
    if (field[y - 1][x] === "|") {
      field[y - 1][x] = "x";
    }
  }
}

function solve(field) {
  const orig = field.map(line => line.map(a => a));
  let count = 0;
  while (true) {
    const vs = findAll(field, "v");
    const xs = findAll(field, "x");

    if (vs.length === 0 && xs.length === 0) {
      break;
    }
    walkDown(field, findAll(field, "v"));
    walkSideways(field, findAll(field, "x"));
    count++;
    // if (count > 620) {
    //   break;
    // }
    // print(field);
  }

  let ct = 0;
  for (let y = 0; y < field.length - 1; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] !== orig[y][x]) {
        ct++;
        if (orig[y][x] !== "#" && field[y][x] === "#") {
          field[y][x] = ".";
        }
      }
    }
  }
  print(field);
  return ct;
}

const testInput = [
  "x=495, y=2..7",
  "y=7, x=495..501",
  "x=501, y=3..7",
  "x=498, y=2..4",
  "x=506, y=1..2",
  "x=498, y=10..13",
  "x=504, y=10..13",
  "y=13, x=498..504"
].map(parse);

const field = buildMap(testInput);
console.log(solve(field));

// ==========

const testInput2 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7"
].map(parse);

const field2 = buildMap(testInput2);
console.log(solve(field2));

// ==========

const testInput3 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=505, y=5..7",
  "y=7, x=495..505"
].map(parse);

const field3 = buildMap(testInput3);
console.log(solve(field3));

// ==========

const testInput4 = [
  "x=490, y=2..10",
  "x=510, y=2..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=505, y=5..7",
  "y=7, x=495..505",
  "y=3, x=495..505"
].map(parse);

const field4 = buildMap(testInput4);
console.log(solve(field4));

// ==========

const testInput5 = [
  "x=490, y=2..10",
  "x=510, y=3..10",
  "y=10, x=490..510",
  "x=495, y=5..7",
  "x=500, y=5..7",
  "y=7, x=495..500"
].map(parse);

const field5 = buildMap(testInput5);
console.log(solve(field5));

// ==========

const testInput6 = [
  "x=490, y=2..10",
  "x=510, y=3..10",
  "y=10, x=490..500",
  "x=495, y=5..7",
  "x=500, y=5..7",
  "y=7, x=495..500"
].map(parse);

console.log(solve(buildMap(testInput6)));

// ==========

const testInput7 = [
  "y=2, x=498..503",
  "x=495, y=5..10",
  "x=507, y=6..10",
  "y=10, x=495..507",
  "x=499, y=5..8"
  //"x=500, y=5..7"
].map(parse);

console.log(solve(buildMap(testInput7)));

const file = require("fs")
  .readFileSync("17.txt")
  .toString()
  .split("\n")
  .map(parse);

const fieldBig = buildMap(file);
console.log(solve(fieldBig));

// 229406 hi
// 30389 hi
// 27485 no
