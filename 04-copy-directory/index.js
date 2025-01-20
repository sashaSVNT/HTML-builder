const { mkdir, readdir, copyFile, rm } = require('fs/promises');
const path = require('path');

const existingFolder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

rm(copyFolder, {
  recursive: true,
  force: true
}).then(() => {
  mkdir(copyFolder, {
    recursive: true,
  });
  readdir(existingFolder).then((files) => {
    files.forEach(file => {
      const oldPath = path.join(existingFolder, file);
      const newPath = path.join(copyFolder, file);
      copyFile(oldPath, newPath);
    });
  })
})