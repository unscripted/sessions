import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, '../templates');

export function init() {
  const sessionsDir = path.join(process.cwd(), 'docs', 'sessions');
  const currentFile = path.join(sessionsDir, 'CURRENT.md');

  if (fs.existsSync(currentFile)) {
    console.log('Already initialized. docs/sessions/CURRENT.md already exists.');
    return;
  }

  fs.mkdirSync(sessionsDir, { recursive: true });

  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'CURRENT.md'), 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const content = template.replace(/\{\{date\}\}/g, today);

  fs.writeFileSync(currentFile, content);

  console.log('Initialized! Created:');
  console.log('  docs/sessions/CURRENT.md');
  console.log('');
  console.log('Next steps:');
  console.log('  session new     — start your first session');
  console.log('  session current — print context to paste into your AI');
}
