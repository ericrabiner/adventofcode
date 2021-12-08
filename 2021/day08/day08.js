const fs = require("fs");

// const data = fs.readFileSync("./2021/day08/sample.txt", "utf-8").split(/\r?\n/);
const data = fs.readFileSync("./2021/day08/day08.txt", "utf-8").split(/\r?\n/);

const regex = /(.+) \| (.+)/;

let numDigitsWithUniqueNumberOfSegements = 0;
let sumOfDigits = 0;

const DIGIT_LENGTH = Object.freeze({
  _1: 2,
  _4: 4,
  _7: 3,
  _8: 7,
});

const getUniqueSegmentWithLength = (segments, digitLength) => {
  return segments.find((s) => s.length === digitLength);
};

const segmentHasAllSegments = (segment1, segment2) => {
  return segment2
    .split("")
    .every((segment) => segment1.split("").includes(segment));
};

const segmentHasNSegments = (segment1, segment2, n) => {
  let foundSegments = 0;

  const segments = segment2.split("");

  for (const segment of segments) {
    const foundSegment = segment1.split("").find((s) => s === segment);
    if (foundSegment) {
      foundSegments++;
    }
  }

  return foundSegments === n;
};

for (const entry of data) {
  const match = entry.match(regex);
  const [_, signal, output] = match;

  const segments = signal.split(" ");
  const digits = output.split(" ");

  const arrangement = {
    _0: "",
    _1: "",
    _2: "",
    _3: "",
    _4: "",
    _5: "",
    _6: "",
    _7: "",
    _8: "",
    _9: "",
  };

  for (const segment of segments) {
    const segmentLength = segment.length;

    // 0
    // probably overkill
    if (
      segmentLength === 6 &&
      segmentHasAllSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._7)
      ) &&
      segmentHasAllSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._1)
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._4),
        3
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._8),
        6
      )
    ) {
      arrangement._0 = segment;
    }

    // 1
    if (segmentLength === DIGIT_LENGTH._1) {
      arrangement._1 = segment;
    }

    // 2
    // probably overkill
    if (
      segmentLength === 5 &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._4),
        2
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._1),
        1
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._7),
        2
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._8),
        5
      )
    ) {
      arrangement._2 = segment;
    }

    // 3
    if (
      segmentLength === 5 &&
      segmentHasAllSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._1)
      )
    ) {
      arrangement._3 = segment;
    }

    // 4
    if (segmentLength === DIGIT_LENGTH._4) {
      arrangement._4 = segment;
    }

    // 5
    // probably overkill
    if (
      segmentLength === 5 &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._4),
        3
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._1),
        1
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._7),
        2
      ) &&
      segmentHasNSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._8),
        5
      )
    ) {
      arrangement._5 = segment;
    }

    // 6
    if (
      segmentLength === 6 &&
      !segmentHasAllSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._1)
      )
    ) {
      arrangement._6 = segment;
    }

    // 7
    if (segmentLength === DIGIT_LENGTH._7) {
      arrangement._7 = segment;
    }

    // 8
    if (segmentLength === DIGIT_LENGTH._8) {
      arrangement._8 = segment;
    }

    // 9
    if (
      segmentLength === 6 &&
      segmentHasAllSegments(
        segment,
        getUniqueSegmentWithLength(segments, DIGIT_LENGTH._4)
      )
    ) {
      arrangement._9 = segment;
    }
  }

  let display = "";

  for (const digit of digits) {
    const digitLength = digit.length;

    // 0
    if (digitLength === 6 && segmentHasAllSegments(digit, arrangement._0)) {
      display += "0";
    }

    // 1
    if (digitLength === 2) {
      numDigitsWithUniqueNumberOfSegements++;
      display += "1";
    }

    // 2
    else if (
      digitLength === 5 &&
      segmentHasAllSegments(digit, arrangement._2)
    ) {
      display += "2";
    }

    // 3
    else if (
      digitLength === 5 &&
      segmentHasAllSegments(digit, arrangement._3)
    ) {
      display += "3";
    }

    // 4
    else if (digitLength === 4) {
      numDigitsWithUniqueNumberOfSegements++;
      display += "4";
    }
    // 5
    else if (
      digitLength === 5 &&
      segmentHasAllSegments(digit, arrangement._5)
    ) {
      display += "5";
    }
    // 6
    else if (
      digitLength === 6 &&
      segmentHasAllSegments(digit, arrangement._6)
    ) {
      display += "6";
    }
    // 7
    else if (digitLength === 3) {
      numDigitsWithUniqueNumberOfSegements++;
      display += "7";
    }
    // 8
    else if (digitLength === 7) {
      numDigitsWithUniqueNumberOfSegements++;
      display += "8";
    }
    // 9
    else if (
      digitLength === 6 &&
      segmentHasAllSegments(digit, arrangement._9)
    ) {
      display += "9";
    }
  }

  sumOfDigits += +display;
}

console.log(`part 1: ${numDigitsWithUniqueNumberOfSegements}`);
console.log(`part 2: ${sumOfDigits}`);
