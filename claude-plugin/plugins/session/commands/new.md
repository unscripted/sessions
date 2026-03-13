---
description: Start a new session with a clean slate. Creates today's daily file if needed and marks the session start time. Does not load any prior context.
allowed-tools: Read, Write, Bash(date:*), Bash(ls:*), Bash(mkdir:*)
---

## Context

Current date: !`date +%Y-%m-%d`
Current time: !`date +%H:%M`

Most recent session file:
!`ls docs/sessions/[0-9]*.md 2>/dev/null | sort -r | head -1 || echo "NO_FILES"`

## Your task

### Step 1: Guard

If `docs/sessions/` doesn't exist, stop and say:
"No session directory found. Run `/session:init` first."

### Step 2: Generate a session ID

Generate a 4-character alphanumeric ID (e.g. `a3f2`). This identifies the session for later use with `/session:resume`.

### Step 3: Write the session marker

**If the most recent file is today's date** — append to it:

```
New session started at HH:MM [#XXXX]
```

**If the most recent file is a previous date (or no files exist)** — create `docs/sessions/YYYY-MM-DD.md` and write:

```markdown
# YYYY-MM-DD

New session started at HH:MM [#XXXX]
```

### Step 4: Prompt the user

Confirm and orient them:

```
New session started at HH:MM [#XXXX]

Use /session:update to checkpoint your progress.
Use /session:resume to load context from a previous session.
```

Then ask: "What are you working on today?"
