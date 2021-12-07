const fs = require("fs");

const crabs = fs
  .readFileSync("./2021/day07/sample.txt", "utf-8")
  .split(",")
  .map((x) => +x)
  .sort((a, b) => a - b);

const median = crabs[crabs.length / 2];
const avg = Math.round(crabs.reduce((prv, cur) => prv + cur, 0) / crabs.length);
const avgLower = avg - 1;
const avgUpper = avg + 1;

let fuelPartOne = 0;
let fuelPartTwo = 0;
let fuelPartTwoLower = 0;
let fuelPartTwoUpper = 0;

for (const crab of crabs) {
  const distanceOne = Math.abs(crab - median);
  const distanceTwo = Math.abs(crab - avg);
  const distanceLower = Math.abs(crab - avgLower);
  const distanceUpper = Math.abs(crab - avgUpper);

  fuelPartOne += distanceOne;
  fuelPartTwo += (distanceTwo * (distanceTwo + 1)) / 2;
  fuelPartTwoLower += (distanceLower * (distanceLower + 1)) / 2;
  fuelPartTwoUpper += (distanceUpper * (distanceUpper + 1)) / 2;
}

console.log(`part 1: ${fuelPartOne}`);
console.log(
  `part 2: ${Math.min(fuelPartTwo, fuelPartTwoLower, fuelPartTwoUpper)}`
);
