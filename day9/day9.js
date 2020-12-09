const fs = require("fs");
const data = fs.readFileSync("./day9/day9.txt", "utf-8");

const lines = data.split(/\r?\n/);

const partOne = (preambleSize) => {
  const nums = lines.map((line) => parseInt(line));
  let foundNum = null;
  nums.forEach((num, i) => {
    if (preambleSize - 1 < i) {
      const preamble = nums.slice(i - preambleSize, i);
      let found = false;
      preamble.forEach((x) => {
        preamble.forEach((y) => {
          if (x + y === num) {
            found = true;
          }
        });
      });
      if (!found) {
        foundNum = num;
      }
    }
  });
  return foundNum;
};

// console.log(partOne(25));

const partTwo = () => {
  const nums = lines.map((line) => parseInt(line));
  const brokenNum = partOne(25);
  console.log("Broken num", brokenNum);

  nums.forEach((_, i) => {
    let sum = 0;
    const contiguousSet = [];
    nums.forEach((_, j) => {
      sum += nums[i + j];
      contiguousSet.push(nums[i + j]);
      if (sum === brokenNum && contiguousSet.length > 1) {
        console.log("contiguousSet", contiguousSet);
        console.log("smallest", Math.min(...contiguousSet));
        console.log("largest", Math.max(...contiguousSet));
        console.log(
          "range",
          Math.min(...contiguousSet) + Math.max(...contiguousSet)
        );
      }
    });
  });
};

partTwo();
