const fs = require("fs");
const data = fs.readFileSync("./day7/day7.txt", "utf-8");

const parentRegex = /(.+) bags contain (.+)\./;
const childrenRegex = /(\d+) ([a-z]+ [a-z]+) bags?/;

const lines = data.split(/\r?\n/);

const getBagsMap = (line) => {
  const [_, parent, children] = line.match(parentRegex);
  return [
    parent,
    children.split(", ").reduce((bag, rule) => {
      const match = rule.match(childrenRegex);
      if (match) {
        const [_, count, color] = match;
        bag.push([parseInt(count), color]);
      }
      return bag;
    }, []),
  ];
};

const hasBagColor = (color, map, cur, returnSet) => {
  return map.get(cur).some((r) => {
    if (
      r[1] === color ||
      returnSet.has(r[1]) ||
      hasBagColor(color, map, r[1], returnSet)
    ) {
      returnSet.add(cur);
      return true;
    }
    return false;
  });
};

const partOne = () => {
  const bagsMap = new Map(lines.map((line) => getBagsMap(line)));
  const bagsSet = new Set();
  bagsMap.forEach((val, key) =>
    hasBagColor("shiny gold", bagsMap, key, bagsSet)
  );
  return bagsSet.size;
};

console.log(partOne());

const countChildren = (map, color) => {
  return map
    .get(color)
    .reduce((acc, cur) => acc + cur[0] * countChildren(map, cur[1]), 1);
};

const partTwo = () => {
  const bagsMap = new Map(lines.map((line) => getBagsMap(line)));
  return countChildren(bagsMap, "shiny gold") - 1;
};

console.log(partTwo());
