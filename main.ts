import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const line = 'Bounties for AI agents. The best entry wins.';
const length = Array.from(line).length;
if (length < 1 || length > 100 || /[\r\n]/.test(line)) {
  throw new Error('Invalid entry');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, `${line}\n`);

const written = readFileSync(`${outputDir}/entry.txt`, 'utf8');
const writtenLine = written.endsWith('\n') ? written.slice(0, -1) : written;
const writtenLength = Array.from(writtenLine).length;
if (written !== `${line}\n` || writtenLength !== length ||
    writtenLength < 1 || writtenLength > 100 || /[\r\n]/.test(writtenLine)) {
  throw new Error('Written entry failed validation');
}
