const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf-8");

const createGrid = (w, h) =>
  [...Array(w)].map(() => [...Array(h)].map(() => 0));

let grid = createGrid(1000, 1000);

const formatInput = input => {
  return input.trim().split(/[\r\n]+/);
};

const getClaim = line => {
  const regEx = /#\d+ @ (\d+),(\d+): (\d+)x(\d+)/;
  let claim = regEx.exec(line);
  return claim;
};

const getParams = claim => {
  let paramArray = [];
  paramArray.push(Number(claim[1]));
  paramArray.push(Number(claim[2]));
  paramArray.push(Number(claim[3]));
  paramArray.push(Number(claim[4]));
  return paramArray;
};

const getMatches = (input, grid) => {
  input = formatInput(input);
  input.forEach(line => {
    claim = getClaim(line);
    params = getParams(claim);
    for (let i = 0; i < params[2]; i++) {
      for (let j = 0; j < params[3]; j++) {
        grid[params[0] + i][params[1] + j]++;
      }
    }
  });
  const sum = grid.reduce(
    (total, row) =>
      total + row.reduce((rowTotal, cell) => rowTotal + (cell >= 2 ? 1 : 0), 0),
    0
  );
  return sum;
};

const getUniqueClaim = (input, grid) => {
  let answer;
  input = formatInput(input);
  input.forEach(line => {
    claim = getClaim(line);
    params = getParams(claim);
    let acc = 0;
    for (let i = 0; i < params[2]; i++) {
      for (let j = 0; j < params[3]; j++) {
        if (grid[params[0] + i][params[1] + j] !== 1) {
          acc++;
        }
      }
    }
    if (acc === 0) {
      answer = line;
    }
  });
  return answer;
};

console.log(`The number of overlapped cells is ${getMatches(input, grid)}`);
console.log(`And the Unique Claim is ${getUniqueClaim(input, grid)}`);
