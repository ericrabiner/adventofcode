const fs = require("fs");
const data = fs.readFileSync("./2021/day03/day03.txt", "utf-8");

const lines = data.split(/\r?\n/);

const transpose = function (arr) {
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

const partOne = () => {
  const matrix = lines.map((line) => line.split(""));
  const cols = transpose(matrix);

  let gammaRate = "";

  for (const col of cols) {
    let numOnes = 0;
    let numZeros = 0;
    for (const bit of col) {
      if (bit === "1") {
        numOnes++;
      } else {
        numZeros++;
      }
    }
    if (numZeros > numOnes) {
      gammaRate += "0";
    } else {
      gammaRate += "1";
    }
  }

  const epsilonRate = gammaRate
    .split("")
    .map((bit) => {
      if (bit === "0") return "1";
      return "0";
    })
    .join("");

  const gammaRateDec = parseInt(gammaRate, 2);
  const epsilonRateDec = parseInt(epsilonRate, 2);

  console.log(`part 1: ${gammaRateDec * epsilonRateDec}`);
};

const getMostCommonBitAtIndex = (index, lines) => {
  let ones = [];
  let zeros = [];
  for (const line of lines) {
    if (line[index] === "1") ones.push(line);
    else zeros.push(line);
  }
  if (ones.length >= zeros.length) return ones;
  return zeros;
};

const getLeastCommonBitAtIndex = (index, lines) => {
  let ones = [];
  let zeros = [];
  for (const line of lines) {
    if (line[index] === "1") ones.push(line);
    else zeros.push(line);
  }
  if (ones.length >= zeros.length) return zeros;
  return ones;
};

const partTwo = () => {
  let matrix = lines;

  // oxygen generator rating
  let currentBit = 0;
  while (matrix.length > 1) {
    matrix = getMostCommonBitAtIndex(currentBit, matrix);
    currentBit++;
  }
  const oxygenGeneratorRating = parseInt(matrix[0], 2);

  // CO2 scrubber rating
  currentBit = 0;
  matrix = lines;
  while (matrix.length > 1) {
    matrix = getLeastCommonBitAtIndex(currentBit, matrix);
    currentBit++;
  }
  const CO2ScrubberRating = parseInt(matrix[0], 2);

  console.log(`part 2: ${CO2ScrubberRating * oxygenGeneratorRating}`);
};

partOne();
partTwo();
