const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

function getFrequency(input) {
  return input
    .split("\n")
    .map(Number)
    .reduce((acc, curr) => acc + curr);
}

console.log(getFrequency(input));

function getFirstMatch(input) {
  const frequencies = input.split("\n").map(Number);
  let freqSet = new Set([]);
  let sum = 0;
  let i = 0;
  while (true) {
    if (i === frequencies.length - 1) {
      i = 0;
      continue;
    }
    sum += frequencies[i];
    if (freqSet.has(sum)) {
      break;
    }
    freqSet.add(sum);
    i++;
  }
  return sum;
}

console.log(getFirstMatch(input));
