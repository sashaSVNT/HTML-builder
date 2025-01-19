const fs = require('fs');
const path = require('path');

const TEXT_PATH = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(TEXT_PATH, { encoding: 'utf-8' });

stream.on('readable', () => {
  const data = stream.read();
  if (data) {
    console.log(data);
  }
})