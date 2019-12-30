const { assert, file } = require("../../utils");

const map = file("./18.txt").map(line => line.split(""));

const fx = () => {
  for (let y = 1; y < map.length - 2; y++) {
    for (let x = 1; x < map[y].length - 2; x++) {
      if (map[y][x] === ".") {
        const ns = [
          map[y + 1][x],
          map[y - 1][x],
          map[y][x + 1],
          map[y][x - 1]
        ].filter(a => a === "#");
        if (ns.length === 3) {
          map[y][x] = "#";
          return true;
        }
      }
    }
  }
  return false;
};

while (fx()) {}

map.map(line => console.log(line.join("").replace(/#/g, " ")));
