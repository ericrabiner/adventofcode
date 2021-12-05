const fs = require("fs");
const data = fs.readFileSync("./2021/day05/day05.txt", "utf-8");

const lines = data.split(/\r?\n/);

let largestX = 0;
let largestY = 0;
const regex = /(.+),(.+) -> (.+),(.+)/;

for (const line of lines) {
  const match = line.match(regex);
  const [_, x1, y1, x2, y2] = match;
  if (largestX < +x1) largestX = +x1;
  if (largestX < +x2) largestX = +x2;
  if (largestY < +y1) largestY = +y1;
  if (largestY < +y2) largestY = +y2;
}

let arr = Array.from({ length: largestX + 1 }, () =>
  Array.from({ length: largestY + 1 }, () => 0)
);

for (const line of lines) {
  const match = line.match(regex);
  const [_, _x1, _y1, _x2, _y2] = match;

  const x1 = +_x1;
  const y1 = +_y1;
  const x2 = +_x2;
  const y2 = +_y2;

  // vertical line
  if (x1 === x2) {
    let yDiff = y2 - y1;
    if (yDiff > 0) {
      for (let i = 0; i <= yDiff; i++) {
        arr[x1][i + y1]++;
      }
    } else {
      yDiff = Math.abs(yDiff);
      // console.log(yDiff, "small");
      for (let i = 0; i <= yDiff; i++) {
        arr[x1][i + y2]++;
      }
    }
  }

  // horizontal line
  if (y1 === y2) {
    let xDiff = x2 - x1;
    if (xDiff > 0) {
      for (let i = 0; i <= xDiff; i++) {
        arr[i + x1][y1]++;
      }
    } else {
      xDiff = Math.abs(xDiff);
      for (let i = 0; i <= xDiff; i++) {
        arr[i + x2][y1]++;
      }
    }
  }
  // diagonal line at 45 deg
  const slope = (y2 - y1) / (x2 - x1);
  if (slope === 1) {
    if (x2 - x1 > 0) {
      for (let i = 0; i <= x2 - x1; i++) {
        arr[i + x1][i + y1]++;
      }
    } else {
      for (let i = 0; i <= x1 - x2; i++) {
        arr[i + x2][i + y2]++;
      }
    }
  }

  if (slope === -1) {
    if (x2 - x1 > 0) {
      for (let i = 0; i <= x2 - x1; i++) {
        arr[x1 + i][y1 - i]++;
      }
    } else {
      for (let i = 0; i <= x1 - x2; i++) {
        arr[x1 - i][y1 + i]++;
      }
    }
  }
}

let count = 0;
for (const row of arr) {
  for (const num of row) {
    if (num >= 2) {
      count++;
    }
  }
}

console.log(`part 2: ${count}`);
