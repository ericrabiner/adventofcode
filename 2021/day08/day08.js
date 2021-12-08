const fs = require("fs");

const data = fs.readFileSync("./2021/day08/day08.txt", "utf-8").split(/\r?\n/);

const regex = /(.+) \| (.+)/;

let numDigitsWithUniqueNumberOfSegements = 0;

for (const entry of data) {
  const match = entry.match(regex);
  const [_, signal, output] = match;

  const digits = output.split(" ");

  for (const digit of digits) {
    const digitLength = digit.length;
    if (
      digitLength === 2 ||
      digitLength === 4 ||
      digitLength === 3 ||
      digitLength === 7
    ) {
      numDigitsWithUniqueNumberOfSegements++;
    }
  }
}

console.log(`part 1: ${numDigitsWithUniqueNumberOfSegements}`);
