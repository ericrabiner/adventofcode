const fs = require("fs");
const data = fs.readFileSync("./day1/day1.txt", "utf-8");

const lines = data.split(/\r?\n/);

const partOne = () => {
  let inc = 0;
  for (let i = 1; i < lines.length; i++) {
    const prv = +lines[i - 1];
    const cur = +lines[i];
    if (cur > prv) {
      inc++;
    }
  }
  console.log(`part 1: ${inc}`);
};

const partTwo = () => {
  let inc = 0;
  for (let i = 0; i < lines.length - 3; i++) {
    const a = +lines[i];
    const b = +lines[i + 1];
    const c = +lines[i + 2];
    const d = +lines[i + 3];
    const prvSum = a + b + c;
    const curSum = b + c + d;
    if (curSum > prvSum) {
      inc++;
    }
  }
  console.log(`part 2: ${inc}`);
};

partOne();
partTwo();
