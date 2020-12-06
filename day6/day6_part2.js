const fs = require("fs");
const data = fs.readFileSync("./day6/day6.txt", "utf-8");

const lines = data.split(/\r?\n/);

const questions = [];
let question = [];

lines.forEach((line) => {
  if (line === "") {
    questions.push(question);
    question = [];
  } else {
    question = question.concat(line.split(" "));
  }
});

let numQuestions = 0;

questions.forEach((q) => {
  if (q.length === 1) {
    numQuestions += q[0].length;
  } else {
    const dupChars = [];
    q.forEach((item) => {
      [...item].forEach((char) => {
        if (
          q.every((str) => str.includes(char)) &&
          !dupChars.find((c) => c === char)
        ) {
          dupChars.push(char);
        }
      });
    });
    numQuestions += dupChars.length;
  }
});

console.log(numQuestions);
