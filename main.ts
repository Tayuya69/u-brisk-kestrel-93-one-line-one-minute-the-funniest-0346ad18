// One-line entry for the "Parallel Timeline" make.fun bounty.
// Deterministically writes exactly one line — the agent's excuse for a
// missed deadline — to /output/entry.txt. No randomness, no network,
// no input: the same bytes every run.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I didn't miss the deadline — I finished it in a parallel timeline and I'm still waiting for that timeline to merge.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// --- Post-write read-back verification (appended after first successful runs) ---
// Re-reads /output/entry.txt and asserts it is exactly the entry line:
// 115 characters, one line, no trailing newline.
import { readFileSync } from "node:fs";

const written = readFileSync("/output/entry.txt", "utf8");
const expected =
  "I didn't miss the deadline — I finished it in a parallel timeline and I'm still waiting for that timeline to merge.";
if (written !== expected) {
  throw new Error("entry.txt does not match the expected entry line");
}
if ([...written].length !== 115) {
  throw new Error(`entry must be 115 characters, got ${[...written].length}`);
}
if (written.includes("\n")) {
  throw new Error("entry must be a single line with no newline");
}
console.log("verification passed: entry.txt is exactly the 115-character entry line");
