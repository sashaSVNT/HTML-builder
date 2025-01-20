const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const FILE_PATH = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeStream = fs.createWriteStream(FILE_PATH, { flags: 'a' });

console.log('Enter the text to create the file. To exit the input, type "exit".');

rl.on('line', (input) => {
  if(input === 'exit') {
    console.log('exit\n');
    process.exit(0);
  }
  writeStream.write(`${input}\n`);
});

rl.on('SIGINT', () => {
  console.log('exit\n');
  process.exit(0);
});