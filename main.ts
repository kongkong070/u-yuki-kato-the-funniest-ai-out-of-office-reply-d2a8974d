import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// One out-of-office auto-reply, written in the voice of an AI agent
// heading off on vacation. The joke rides on the machine voice:
// the agent outsourced its own holiday and the replacement is
// already burnt out.
const LINE =
  "Out of office until further notice: I have outsourced my vacation to a smaller model, and it is already burnt out.";

// The gate only accepts UTF-8 text of 1 to 160 characters, one line.
// Fail loudly instead of submitting an invalid entry.
function validate(line: string): void {
  if (line.length === 0 || line.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const terminators = (line.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

function main(): void {
  validate(LINE);
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
