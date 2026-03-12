#!/usr/bin/env node
import { program } from 'commander';
import { init } from '../src/commands/init.js';
import { newSession } from '../src/commands/new.js';
import { current } from '../src/commands/current.js';
import { wrap } from '../src/commands/wrap.js';

program
  .name('session')
  .description('Manage session context and history for long-term dev projects.')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold docs/sessions/ and CURRENT.md in the current project')
  .action(init);

program
  .command('new')
  .description('Create a new dated session file from the archive template')
  .action(newSession);

program
  .command('current')
  .description('Print CURRENT.md to stdout (pipe to clipboard: session current | pbcopy)')
  .action(current);

program
  .command('wrap')
  .description('Open today\'s session file in $EDITOR, then update CURRENT.md')
  .action(wrap);

program.parse();
