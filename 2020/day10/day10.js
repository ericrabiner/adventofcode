const fs = require("fs");
const data = fs.readFileSync("./day10/day10.txt", "utf-8");

const lines = data
  .split(/\r?\n/)
  .map((l) => parseInt(l))
  .sort((a, b) => a - b);

const partOne = () => {
  let jolt_1_num = 0;
  let jolt_3_num = 1; // One for device always having 3 jolts
  lines.forEach((line, i) => {
    let diff = 0;
    if (i === 0) {
      diff = line - 0;
    } else {
      diff = line - lines[i - 1];
    }
    if (diff === 3) jolt_3_num++;
    if (diff === 1) jolt_1_num++;
  });
  console.log("jolt_1_num", jolt_1_num);
  console.log("jolt_3_num", jolt_3_num);
  console.log("part one:", jolt_1_num * jolt_3_num);
};

partOne();

const partTwo = () => {
  const cloneLines = [...lines];
  cloneLines.unshift(0);
  const ways = Array(cloneLines.length).fill(0);
  ways[0] = 1;
  for (let i = 0; i < ways.length; i++) {
    for (let j = i - 3; j < i; j++) {
      if (cloneLines[i] <= cloneLines[j] + 3) {
        ways[i] += ways[j];
      }
    }
  }
  console.log("part two:", ways[ways.length - 1]);
};

partTwo();
