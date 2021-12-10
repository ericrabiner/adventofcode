const fs = require("fs");

const data = fs.readFileSync("./2021/day10/day10.txt", "utf-8").split(/\r?\n/);

const POINTS = Object.freeze({
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
});

const start = ["(", "[", "{", "<"];
const end = [")", "]", "}", ">"];

const removeValidChunks = (line) => {
  line = line.replace("()", "");
  line = line.replace("[]", "");
  line = line.replace("{}", "");
  line = line.replace("<>", "");

  if (line.includes("()")) return removeValidChunks(line);
  if (line.includes("[]")) return removeValidChunks(line);
  if (line.includes("{}")) return removeValidChunks(line);
  if (line.includes("<>")) return removeValidChunks(line);

  return line;
};

const findCorrupted = (line) => {
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextchar = line[i + 1];
    if (start.includes(char) && end.includes(nextchar)) {
      return nextchar;
    }
  }
};

let score = 0;

for (const line of data) {
  const _line = removeValidChunks(line);
  const corrupted = findCorrupted(_line);
  if (corrupted) score += POINTS[corrupted];
}

console.log(`part 1: ${score}`);
