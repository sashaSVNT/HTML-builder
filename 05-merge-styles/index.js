const fs = require('fs');
const path = require('path');

const STYLES_DIR = path.join(__dirname, 'styles');
const OUTPUT_DIR = path.join(__dirname, 'project-dist');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'bundle.css');


fs.readdir(STYLES_DIR, (err, files) => {
  if (err) console.error(err);
  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  let allContent = [];
  cssFiles.forEach(file => {
    const filePath = path.join(STYLES_DIR, file);
    fs.readFile(filePath, 'utf-8', (err, content) => {
      if (err) console.error(err);
      allContent.push(content);
      if (allContent.length === cssFiles.length) {
        fs.writeFile(OUTPUT_FILE, allContent.join('\n'), (err) => {
          if (err) console.error(err);
          console.log('The files were collected successfully!');
        })
      }
    });
  });
});