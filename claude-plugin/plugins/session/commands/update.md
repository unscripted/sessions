---
description: Checkpoint the current session. Summarizes everything accomplished since the last timestamp and appends it to the session file.
allowed-tools: Read, Write, Bash(date:*), Bash(ls:*), Bash(mkdir:*)
---

## Context

Current date: !`date +%Y-%m-%d`
Current time: !`date +%H:%M`

Most recent session file:
!`ls docs/sessions/[0-9]*.md 2>/dev/null | sort -r | head -1 || echo "NO_FILES"`

Contents of most recent session file:
!`cat $(ls docs/sessions/[0-9]*.md 2>/dev/null | sort -r | head -1) 2>/dev/null || echo "NO_CONTENT"`

## Your task

### Step 1: Guard

If there are no session files (`NO_FILES`), stop and say:
"No sessions found. Run `/session:new` to start one."

### Step 2: Determine the target file

**If the most recent file is today's date** — append to it. Find the most recent timestamp line (a line containing `started at` or `resumed at`) — that marks where the current session began. Summarize everything in the conversation since that point.

**If the most recent file is a previous date** — create `docs/sessions/YYYY-MM-DD.md` for today. Summarize the full current conversation (no starting timestamp, since session:new was not run).

### Step 3: Build the summary

Look back at the conversation since the last timestamp and extract:

- **Accomplished** — specific things completed: files created or modified, decisions made, bugs fixed, features shipped. "Added rate limiting to `src/api/upload.ts`" not "worked on the API."
- **Key Decisions** — choices made and why (table format)
- **Blockers / Open Questions** — anything unresolved or unclear
- **Commits Made** - list with the commit hash and subject line of each commit made during the working session
- **Next Steps** — what to pick up next; replace entirely with the current best understanding

### Step 4: Append the block

Append to the target file:

```markdown
---

### Accomplished (HH:MM – HH:MM)

- [specific item]
- [specific item]

### Key Decisions

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| ...      | ...    | ...       |

### Blockers / Open Questions

- [item]

### Commits

- [hash] [Subject]

### Next Steps

1. [specific, actionable item]
2. [specific, actionable item]
```

Use the start time from the most recent session marker and the current time as the end time.

Confirm: "Session updated at HH:MM."
