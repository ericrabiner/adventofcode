const fs = require("fs");
const data = fs.readFileSync("./2021/day04/day04.txt", "utf-8");

const lines = data.split(/\r?\n/);

const setupBingo = (lines) => {
  const boards = [];
  let numbers = lines[0].split(",");
  let board = [];

  lines.shift();

  for (const line of lines) {
    if (line !== "") {
      board.push(line.split(" ").filter((num) => num !== ""));
    }
    if (board.length === 5) {
      boards.push(board);
      board = [];
    }
  }

  return { boards, numbers };
};

const drawNumber = (number, board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === number) {
        board[i][j] += "✔️";
      }
    }
  }
};

const transpose = (arr) => {
  const result = [];

  for (let i = 0; i < arr[0].length; i++) {
    const col = [];
    for (let j = 0; j < arr.length; j++) {
      col.push(arr[j][i]);
    }
    result.push(col);
  }

  return result;
};

const checkWinner = (board) => {
  for (const row of board) {
    if (row.every((num) => num.includes("✔️"))) {
      return true;
    }
  }

  const Tboard = transpose(board);
  for (const col of Tboard) {
    if (col.every((num) => num.includes("✔️"))) {
      return true;
    }
  }

  return false;
};

const partOne = () => {
  const { boards, numbers } = setupBingo([...lines]);

  let winningBoard = null;
  let winningNumber = -1;

  for (const number of numbers) {
    for (const board of boards) {
      if (!winningBoard) {
        drawNumber(number, board);
        if (checkWinner(board)) {
          winningBoard = board;
          winningNumber = number;
        }
      }
    }
  }

  let sum = 0;

  for (const row of winningBoard) {
    for (const num of row) {
      if (!num.includes("✔️")) {
        sum += +num;
      }
    }
  }

  console.log(`part 1: ${sum * winningNumber}`);
};

const partTwo = () => {
  const { boards, numbers } = setupBingo([...lines]);

  let noBoardsLeft = false;
  let winningBoardsIndexes = [];
  let winningNumber = -1;
  let missingIndex = -1;

  for (const number of numbers) {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      if (!noBoardsLeft) {
        drawNumber(number, board);

        if (checkWinner(board) && !winningBoardsIndexes.includes(i)) {
          winningBoardsIndexes.push(i);
          winningNumber = number;
        }

        if (winningBoardsIndexes.length === boards.length) {
          noBoardsLeft = true;
          missingIndex = i;
        }
      }
    }
  }

  const lastBoardToWin = boards[missingIndex];
  let sum = 0;
  for (const row of lastBoardToWin) {
    for (const num of row) {
      if (!num.includes("✔️")) {
        sum += +num;
      }
    }
  }

  console.log(`part 2: ${sum * winningNumber}`);
};

partOne();
partTwo();
