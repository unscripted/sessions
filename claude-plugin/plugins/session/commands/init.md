---
description: Initialize session tracking for a project. Handles three cases: brand new project with no CLAUDE.md, new project with an existing CLAUDE.md, and an established project adding sessions for the first time.
allowed-tools: Read, Write, Bash(ls:*), Bash(mkdir:*), Bash(git log:*), Bash(git status:*), Bash(date:*), Bash(find:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Already initialized?
!`ls docs/sessions/CURRENT.md 2>/dev/null && echo "YES" || echo "NO"`

Existing CLAUDE.md:
!`cat CLAUDE.md 2>/dev/null || echo "NO_CLAUDE_MD"`

Existing README:
!`cat README.md 2>/dev/null || echo "NO_README"`

Package info (if any):
!`cat package.json 2>/dev/null | head -10 || cat pyproject.toml 2>/dev/null | head -10 || echo "NONE"`

Git history (recent commits):
!`git log --oneline -15 2>/dev/null || echo "NO_GIT_HISTORY"`

Recent files changed:
!`git diff --name-only HEAD~5 HEAD 2>/dev/null || echo "NONE"`

## Your task

### Step 1: Check if already initialized

If `docs/sessions/CURRENT.md` already exists, stop and say:
"Session tracking is already initialized. Run `/start-session` to load your current context."

### Step 2: Determine the scenario

Use the context above to classify:

**A — Brand new project**: No CLAUDE.md, no README with real content, no git history (or just an initial commit). Nothing to infer from.

**B — New project with existing CLAUDE.md**: Has a CLAUDE.md (meaning AI context has been set up) but no session history. Can infer intent from CLAUDE.md and README.

**C — Established project**: Has meaningful git history, a populated README, or a CLAUDE.md with real content. Sessions is being added to an ongoing project.

### Step 3: Gather missing context (Scenario A only)

For a brand new project where there's nothing to infer from, ask the user:
- "What are you building?" (a sentence or two — purpose and tech stack)
- "What's the first thing you're working on?"

Wait for their response before proceeding. Don't write any files yet.

### Step 4: Create docs/sessions/

Run `mkdir -p docs/sessions` to create the directory.

### Step 5: Write CURRENT.md

**Scenario A** (new, from user's answers):
```markdown
# Current Context

_Last updated: YYYY-MM-DD_

## What We're Building

[user's description]

## Last Session (YYYY-MM-DD)

### Accomplished

- Initialized session tracking

### Key Decisions

- [none yet]

### Blockers / Open Questions

- [none yet]

## Next Steps (pick up here)

1. [user's first task]
```

**Scenario B** (inferred from CLAUDE.md/README):
Draft a CURRENT.md using what you can read from the existing files. Synthesize — don't just copy. Make a reasonable attempt at "What We're Building" and leave Next Steps for the user to fill in. After writing, show the user what you wrote and ask: "Does this look right, or anything to adjust?"

**Scenario C** (established project):
This is the most valuable case. Read the git history, README, and any relevant source files to build an informed first draft:
- **What We're Building**: synthesize from README and codebase
- **Accomplished**: last 1–2 weeks of meaningful work from git log (group related commits, not a raw list)
- **Key Decisions**: anything inferrable from the codebase or README (tech choices, architecture patterns)
- **Blockers / Open Questions**: anything that looks in-progress or TODO in recent changes
- **Next Steps**: infer from recent git activity and any TODO/FIXME in recent files

After writing, show the user what you drafted and say: "I've inferred this from your codebase — adjust anything that's off."

### Step 6: Update CLAUDE.md

**If CLAUDE.md doesn't exist**, create it with just the sessions section:
```markdown
## Session Tracking

This project uses session files to maintain context across conversations.

- **Load context**: `/start-session` at the beginning of each conversation
- **Checkpoint**: `/update-session` after completing something or before stepping away
- **Wrap up**: `/end-session` at the end of the day
- **Search history**: `/session-log <topic>` to find past decisions

Context lives in `docs/sessions/CURRENT.md`. Session archive in `docs/sessions/`.
```

**If CLAUDE.md already exists**, append the same section at the end (don't modify existing content).

### Step 7: Confirm

Report what was created:
```
Session tracking initialized.

Created:
  docs/sessions/CURRENT.md

Updated:
  CLAUDE.md  (added Session Tracking section)

Run `/start-session` to begin your first session.
```
