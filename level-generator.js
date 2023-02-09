const level = 4;
const blocksNo = 16;

const levelImages = {
  1: "plygon",
  2: "circle",
  3: "cube",
  4: "moon",
  5: "triangle"
}

function getRandom() {
  const randomNumber = Math.random() * (blocksNo - 1) + 1;
  return Math.round(randomNumber).toString();
}

// GENERATING GRID

const grid    = [];
const firsts  = [];

for (let i = 0; i < blocksNo; i++) {
  const column = [];

  for (let ii = 0; ii < blocksNo; ii++) {
    const number = getRandom();

    if (ii == 0) {
      if (firsts.includes(number)) {
        ii--;
      } else {
        firsts.push(number);
        column.push(number);
      }
    } else if (column.includes(number)) {
      ii--;
    } else {
      column.push(number);
    }
  }

  grid.push(column);
}

// COMPACTING GRID INTO A STRING

let compactGrid = "";

for (let i = 0; i < grid.length; i++) {

  for (let ii = 0; ii < grid.length; ii++) {
    const column = grid[ii];
    const number = column[i];

    compactGrid += number + " ";
  }
}

// GENERATING CSS CONTENT

let result = `/*
  Automatically generated file
  Generator repository: 
*/\n
`;
let currentBlock = 1;
let currentPiece = 1;

const image = levelImages[level];

listedGrid = compactGrid.split(' ');
listedGrid.map((number, index) => {

  if (index > 1 && index % blocksNo == 0) {
    result += `{\n  background-image: var(--${image}-${currentPiece});\n}\n\n`;

    currentPiece++;
  }

  if (index >= blocksNo * blocksNo) return;
  
  let lineEnd = ',\n';
  if (currentBlock == blocksNo) lineEnd = ' ';

  result += `#b${level}${currentBlock} .tile:nth-child(${number})${lineEnd}`;

  currentBlock++;
  if (currentBlock >= blocksNo + 1) currentBlock = 1;
});

const fs = require('fs');

fs.writeFile(`css/level/level-${level}.css`, result, function (err) {
  if (err) throw err;
});