---
description: Full end-of-day session wrap-up. Generates a comprehensive summary from the conversation, writes a dated archive file, and updates CURRENT.md with fresh context for next time.
allowed-tools: Read, Write, Bash(date:*), Bash(mkdir:*), Bash(ls:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Existing session context:
!`cat docs/sessions/CURRENT.md 2>/dev/null || echo "NO_CURRENT_FILE"`

Existing session archive for today (if any):
!`cat docs/sessions/$(date +%Y-%m-%d).md 2>/dev/null || echo "NO_SESSION_FILE_TODAY"`

## Your task

Generate a full session summary from this conversation and write it to disk.

### Step 1: Draft the summary

Review the full conversation and extract:

- **Goal**: What the user set out to accomplish today (from their first message or `/start-session`)
- **Accomplished**: Every concrete thing completed — be specific about files, functions, features, decisions. If someone read this in 6 months, would they understand exactly what was done?
- **Key Decisions**: Choices made and why. The rationale is as important as the decision itself.
- **Blockers / Open Questions**: Anything unresolved, deferred, or still unclear
- **Next Steps**: Ordered list of what to pick up next session — specific enough to act on without re-reading today's conversation

### Step 2: Write the dated archive

Write to `docs/sessions/YYYY-MM-DD.md` (create `docs/sessions/` if it doesn't exist):

```markdown
# Session: YYYY-MM-DD

## Goal for This Session

[what the user set out to do]

## Accomplished

- [specific item — file, feature, decision, bug fixed]
- [specific item]

## Key Decisions

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| [topic]  | [what was decided] | [why] |

## Blockers / Open Questions

- [item]

## Next Steps

1. [first action — specific and immediately actionable]
2. [second action]
3. [third action]
```

If a session file for today already exists, **append** a `## Update (HH:MM)` section rather than overwriting.

### Step 3: Rewrite CURRENT.md

Overwrite `docs/sessions/CURRENT.md` with a distilled fast-load version:

```markdown
# Current Context

_Last updated: YYYY-MM-DD_

## What We're Building

[1–2 sentence description of the project and current phase]

## Last Session (YYYY-MM-DD)

### Accomplished

- [key item]
- [key item]

### Key Decisions

- [decision: choice — rationale]

### Blockers / Open Questions

- [item]

## Next Steps (pick up here)

1. [first action]
2. [second action]
3. [third action]
```

### Step 4: Confirm

Report both files written:
"Session wrapped. Written to:
- `docs/sessions/YYYY-MM-DD.md`
- `docs/sessions/CURRENT.md`"
