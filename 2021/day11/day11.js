const fs = require("fs");

const data = fs
  .readFileSync("./2021/day11/day11.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => line.split("").map((x) => +x));

const spreadEnergy = (grid, x, y, maxX, maxY) => {
  let flashed = 0;

  const top = y - 1;
  const below = y + 1;
  const right = x + 1;
  const left = x - 1;

  // incrementTop
  if (top >= 0 && grid[top][x] !== 0) {
    if (++grid[top][x] === 10) {
      grid[top][x] = 0;
      flashed++;
      flashed += spreadEnergy(grid, x, top, maxX, maxY);
    }
  }

  // incrementTopLeft
  if (top >= 0 && left >= 0 && grid[top][left] !== 0) {
    if (++grid[top][left] === 10) {
      grid[top][left] = 0;
      flashed++;
      flashed += spreadEnergy(grid, left, top, maxX, maxY);
    }
  }

  // incrementTopRight
  if (top >= 0 && right <= maxY && grid[top][right] !== 0) {
    if (++grid[top][right] === 10) {
      grid[top][right] = 0;
      flashed++;
      flashed += spreadEnergy(grid, right, top, maxX, maxY);
    }
  }

  // incrementBelow
  if (below <= maxY && grid[below][x] !== 0) {
    if (++grid[below][x] === 10) {
      grid[below][x] = 0;
      flashed++;
      flashed += spreadEnergy(grid, x, below, maxX, maxY);
    }
  }

  // incrementBelowLeft
  if (below <= maxY && left >= 0 && grid[below][left] !== 0) {
    if (++grid[below][left] === 10) {
      grid[below][left] = 0;
      flashed++;
      flashed += spreadEnergy(grid, left, below, maxX, maxY);
    }
  }

  // incrementBelowRight
  if (below <= maxY && right <= maxX && grid[below][right] !== 0) {
    if (++grid[below][right] === 10) {
      grid[below][right] = 0;
      flashed++;
      flashed += spreadEnergy(grid, right, below, maxX, maxY);
    }
  }

  // incrementRight
  if (right <= maxX && grid[y][right] !== 0) {
    if (++grid[y][right] === 10) {
      grid[y][right] = 0;
      flashed++;
      flashed += spreadEnergy(grid, right, y, maxX, maxY);
    }
  }

  // incrementLeft
  if (left >= 0 && grid[y][left] !== 0) {
    if (++grid[y][left] === 10) {
      grid[y][left] = 0;
      flashed++;
      flashed += spreadEnergy(grid, left, y, maxX, maxY);
    }
  }

  return flashed;
};

const increaseEnergy = (grid) => {
  const flashes = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (++grid[y][x] === 10) {
        grid[y][x] = 0;
        flashes.push([x, y]);
      }
    }
  }
  return flashes;
};

const part1 = (data) => {
  const grid = data.map((row) => row.slice());
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;

  let numFlashed = 0;
  const NUM_STEPS = 100;

  for (let i = 0; i < NUM_STEPS; i++) {
    const flashes = increaseEnergy(grid);

    for (const coords of flashes) {
      const [x, y] = coords;
      numFlashed++;
      numFlashed += spreadEnergy(grid, x, y, maxX, maxY);
    }
  }
  console.log(`part 1: ${numFlashed}`);
};

const part2 = (data) => {
  const grid = data.map((row) => row.slice());
  const maxY = grid.length - 1;
  const maxX = grid[0].length - 1;
  const numItems = grid.length * grid[0].length;

  let step = 0;
  let flashedAllAtSameTime = false;

  while (!flashedAllAtSameTime) {
    let numFlashedAtThisStep = 0;
    const flashes = increaseEnergy(grid);

    for (const coords of flashes) {
      const [x, y] = coords;
      numFlashedAtThisStep++;
      numFlashedAtThisStep += spreadEnergy(grid, x, y, maxX, maxY);
    }

    if (numFlashedAtThisStep === numItems) {
      flashedAllAtSameTime = true;
    }

    step++;
  }

  console.log(`part 2: ${step}`);
};

part1(data);
part2(data);
