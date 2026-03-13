---
description: Initialize session tracking for a project. Handles three cases: brand new project with no CLAUDE.md, new project with an existing CLAUDE.md, and an established project adding sessions for the first time.
allowed-tools: Read, Write, Bash(ls:*), Bash(mkdir:*), Bash(git log:*), Bash(git status:*), Bash(date:*), Bash(find:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Already initialized?
!`ls docs/sessions/ > /dev/null 2>&1 && echo "YES" || echo "NO"`

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

If `docs/sessions/` already exists, stop and say:
"Session tracking is already initialized. Run `/session:new` to start a session or `/session:resume` to pick up where you left off."

### Step 2: Determine the scenario

Use the context above to classify:

**A — Brand new project**: No CLAUDE.md, no README with real content, no git history (or just an initial commit). Nothing to infer from.

**B — New project with existing CLAUDE.md**: Has a CLAUDE.md but no session history. Can infer intent from CLAUDE.md and README.

**C — Established project**: Has meaningful git history, a populated README, or a CLAUDE.md with real content. Sessions is being added to an ongoing project.

### Step 3: Gather missing context (Scenario A only)

For a brand new project, ask the user:
- "What are you building?" (a sentence or two — purpose and tech stack)
- "What's the first thing you're working on?"

Wait for their response before proceeding. Don't write any files yet.

### Step 4: Create docs/sessions/

Run `mkdir -p docs/sessions` to create the directory.

### Step 5: Seed the first session file (Scenario C only)

For established projects, create `docs/sessions/YYYY-MM-DD.md` with an inferred summary of recent work so the history isn't empty:

```markdown
# YYYY-MM-DD

Session history initialized

### What We're Building

[synthesized from README and codebase — 1–2 sentences]

### Recent Work (inferred from git history)

- [grouped summary of recent commits — not a raw list]

### Key Decisions (inferred)

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| ...      | ...    | ...       |

### Open Questions

- [anything that looks in-progress or TODO in recent changes]
```

Show the user what you drafted and say: "I've inferred this from your codebase — adjust anything that's off."

For Scenarios A and B, leave the daily file for `/session:new` to create when the user starts their first session.

### Step 6: Update CLAUDE.md

**If CLAUDE.md doesn't exist**, create it with just the sessions section:

```markdown
## Session Tracking

This project uses session files to maintain context across conversations.

- **New session**: `/session:new` — start fresh with no prior context
- **Resume**: `/session:resume` — pick up where you left off
- **Checkpoint**: `/session:update` — save progress mid-session
- **Search history**: `/session:search` — find past decisions

Session files live in `docs/sessions/YYYY-MM-DD.md`.
```

**If CLAUDE.md already exists**, append the same section at the end.

### Step 7: Confirm

```
Session tracking initialized.

Created:
  docs/sessions/

Updated:
  CLAUDE.md  (added Session Tracking section)

Run `/session:new` to start your first session.
```
