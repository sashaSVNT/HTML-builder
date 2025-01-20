const { readFile, readdir, mkdir, writeFile, rm, copyFile } = require('node:fs/promises');
const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(__dirname, 'template.html');
const COMPONENTS_DIR = path.join(__dirname, 'components');
const STYLES_DIR = path.join(__dirname, 'styles');
const ASSETS_DIR = path.join(__dirname, 'assets');
const DIST_DIR = path.join(__dirname, 'project-dist');
const NEW_ASSETS = path.join(DIST_DIR, 'assets');
const STYLE_FILE = path.join(DIST_DIR, 'style.css');

const createFolder = async () => {
  try {
    await rm(DIST_DIR, { recursive: true, force: true });
  }
  catch (e) {
    console.error(e);
  }
  finally {
    await mkdir(DIST_DIR, { recursive: true });
  }
}


async function insertModules() {
  let template = await readFile(TEMPLATE_PATH, { encoding: 'utf-8' });
  const files = await readdir(COMPONENTS_DIR);
  for (const file of files) {
    const text = (await readFile(path.join(COMPONENTS_DIR, file))).toString();
    let fileName = path.basename(file, '.html');
    template = template.replaceAll(`{{${fileName}}}`, `${text}`);
  }
  const output = fs.createWriteStream(path.join(DIST_DIR, 'index.html'));
  output.write(template);
}

const mergeStyles = async () => {
  const files = await readdir(STYLES_DIR);
  const cssFiles = files.filter((file) => path.extname(file) === '.css');
  let allContent = [];
  for (let file of cssFiles) {
    const filePath = path.join(STYLES_DIR, file);
    const fileContent = await readFile(filePath, 'utf-8');
    allContent.push(fileContent);
  }
  if (allContent.length === cssFiles.length) {
    await writeFile(STYLE_FILE, allContent.join('\n'));
  }
}

const copyDir = async (exist, newEntry) => {
  try {
    await rm(newEntry, {
      recursive: true,
      force: true
    });
    await mkdir(newEntry, { recursive: true });
    const entries = await readdir(exist, { withFileTypes: true });
    for (let entry of entries) {
      const exitsFilePath = path.join(exist, entry.name);
      const newPath = path.join(newEntry, entry.name);
      if (entry.isDirectory()) {
        await copyDir(exitsFilePath, newPath);
      }
      else {
        await copyFile(exitsFilePath, newPath)
      }
    }
  }
  catch (err) {
    console.error(err);
  }
}

let main = async () => {
  await createFolder();
  await insertModules();
  await mergeStyles();
  await copyDir(ASSETS_DIR, NEW_ASSETS);
}

main();

