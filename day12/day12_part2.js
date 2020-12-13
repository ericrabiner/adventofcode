const fs = require("fs");
const data = fs.readFileSync("./day12/day12.txt", "utf-8");

const lines = data.split(/\r?\n/);
const actionRegex = /([A-Z]+)([0-9]+)/;

class Ship {
  // w = waypoint
  constructor(x, y, wX, wY) {
    this.x = x;
    this.y = y;
    this.wX = wX;
    this.wY = wY;
  }
  get pos() {
    return [this.x, this.y, this.wX, this.wY];
  }
  move(type, units) {
    if (type === "N") {
      this.wY += units;
    }
    if (type === "S") {
      this.wY -= units;
    }
    if (type === "E") {
      this.wX += units;
    }
    if (type === "W") {
      this.wX -= units;
    }
    if (type === "L") {
      for (let tick = 0; tick < units / 90; tick++) {
        const newX = -this.wY;
        const newY = this.wX;
        this.wX = newX;
        this.wY = newY;
      }
    }
    if (type === "R") {
      for (let tick = 0; tick < units / 90; tick++) {
        const newX = this.wY;
        const newY = -this.wX;
        this.wX = newX;
        this.wY = newY;
      }
    }
    if (type === "F") {
      this.x += this.wX * units;
      this.y += this.wY * units;
    }
  }
}

const shipHappens = new Ship(0, 0, 10, 1);

lines.forEach((line, i) => {
  const [_, type, units] = line.match(actionRegex);
  shipHappens.move(type, parseInt(units));
  if (i < 15) {
    console.log(shipHappens.pos);
  }
});

console.log(Math.abs(shipHappens.pos[0]) + Math.abs(shipHappens.pos[1]));
