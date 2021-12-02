const fs = require("fs");
const data = fs.readFileSync("./2021/day02/day02.txt", "utf-8");

const lines = data.split(/\r?\n/);

const partOne = () => {
  let hor = 0;
  let dpt = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const num = +line.substr(line.length - 1);
    if (line.includes("forward")) {
      hor += num;
    }
    if (line.includes("up")) {
      dpt -= num;
    }
    if (line.includes("down")) {
      dpt += num;
    }
  }
  console.log(`part 1: ${hor * dpt}`);
};

const partTwo = () => {
  let hor = 0;
  let dpt = 0;
  let aim = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const num = +line.substr(line.length - 1);
    if (line.includes("forward")) {
      hor += num;
      dpt += aim * num;
    }
    if (line.includes("up")) {
      aim -= num;
    }
    if (line.includes("down")) {
      aim += num;
    }
  }
  console.log(`part 2: ${hor * dpt}`);
};

partOne();
partTwo();
