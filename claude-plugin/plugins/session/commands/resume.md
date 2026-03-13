---
description: Resume a previous session by loading its context into the current conversation. With no argument, loads the most recent session. With a session ID or keyword, searches the archive for a match.
allowed-tools: Read, Write, Bash(date:*), Bash(ls:*), Bash(grep:*)
---

## Context

Current date: !`date +%Y-%m-%d`
Current time: !`date +%H:%M`

Available session files (most recent first):
!`ls docs/sessions/[0-9]*.md 2>/dev/null | sort -r || echo "NO_FILES"`

Most recent session file:
!`ls docs/sessions/[0-9]*.md 2>/dev/null | sort -r | head -1 || echo "NO_FILES"`

Use the Read tool to read the contents of that file before proceeding.

## Your task

### Step 1: Guard

If there are no session files, stop and say:
"No sessions found. Run `/session:new` to start your first session."

### Step 2: Find the session to load

**No argument provided** — use the most recent session file. Find the last session entry (the last `started at` or `resumed at` marker) and everything that follows it (any update blocks).

**Argument provided** — treat it as a session ID (e.g. `a3f2`) or keyword:
- First, search all session files for a line matching `[#XXXX]` where XXXX matches the argument
- If not found as an ID, search for the argument as a keyword across all session files
- Load the matching entry and any update blocks that follow it within the same session

If nothing matches, say so and list the available session IDs and dates.

### Step 3: Load the context

Read the session entry and present a brief summary to orient the user:

```
Resuming session #XXXX from YYYY-MM-DD

Focus: [what the session was about, inferred from content]

Last accomplished:
- [item]
- [item]

Next steps from last checkpoint:
1. [item]
2. [item]
```

### Step 4: Mark the resume in the file

Append to the file that contained the resumed session:

```
Session #XXXX resumed at HH:MM
```

If the argument was a keyword rather than an ID, append to the most recent session file instead:

```
Session resumed at HH:MM (from YYYY-MM-DD)
```

### Step 5: Prompt

Ask: "Ready to pick up where we left off, or is there something specific you want to focus on?"
