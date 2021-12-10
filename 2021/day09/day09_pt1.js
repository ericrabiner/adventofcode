const fs = require("fs");

const heightMap = fs
  .readFileSync("./2021/day09/day09.txt", "utf-8")
  .split(/\r?\n/);

let riskLevel = 0;

for (let i = 0; i < heightMap.length; i++) {
  for (let j = 0; j < heightMap[i].length; j++) {
    const currentHeight = heightMap[i][j];

    const top = heightMap?.[i - 1]?.[j] || Infinity;
    const below = heightMap?.[i + 1]?.[j] || Infinity;
    const right = heightMap?.[i]?.[j + 1] || Infinity;
    const left = heightMap?.[i]?.[j - 1] || Infinity;

    if (
      currentHeight < top &&
      currentHeight < below &&
      currentHeight < right &&
      currentHeight < left
    ) {
      riskLevel += +currentHeight + 1;
    }
  }
}

console.log(`part 1: ${riskLevel}`);
