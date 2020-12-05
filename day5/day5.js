const fs = require("fs");
const data = fs.readFileSync("./day5/day5.txt", "utf-8");

const lines = data.split(/\r?\n/);

const seats = [];

lines.forEach((line, i) => {
  let rowMin = 0;
  let rowMax = 127;
  let colMin = 0;
  let colMax = 7;
  line.split("").forEach((char, j) => {
    if (j <= 6) {
      const range = Math.pow(2, 6 - j);
      if (char === "B") {
        rowMin += range;
      }
      if (char === "F") {
        rowMax -= range;
      }
    } else if (j <= 10) {
      const range = Math.pow(2, 9 - j);
      if (char === "R") {
        colMin += range;
      }
      if (char === "L") {
        colMax -= range;
      }
    }
  });
  const seatId = rowMin * 8 + colMin;
  seats.push(seatId);
});

seats.sort((a, b) => a - b);

console.log("maxSeatId:", seats[seats.length - 1]);

seats.forEach((seat, i) => {
  if (seat + 1 !== seats[i + 1] && i + 1 !== seats.length) {
    console.log("mySeatId:", seat + 1);
  }
});
