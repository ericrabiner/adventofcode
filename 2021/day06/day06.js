const fs = require("fs");
const data = fs.readFileSync("./2021/day06/day06.txt", "utf-8");
const input = data.split(",").map((fish) => +fish);

const NUM_DAYS = 256;

const school = Array.from({ length: 9 }, () => 0);

input.forEach((fish) => {
  school[fish] += 1;
});

let currentDay = 0;
let totalFish = input.length;
while (NUM_DAYS > currentDay) {
  const newFish = school[0];
  school[0] = school[1];
  school[1] = school[2];
  school[2] = school[3];
  school[3] = school[4];
  school[4] = school[5];
  school[5] = school[6];
  school[6] = school[7];
  school[7] = school[8];
  school[6] += newFish;
  school[8] = newFish;

  totalFish += newFish;
  currentDay++;
}

console.log(totalFish);
