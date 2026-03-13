---
description: Load session context at the start of a work session. Reads CURRENT.md, gives a brief orientation, and asks what to focus on today.
allowed-tools: Read, Bash(ls:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Session context:
!`cat docs/sessions/CURRENT.md 2>/dev/null || echo "NO_CURRENT_FILE"`

## Your task

If the output above is `NO_CURRENT_FILE`:
- Tell the user there's no session context yet for this project
- Suggest they run `session init` (if they have the CLI installed) or that you can create `docs/sessions/CURRENT.md` from scratch after they describe what they're working on
- Ask: "What are you building and where do you want to start?"
- Stop here

Otherwise:
1. Read the context and give a **2–3 sentence orientation** — what's being built, current phase, what's immediately next. Don't repeat the file back; synthesize it.
2. Ask: "Want to pick up where we left off, or set a new goal for today?"

Keep it brief. The user needs to orient quickly, not re-read everything they already know.
