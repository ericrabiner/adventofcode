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
    return matrix[y][x];
  } catch (err) {
    return null;
  }
};

const partOne = () => {
  let simulationData = simulate(lines.map((line) => line.split("")));

  let i = 1;
  console.log("loop:", i);
  while (simulationData.changes) {
    i++;
    simulationData = simulate(simulationData.matrix);
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

const simulate = (matrix) => {
  const newMatrix = [];
  let changes = 0;

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

partOne();
