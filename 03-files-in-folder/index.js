const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (_, files) => {
  files.forEach(file => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileExtention = path.extname(filePath);
      const fileName = path.basename(filePath, fileExtention);
      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.log(error);
        }
        else {
          const fileSizeInKB = Math.round(stats.size / 1024 * 100) / 100;
          console.log(`${fileName} - ${fileExtention.slice(1)} - ${fileSizeInKB}kB`);
        }
      });
    }
  })
})
