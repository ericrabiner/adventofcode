const fs = require("fs");
const data = fs.readFileSync("./day11/day11.txt", "utf-8");

const lines = data.split(/\r?\n/);

const occupied = "#";
const empty = "L";
const floor = ".";

const getAdjacentSeats = (matrix, x, y) => {
  const topLeft = getSeatAtPos(matrix, x - 1, y - 1);
  const top = getSeatAtPos(matrix, x, y - 1);
  const topRight = getSeatAtPos(matrix, x + 1, y - 1);
  const right = getSeatAtPos(matrix, x + 1, y);
  const bottomRight = getSeatAtPos(matrix, x + 1, y + 1);
  const bottom = getSeatAtPos(matrix, x, y + 1);
  const bottomLeft = getSeatAtPos(matrix, x - 1, y + 1);
  const left = getSeatAtPos(matrix, x - 1, y);

  return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
};

const getSeatAtPos = (matrix, x, y) => {
  try {
    return matrix[y][x] || null;
  } catch (err) {
    return null;
  }
};

const partOne = () => {
  let simulationData = simulatePartOne(lines.map((line) => line.split("")));

  let i = 1;
  console.log("loop:", i);
  while (simulationData.changes) {
    i++;
    simulationData = simulatePartOne(simulationData.matrix);
    console.log("loop:", i);
  }
  let sum = 0;

  simulationData.matrix.forEach((row) =>
    row.forEach((pos) => {
      if (pos === occupied) sum++;
    })
  );
  console.log("part one:", sum);
};

const simulatePartOne = (matrix) => {
  const newMatrix = [];
  let changes = 0;
  //   console.table(matrix);

  matrix.forEach((line, i) => {
    const newLine = [];
    line.forEach((pos, j) => {
      const adjSeats = getAdjacentSeats(matrix, j, i);

      const countMap = new Map(
        [...new Set(adjSeats)].map((x) => [
          x,
          adjSeats.filter((y) => y === x).length,
        ])
      );

      if (getSeatAtPos(matrix, j, i) === empty && !countMap.get(occupied)) {
        newLine.push(occupied);
        changes++;
      } else if (
        getSeatAtPos(matrix, j, i) === occupied &&
        countMap.get(occupied) &&
        countMap.get(occupied) >= 4
      ) {
        newLine.push(empty);
        changes++;
      } else if (getSeatAtPos(matrix, j, i) === floor) {
        newLine.push(floor);
      } else {
        newLine.push(pos);
      }
    });
    newMatrix.push(newLine);
  });
  return { matrix: newMatrix, changes };
};

const partTwo = () => {
  let simulationData = simulatePartTwo(lines.map((line) => line.split("")));

  let i = 1;
  console.log("loop:", i);
  while (simulationData.changes) {
    i++;
    simulationData = simulatePartTwo(simulationData.matrix);
    console.log("loop:", i);
  }
  let sum = 0;

  simulationData.matrix.forEach((row) =>
    row.forEach((pos) => {
      if (pos === occupied) sum++;
    })
  );
  console.log("part two:", sum);
};

const getVisibleSeats = (matrix, x, y) => {
  // top left
  let i = 1;
  let stopI = false;
  let topLeft;
  while (!stopI) {
    topLeft = getSeatAtPos(matrix, x - i, y - i);
    if (topLeft === null || topLeft === empty || topLeft === occupied) {
      stopI = true;
    }
    i++;
  }

  // top
  let j = 1;
  let stopJ = false;
  let top;
  while (!stopJ) {
    top = getSeatAtPos(matrix, x, y - j);
    if (top === null || top === empty || top === occupied) {
      stopJ = true;
    }
    j++;
  }

  // top right
  let k = 1;
  let stopK = false;
  let topRight;
  while (!stopK) {
    topRight = getSeatAtPos(matrix, x + k, y - k);
    if (topRight === null || topRight === empty || topRight === occupied) {
      stopK = true;
    }
    k++;
  }

  // right
  let l = 1;
  let stopL = false;
  let right;
  while (!stopL) {
    right = getSeatAtPos(matrix, x + l, y);
    if (right === null || right === empty || right === occupied) {
      stopL = true;
    }
    l++;
  }

  // bottom right
  let m = 1;
  let stopM = false;
  let bottomRight;
  while (!stopM) {
    bottomRight = getSeatAtPos(matrix, x + m, y + m);
    if (
      bottomRight === null ||
      bottomRight === empty ||
      bottomRight === occupied
    ) {
      stopM = true;
    }
    m++;
  }

  // bottom
  let n = 1;
  let stopN = false;
  let bottom;
  while (!stopN) {
    bottom = getSeatAtPos(matrix, x, y + n);
    if (bottom === null || bottom === empty || bottom === occupied) {
      stopN = true;
    }
    n++;
  }

  // bottom left
  let o = 1;
  let stopO = false;
  let bottomLeft;
  while (!stopO) {
    bottomLeft = getSeatAtPos(matrix, x - o, y + o);
    if (
      bottomLeft === null ||
      bottomLeft === empty ||
      bottomLeft === occupied
    ) {
      stopO = true;
    }
    o++;
  }

  // left
  let p = 1;
  let stopP = false;
  let left;
  while (!stopP) {
    left = getSeatAtPos(matrix, x - p, y);
    if (left === null || left === empty || left === occupied) {
      stopP = true;
    }
    p++;
  }

  return [topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left];
};

const simulatePartTwo = (matrix) => {
  const newMatrix = [];
  let changes = 0;
  matrix.forEach((line, i) => {
    const newLine = [];
    line.forEach((pos, j) => {
      const visibleSeats = getVisibleSeats(matrix, j, i);

      const countMap = new Map(
        [...new Set(visibleSeats)].map((x) => [
          x,
          visibleSeats.filter((y) => y === x).length,
        ])
      );

      if (getSeatAtPos(matrix, j, i) === empty && !countMap.get(occupied)) {
        newLine.push(occupied);
        changes++;
      } else if (
        getSeatAtPos(matrix, j, i) === occupied &&
        countMap.get(occupied) &&
        countMap.get(occupied) >= 5
      ) {
        newLine.push(empty);
        changes++;
      } else if (getSeatAtPos(matrix, j, i) === floor) {
        newLine.push(floor);
      } else {
        newLine.push(pos);
      }
    });
    newMatrix.push(newLine);
  });
  return { matrix: newMatrix, changes };
};

// partOne();
partTwo();
