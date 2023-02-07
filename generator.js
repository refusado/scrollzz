const blocks = 20;
const level = 5;

const levelImages = {
  1: "plygon",
  2: "circle",
  3: "cube",
  4: "moon",
  5: "triangle"
}

const image = levelImages[level];
let grade = '';

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 1; i <= blocks; i++) {
  let usedNumbers = [];
  let lineNumbers = '';

  for (let i = 1; i <= blocks; i++) {
    let number = Math.round(randomNumber(1, blocks)).toString();
    
    if (usedNumbers.includes(number)) {
      i--;
    } else {
      usedNumbers.push(number);
      lineNumbers += number + ' ';
    }
  }

  grade += lineNumbers;
}


let result = '/*\n  Automatically generated file  \n*/\n\n';
let currentBlock = 1;
let currentPiece = 1;

grade = grade.split(' ');

grade.map((number, index) => {

  if (index > 1 && index % blocks == 0) {
    result += `{\n  background-image: var(--${image}-${currentPiece});\n}\n\n`;

    currentPiece++;
  }

  if (index >= blocks * blocks) return;
  
  let lineEnd = ',\n';
  if (currentBlock == blocks) lineEnd = ' ';

  result += `#b${level}${currentBlock} .tile:nth-child(${number})${lineEnd}`;

  currentBlock++;
  if (currentBlock >= blocks + 1) currentBlock = 1;
});

const fs = require('fs');

fs.writeFile(`css/level/level-${level}.css`, result, function (err) {
  if (err) throw err;
  console.log('File is created');
});












