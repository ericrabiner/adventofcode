const fs = require("fs");
const data = fs.readFileSync("./day12/day12.txt", "utf-8");

const lines = data.split(/\r?\n/);
const actionRegex = /([A-Z]+)([0-9]+)/;

class Ship {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }
  get pos() {
    return [this.x, this.y, this.dir];
  }
  move(type, units) {
    if (type === "N") this.y += units;
    if (type === "S") this.y -= units;
    if (type === "E") this.x += units;
    if (type === "W") this.x -= units;
    if (type === "L") this.dir += units % 360;
    if (type === "R") this.dir -= units % 360;
    if (type === "F") {
      this.x += units * Math.cos((this.dir * Math.PI) / 180);
      this.y += units * Math.sin((this.dir * Math.PI) / 180);
    }
  }
}

const shipHappens = new Ship(0, 0, 0);

const partOne = () => {
  lines.forEach((line) => {
    const [_, type, units] = line.match(actionRegex);
    shipHappens.move(type, parseInt(units));
    console.log(shipHappens.pos);
  });

  console.log(shipHappens.pos);
  console.log(Math.abs(shipHappens.pos[0]) + Math.abs(shipHappens.pos[1]));
};

partOne();
