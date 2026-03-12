import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '../templates');

export function newSession() {
  const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');

  if (!fs.existsSync(sessionsDir)) {
    console.error('Not initialized. Run `session init` first.');
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);
  const sessionFile = path.join(sessionsDir, `${today}.md`);

  if (fs.existsSync(sessionFile)) {
    console.log(`Session file already exists: docs/sessions/${today}.md`);
    console.log('Run `session wrap` to close it out.');
    return;
  }

  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'session.md'), 'utf8');
  const content = template.replace(/\{\{date\}\}/g, today);

  fs.writeFileSync(sessionFile, content);

  console.log(`Created: docs/sessions/${today}.md`);
  console.log('');
  console.log('At the end of your session, run `session wrap` to update CURRENT.md.');
}
