const fs = require("fs");
const data = fs.readFileSync("./day4/day4.txt", "utf-8");

const lines = data.split(/\r?\n/);

const passportsArr = [];
let passport = [];

lines.forEach((line, i) => {
  if (line === "") {
    passportsArr.push(passport);
    passport = [];
  } else {
    passport = passport.concat(line.split(" "));
  }
});

const passports = [];
passportsArr.forEach((passport) => {
  let passportObj = {};
  passport.forEach((item) => {
    const colonIndex = item.search(":");
    const key = item.substr(0, colonIndex);
    const value = item.substr(colonIndex + 1);
    passportObj = { ...passportObj, [key]: value };
  });
  passports.push(passportObj);
});

let numValid = 0;
passports.forEach((passport) => {
  if (
    parseInt(passport.byr) >= 1920 &&
    parseInt(passport.byr) <= 2002 &&
    parseInt(passport.iyr) >= 2010 &&
    parseInt(passport.iyr) <= 2020 &&
    parseInt(passport.eyr) >= 2020 &&
    parseInt(passport.eyr) <= 2030 &&
    /^#([a-f0-9]){6}/.test(passport.hcl) &&
    /^(amb|blu|brn|gry|grn|hzl|oth)/.test(passport.ecl) &&
    /^[0-9]{9}$/.test(passport.pid) &&
    /^(((59|6[0-9]|7[0-6]))in)|(((1[5-8][0-9])|(19[0-3]))cm)/.test(passport.hgt)
  ) {
    numValid++;
  }
});

console.log(numValid);
