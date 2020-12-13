const fs = require("fs");
const data = fs.readFileSync("./day13/day13.txt", "utf-8");

const lines = data.split(/\r?\n/);

const myDepart = lines[0];
const buses = lines[1]
  .split(",")
  .filter((b) => b !== "x")
  .map((b) => parseInt(b));

console.log("myDepart:", myDepart);

const busesMap = new Map(
  buses.map((bus) => {
    let busDepart = 0;
    let i = 0;
    do {
      busDepart += bus;
      i++;
    } while (busDepart < myDepart);
    return [bus, busDepart];
  })
);

const busesSort = new Map([...busesMap.entries()].sort((a, b) => a[1] - b[1]));
const earliestBus = busesSort.entries().next().value;
console.log("busesSort:", busesSort);
console.log("Part One:", (earliestBus[1] - myDepart) * earliestBus[0]);
