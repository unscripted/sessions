import fs from 'fs';
import path from 'path';

export function current() {
  const currentFile = path.join(process.cwd(), 'docs', 'sessions', 'CURRENT.md');

  if (!fs.existsSync(currentFile)) {
    console.error('No CURRENT.md found. Run `session init` first.');
    process.exit(1);
  }

  process.stdout.write(fs.readFileSync(currentFile, 'utf8'));
}
