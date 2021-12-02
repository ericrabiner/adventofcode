const fs = require("fs");
const data = fs.readFileSync("./day6/day6.txt", "utf-8");

const lines = data.split(/\r?\n/);

const questions = [];
let question = "";

lines.forEach((line) => {
  if (line === "") {
    questions.push(question);
    question = "";
  } else {
    question += line;
  }
});

const uniqueQuestions = questions.map((q) => {
  return String.prototype.concat(...new Set(q));
});

let numQuestions = 0;

uniqueQuestions.forEach((q) => {
  numQuestions += q.length;
});

console.log(numQuestions);
