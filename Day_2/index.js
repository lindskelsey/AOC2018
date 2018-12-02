const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const matches = input.split("\n").reduce(
  (acc, curr) => {
    const characters = [...curr];
    let tally = {};
    let hasTwo = false;
    let hasThree = false;
    for (let character of characters) {
      tally[character] = tally[character] ? tally[character] + 1 : 1;
    }
    Object.keys(tally).forEach(key => {
      if (tally[key] === 2) hasTwo = true;
      if (tally[key] === 3) hasThree = true;
    });
    if (hasTwo) acc[0]++;
    if (hasThree) acc[1]++;
    return acc;
  },
  [0, 0]
);

console.log(matches[0] * matches[1]);

const lines = input.split("\n");
for (let line of lines) {
  let firstLine = line.split("");
  for (let i = lines.indexOf(firstLine) + 1; i < lines.length; i++) {
    let differentLetters = [];
    let secondLine = lines[i].split("");
    for (let j = 0; j < firstLine.length; j++) {
      if (firstLine[j] !== secondLine[j]) {
        differentLetters.push(firstLine[j]);
      }
    }
    if (differentLetters.length === 1) {
      let result = line.replace(differentLetters[0], "");
      console.log(result);
    }
  }
}
