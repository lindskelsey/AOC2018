const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const parseInput = input =>
  input.split("\n").sort(function(a, b) {
    return (
      new Date(a.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}/g)) -
      new Date(b.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}/g))
    );
  });

const parseLine = input => {
  const stateRegex = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\] (Guard #|)(\d+|wakes|falls)/;
  input = parseInput(input).map(line => {
    return stateRegex.exec(line);
  });
  return input;
};

//need to go back and look at

const countSleep = input => {
  let guardArray = [];
  let falls;
  let wakes;
  const lines = parseLine(input);
  let guard = lines[0]["7"];
  guardArray[parseInt(guard)] = new Array(62).fill(0);
  guardArray[guard][61] = guard;
  lines.forEach(line => {
    if (line === null) {
      return;
    }
    if (line["7"] === "falls") {
      falls = parseInt(line["5"]);
    }
    if (line["7"] === "wakes") {
      wakes = parseInt(line["5"]);
      for (let j = falls; j <= wakes; j++) {
        guardArray[guard][j] += 1;
        guardArray[guard][60] += 1;
      }
    }
    if (line["6"] === "Guard #") {
      guard = line["7"];
      if (!guardArray[parseInt(guard)]) {
        guardArray[parseInt(guard)] = new Array(62).fill(0);
        guardArray[guard][61] = guard;
      }
    }
  });
  return guardArray;
};

console.log(countSleep(input));
