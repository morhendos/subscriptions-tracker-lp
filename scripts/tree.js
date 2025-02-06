import { readFileSync, writeFileSync, statSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateTree(startPath, prefix = "") {
  let tree = "";
  const files = readdirSync(startPath).filter(
    (file) => !file.startsWith(".") && file !== "node_modules"
  );

  files.forEach((file, index) => {
    const filePath = join(startPath, file);
    const isLast = index === files.length - 1;
    const stats = statSync(filePath);

    tree += `${prefix}${isLast ? "└── " : "├── "}${file}\n`;

    if (stats.isDirectory()) {
      tree += generateTree(filePath, prefix + (isLast ? "    " : "│   "));
    }
  });

  return tree;
}

// Get the parent directory of scripts folder
const projectRoot = join(__dirname, "..");
const treeOutput = "subscription-tracker/\n" + generateTree(projectRoot);
console.log(treeOutput);

// Save to file
writeFileSync("tree.txt", treeOutput);
