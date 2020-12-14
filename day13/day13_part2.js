const fs = require("fs");
const data = fs.readFileSync("./day13/day13.txt", "utf-8");

const lines = data.split(/\r?\n/);

const buses = lines[1].split(",").map((b) => {
  if (b !== "x") return parseInt(b);
  return b;
});

console.log(lines);

const busesMap = buses
  .map((bus, i) => {
    if (bus !== "x") return [bus, i];
    return null;
  })
  .filter((bus) => bus !== null);

console.log(busesMap);

let t = 0;
let m = 1;

for (let i = 0; i < busesMap.length; i++) {
  let loop = true;
  while (loop) {
    if ((t + busesMap[i][1]) % busesMap[i][0] === 0) {
      loop = false;
      m *= busesMap[i][0];
    } else {
      t += m;
    }
  }
}

console.log(t);
