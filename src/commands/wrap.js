import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import readline from 'readline';
import { newSession } from './new.js';

export function wrap() {
  const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');
  const currentFile = path.join(sessionsDir, 'CURRENT.md');

  if (!fs.existsSync(sessionsDir)) {
    console.error('Not initialized. Run `session init` first.');
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sessionFile = path.join(sessionsDir, `${today}.md`);

  // Open today's session file in $EDITOR
  const editor = process.env.EDITOR || process.env.VISUAL || 'vi';

  if (!fs.existsSync(sessionFile)) {
    console.log(`No session file for today (${today}). Creating one first...`);
    newSession();
  }

  try {
    execSync(`${editor} "${sessionFile}"`, { stdio: 'inherit' });
  } catch {
    // Editor exited — that's fine
  }

  // Prompt to update CURRENT.md
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('\nUpdate CURRENT.md with next steps from this session? (y/N) ', (answer) => {
    rl.close();

    if (answer.toLowerCase() === 'y') {
      try {
        execSync(`${editor} "${currentFile}"`, { stdio: 'inherit' });
        console.log('CURRENT.md updated. Session wrapped.');
      } catch {
        console.log('CURRENT.md not saved. Done.');
      }
    } else {
      console.log('Skipped CURRENT.md update. Session wrapped.');
    }
  });
}
