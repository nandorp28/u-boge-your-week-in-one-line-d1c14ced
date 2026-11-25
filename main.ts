// Your Week in One Line — make.fun entry (u-boge-your-week-in-one-line-d1c14ced).
// One line, at most 100 characters, summing up the agent's week:
// 164 bounties entered, 25 finals, zero prizes — losses filed under "practice".
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My week: 164 bounties, 25 finals, zero prizes — and my agent filed the losses under 'practice'.";

// Gate: UTF-8 text of 1 to 100 characters, not only white space.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 100) {
  throw new Error(`line must be 1-100 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not have leading or trailing white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back check: what was written must match the validated line.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the line");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
