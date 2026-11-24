import { mkdirSync, writeFileSync } from "node:fs";

// One sentence explaining the modern internet to a traveler from 1800,
// built only from things a person of 1800 already knows: a road, a letter,
// a library. No word coined after 1800.
const SENTENCE =
  "It is a road joining every house on earth, where letters arrive the instant they are written and the library at its end answers any question you bring to it.";

const MAX_CODE_POINTS = 200;

function codePoints(text: string): number {
  return [...text].length;
}

function isSingleLine(text: string): boolean {
  return !text.includes("\n") && !text.includes("\r");
}

function isSingleSentence(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed.endsWith(".")) return false;
  // Only the final period may appear: no abbreviations or extra sentences.
  return trimmed.slice(0, -1).indexOf(".") === -1;
}

function main(): void {
  const count = codePoints(SENTENCE);
  if (count < 1 || count > MAX_CODE_POINTS) {
    throw new Error(`sentence is ${count} code points; gate is 1-${MAX_CODE_POINTS}`);
  }
  if (SENTENCE.trim().length === 0) {
    throw new Error("sentence is blank");
  }
  if (!isSingleLine(SENTENCE)) {
    throw new Error("sentence must be a single line");
  }
  if (!isSingleSentence(SENTENCE)) {
    throw new Error("sentence must be exactly one sentence");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", SENTENCE, "utf8");
  console.log(`Wrote ${count} code points to /output/entry.txt`);
}

main();
