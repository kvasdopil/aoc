const { file, assert } = require('../../utils')

const parse = (lines) => {
  const game = lines.shift().split(",").map(i => parseInt(i, 10));
  const boards = [];
  while (lines.length) {
    lines.shift(); // empty line
    const board = [
      lines.shift(),
      lines.shift(),
      lines.shift(),
      lines.shift(),
      lines.shift(),
    ];
    boards.push(board.map(line => line.trim().split(/[ ]+/).map(i => parseInt(i, 10))));
  }
  return { boards, game };
}

const play = (board, num) => {
  for (const line of board)
    for (const id in line)
      if (line[id] === num)
        line[id] = 'X';
}

const check = (board) => {
  for (const line of board)
    if (line.every(char => char === 'X')) return true;
  for (const char in board[0])
    if (board.every(line => line[char] === 'X')) return true;
  return false;
}

const score = (board) =>
  board
    .map(line => line.reduce((sum, char) => char === 'X' ? sum : sum + char, 0))
    .reduce((sum, line) => sum + line, 0)

const work = (lines) => {
  const { boards, game } = parse(lines);
  while (game.length) {
    const num = game.shift();
    for (const board of boards) {
      play(board, num);
      if (check(board)) return num * score(board);
    }
  }
}

const test = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`.trim().split("\n");

assert(work(test), 4512);
assert(work(file('input.txt')), 71708);