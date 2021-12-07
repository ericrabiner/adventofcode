const fs = require("fs");

const crabs = fs
  .readFileSync("./2021/day07/day07.txt", "utf-8")
  .split(",")
  .map((x) => +x);

const maxPos = Math.max(...crabs);

let fuelPartOne = Infinity;
let fuelPartTwo = Infinity;

for (let pos = 0; pos < maxPos; pos++) {
  const fuelOne = crabs.reduce((prv, cur) => prv + Math.abs(cur - pos), 0);

  const fuelTwo = crabs.reduce((prv, cur) => {
    const distance = Math.abs(cur - pos);
    return prv + (distance * (distance + 1)) / 2;
  }, 0);

  fuelPartOne = Math.min(fuelOne, fuelPartOne);
  fuelPartTwo = Math.min(fuelTwo, fuelPartTwo);
}

console.log(`part 1: ${fuelPartOne}`);
console.log(`part 2: ${fuelPartTwo}`);
