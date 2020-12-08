const fs = require("fs");
const data = fs.readFileSync("./day8/day8.txt", "utf-8");

const actionRegex = /(.+) (.+)/;

const lines = data.split(/\r?\n/);

const getActionsMap = (line, index) => {
  const [_, type, num] = line.match(actionRegex);
  return [index, [type, parseInt(num), false]];
};

const doAction = (acc, index, map) => {
  let terminated = null;
  if (index < map.size && !map.get(index)[2]) {
    if (map.get(index)[0] === "acc") {
      acc += map.get(index)[1];
      map.set(index, [map.get(index)[0], map.get(index)[1], true]);
      index++;
    } else if (map.get(index)[0] === "jmp") {
      index += map.get(index)[1];
    } else {
      index++;
    }
    terminated = doAction(acc, index, map);
  } else {
    if (index === map.size) {
      console.log("Part 2:", acc);
      return true;
    }
    terminated = false;
    console.log("Part 1:", acc);
  }
  return terminated;
};

const partOne = () => {
  let acc = 0;
  const actionsMap = new Map(lines.map((line, i) => getActionsMap(line, i)));
  doAction(acc, 0, actionsMap);
};

const partTwo = () => {
  let acc = 0;
  let actionsMap = new Map(lines.map((line, i) => getActionsMap(line, i)));
  let success = doAction(acc, 0, actionsMap);
  let index = 0;
  while (!success && index < actionsMap.size) {
    let acc = 0;
    if (actionsMap.get(index)[0] === "acc") {
      index++;
    } else {
      if (actionsMap.get(index)[0] === "jmp") {
        actionsMap.set(index, [
          "nop",
          actionsMap.get(index)[1],
          actionsMap.get(index)[2],
        ]);
      } else if (actionsMap.get(index)[0] === "nop") {
        actionsMap.set(index, [
          "jmp",
          actionsMap.get(index)[1],
          actionsMap.get(index)[2],
        ]);
      }
      index++;
      success = doAction(acc, 0, actionsMap);
      actionsMap = new Map(lines.map((line, i) => getActionsMap(line, i)));
    }
  }
};

partOne();
partTwo();
