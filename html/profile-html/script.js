import fs from 'node:fs';
import path from 'node:path';

const oldFolderName = './dist';
const newFolderName = './docs';

if (fs.existsSync(newFolderName)) {
  fs.rmSync(newFolderName, { recursive: true, force: true });
  console.log(`Deleted existing folder: ${newFolderName}`);
}

fs.rename(oldFolderName, newFolderName, (err) => {
  if (err) {
    console.error('Error renaming folder:', err);
  } else {
    console.log(`Folder "${oldFolderName}" renamed to "${newFolderName}" successfully.`);
  }
});
