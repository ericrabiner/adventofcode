const fs = require("fs");
const data = fs.readFileSync("./day12/day12_sample.txt", "utf-8");

const lines = data.split(/\r?\n/);
const actionRegex = /([A-Z]+)([0-9]+)/;

class Ship {
  constructor(x, y, deg) {
    this.x = x;
    this.y = y;
    this.deg = deg;
  }
  get pos() {
    return [this.x, this.y, this.deg];
  }
  move(type, units) {
    if (type === "N") this.y += units;
    if (type === "S") this.y -= units;
    if (type === "E") this.x += units;
    if (type === "W") this.x -= units;
    if (type === "L") this.deg += units % 360;
    if (type === "R") this.deg -= units % 360;
    if (type === "F") {
      this.x += units * Math.cos((this.deg * Math.PI) / 180);
      this.y += units * Math.sin((this.deg * Math.PI) / 180);
    }
  }
}

const shipHappens = new Ship(0, 0, 0);

lines.forEach((line) => {
  const [_, type, units] = line.match(actionRegex);
  shipHappens.move(type, parseInt(units));
  console.log(shipHappens.pos);
});

console.log(Math.abs(shipHappens.pos[0]) + Math.abs(shipHappens.pos[1]));
