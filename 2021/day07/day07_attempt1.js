const fs = require("fs");

const crabs = fs
  .readFileSync("./2021/day07/sample.txt", "utf-8")
  .split(",")
  .map((x) => +x)
  .sort((a, b) => a - b);

const median = crabs[crabs.length / 2];
const avg = Math.round(crabs.reduce((prv, cur) => prv + cur, 0) / crabs.length);

let fuelPartOne = 0;
let fuelPartTwo = 0;

for (const crab of crabs) {
  const distanceOne = Math.abs(crab - median);
  const distanceTwo = Math.abs(crab - avg);

  fuelPartOne += distanceOne;
  fuelPartTwo += (distanceTwo * (distanceTwo + 1)) / 2;
}

console.log(`part 1: ${fuelPartOne}`);
// Works for sample but not for day07.txt
console.log(`part 2: ${fuelPartTwo}`);
