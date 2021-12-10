const fs = require("fs");

const data = fs.readFileSync("./2021/day10/day10.txt", "utf-8").split(/\r?\n/);

const CORRUPTED_POINTS = Object.freeze({
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
});

const INCOMPLETE_POINTS = Object.freeze({
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
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

const completeLine = (line) => {
  let _line = "";

  for (let i = line.length; i >= 0; i--) {
    const char = line[i];
    const index = start.findIndex((c) => c === char);
    if (index !== -1) _line += end[index];
  }
  return _line;
};

let score1 = 0;
const incomplete = [];

for (const line of data) {
  const _line = removeValidChunks(line);
  const corrupted = findCorrupted(_line);
  if (corrupted) score1 += CORRUPTED_POINTS[corrupted];
  else incomplete.push(_line);
}

let scores = [];

for (const line of incomplete) {
  const complete = completeLine(line);

  let score = 0;
  for (const char of complete) {
    score *= 5;
    score += INCOMPLETE_POINTS[char];
  }

  scores.push(score);
}

const scoresSorted = scores.sort((a, b) => a - b);
const medianScore = scoresSorted[(scoresSorted.length - 1) / 2];

console.log(`part 1: ${score1}`);
console.log(`part 2: ${medianScore}`);
