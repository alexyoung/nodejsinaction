const fs = require('fs');

const [nodePath, scriptPath, targetDir, originalName, newName] = process.argv;
console.log('Finding listing folders to rename in:', targetDir);

fs.readdirSync(targetDir)
  .filter(p => p.match(originalName))
  .forEach(p => {
    const newPath = newName + p.replace(originalName, '');
    const newFullPath = targetDir + newPath;
    console.log('Renaming:', p, 'to:', newPath);
    fs.renameSync(targetDir + p, newFullPath);
  });
