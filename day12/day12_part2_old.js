const fs = require("fs");
const data = fs.readFileSync("./day12/day12.txt", "utf-8");

const lines = data.split(/\r?\n/);
const actionRegex = /([A-Z]+)([0-9]+)/;

// 44086 too high
// 36554 too low
// 41212 correct

class Ship {
  // w = waypoint
  constructor(x, y, wX, wY) {
    this.x = x;
    this.y = y;
    this.wDeg = (Math.atan(wY / wX) * 180) / Math.PI;
    this.wX = wX;
    this.wY = wY;
  }
  get pos() {
    return [this.x, this.y, this.wDeg, this.wX, this.wY];
  }
  move(type, units) {
    if (type === "N") {
      this.wY += units;
      const atan = (Math.atan(this.wY / this.wX) * 180) / Math.PI;
      this.wDeg = atan;
    }
    if (type === "S") {
      this.wY -= units;
      const atan = (Math.atan(this.wY / this.wX) * 180) / Math.PI;
      this.wDeg = atan;
    }
    if (type === "E") {
      this.wX += units;
      const atan = (Math.atan(this.wY / this.wX) * 180) / Math.PI;
      this.wDeg = atan;
    }
    if (type === "W") {
      this.wX -= units;
      const atan = (Math.atan(this.wY / this.wX) * 180) / Math.PI;
      this.wDeg = atan;
    }
    if (type === "L") {
      this.wDeg += units;
      const hypotenuse = Math.sqrt(Math.pow(this.wX, 2) + Math.pow(this.wY, 2));
      this.wX = Math.round(hypotenuse * Math.cos((this.wDeg * Math.PI) / 180));
      this.wY = Math.round(hypotenuse * Math.sin((this.wDeg * Math.PI) / 180));
    }
    if (type === "R") {
      this.wDeg -= units;
      const hypotenuse = Math.sqrt(Math.pow(this.wX, 2) + Math.pow(this.wY, 2));
      this.wX = Math.round(hypotenuse * Math.cos((this.wDeg * Math.PI) / 180));
      this.wY = Math.round(hypotenuse * Math.sin((this.wDeg * Math.PI) / 180));
    }
    if (type === "F") {
      this.x += this.wX * units;
      this.y += this.wY * units;
    }
  }
}

const shipHappens = new Ship(0, 0, 10, 1);
console.log(shipHappens.pos);

lines.forEach((line, i) => {
  const [_, type, units] = line.match(actionRegex);
  shipHappens.move(type, parseInt(units));
  if (i < 15) {
    console.log(shipHappens.pos);
  }
});

console.log(Math.abs(shipHappens.pos[0]) + Math.abs(shipHappens.pos[1]));
