---
description: Mid-session checkpoint. Captures recent progress and updates CURRENT.md without writing a full dated archive. Run after completing something meaningful or before stepping away briefly.
allowed-tools: Read, Write, Bash(date:*), Bash(mkdir:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Current session file:
!`cat docs/sessions/CURRENT.md 2>/dev/null || echo "NO_CURRENT_FILE"`

## Your task

Look back at this conversation and identify what has been accomplished since the last checkpoint (or since the session started if this is the first update).

**What to capture:**
- Specific things completed: files created or modified, features implemented, bugs fixed, decisions made
- Any blockers or open questions that surfaced
- Updated next steps based on where things stand now

**Then update `docs/sessions/CURRENT.md`** — rewrite the file using this structure, preserving "What We're Building" unless it changed:

```
# Current Context

_Last updated: YYYY-MM-DD_

## What We're Building

[keep existing unless it changed]

## Last Session (YYYY-MM-DD)

### Accomplished

[merge prior accomplishments + what was just done in this conversation]

### Key Decisions

[keep prior decisions, add any new ones]

### Blockers / Open Questions

[updated list]

## Next Steps (pick up here)

1. [most immediate next action — specific enough to act on without re-reading the conversation]
2. ...
3. ...
```

**Rules:**
- Be specific: "Added rate limiting to `src/api/upload.ts`" not "worked on the API"
- Next steps must be actionable: "Implement retry logic in `fetchUser()`" not "continue working on fetch"
- This is a lightweight update — don't write a dated archive file, just refresh CURRENT.md

Confirm when done: "CURRENT.md updated with latest progress."
