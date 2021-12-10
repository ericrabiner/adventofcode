const fs = require("fs");

const heightMap = fs
  .readFileSync("./2021/day09/day09.txt", "utf-8")
  .split(/\r?\n/);

const getTop = (x, y) => heightMap?.[y - 1]?.[x] || Infinity;
const getBelow = (x, y) => heightMap?.[y + 1]?.[x] || Infinity;
const getRight = (x, y) => heightMap?.[y]?.[x + 1] || Infinity;
const getLeft = (x, y) => heightMap?.[y]?.[x - 1] || Infinity;

const getLowPoints = () => {
  const lowPoints = [];

  for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
      const currentHeight = heightMap[y][x];

      const top = getTop(x, y);
      const below = getBelow(x, y);
      const right = getRight(x, y);
      const left = getLeft(x, y);

      if (
        currentHeight < top &&
        currentHeight < below &&
        currentHeight < right &&
        currentHeight < left
      ) {
        lowPoints.push({ x, y });
      }
    }
  }

  return lowPoints;
};

const hasCoords = (coordsArr, coords) => {
  return coordsArr.find((c) => c.x === coords.x && c.y === coords.y);
};

const getBasinSize = (coords, coordsCounted) => {
  const currentHeight = heightMap?.[coords.y]?.[coords.x] || Infinity;
  const top = getTop(coords.x, coords.y);
  const below = getBelow(coords.x, coords.y);
  const right = getRight(coords.x, coords.y);
  const left = getLeft(coords.x, coords.y);

  const topCondition =
    top > currentHeight &&
    top < 9 &&
    !hasCoords(coordsCounted, { x: coords.x, y: coords.y - 1 });

  const bottomCondition =
    below > currentHeight &&
    below < 9 &&
    !hasCoords(coordsCounted, { x: coords.x, y: coords.y + 1 });

  const rightCondition =
    right > currentHeight &&
    right < 9 &&
    !hasCoords(coordsCounted, { x: coords.x + 1, y: coords.y });

  const leftCondition =
    left > currentHeight &&
    left < 9 &&
    !hasCoords(coordsCounted, { x: coords.x - 1, y: coords.y });

  if (!hasCoords(coordsCounted, coords)) {
    coordsCounted.push(coords);
  }

  if (topCondition) {
    getBasinSize({ x: coords.x, y: coords.y - 1 }, coordsCounted);
  }
  if (bottomCondition) {
    getBasinSize({ x: coords.x, y: coords.y + 1 }, coordsCounted);
  }
  if (rightCondition) {
    getBasinSize({ x: coords.x + 1, y: coords.y }, coordsCounted);
  }
  if (leftCondition) {
    getBasinSize({ x: coords.x - 1, y: coords.y }, coordsCounted);
  }

  return coordsCounted;
};

const basins = [];
const lowPoints = getLowPoints(heightMap);

for (const lowPoint of lowPoints) {
  coordsCounted = [];
  const basin = getBasinSize(lowPoint, []).length;
  basins.push(basin);
}

const threeLargestBasins = basins
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((prv, cur) => prv * cur, 1);

console.log(`part 2: ${threeLargestBasins}`);
