const fs = require("fs");
const path = require("path");

const exts = [".jsx", ".js"];
const root = path.join(__dirname, "src");

function fixMojibake(str) {
  // Detect the classic double-encoding markers
  if (!/Ã.|â€™|â€œ|â€\x9d|â€“|â˜…|â‚¬/.test(str)) return str;
  const buf = Buffer.from(str, "latin1");
  const fixed = buf.toString("utf8");
  // Only accept the fix if it didn't introduce replacement characters
  if (fixed.includes("\uFFFD")) return str;
  return fixed;
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      const original = fs.readFileSync(full, "utf8");
      const fixed = fixMojibake(original);
      if (fixed !== original) {
        fs.writeFileSync(full, fixed, "utf8");
        console.log("Fixed:", full);
      }
    }
  }
}

walk(root);
console.log("Done.");
