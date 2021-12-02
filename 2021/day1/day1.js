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
    let a = +lines[i];
    let b = +lines[i + 1];
    let c = +lines[i + 2];
    let d = +lines[i + 3];
    let prvSum = a + b + c;
    let curSum = b + c + d;
    if (curSum > prvSum) {
      inc++;
    }
  }
  console.log(`part 2: ${inc}`);
};

partOne();
partTwo();
