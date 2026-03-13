---
description: Search past session history. With a search term (e.g. `/session:search authentication`), finds relevant decisions, work, and context from the archive. With no argument, asks what to search for.
allowed-tools: Read, Bash(ls:*), Bash(date:*)
---

## Context

Current date: !`date +%Y-%m-%d`

Available session files:
!`ls docs/sessions/*.md 2>/dev/null | grep -v CURRENT.md | sort -r || echo "NO_SESSION_FILES"`

## Your task

### If no session files exist

Tell the user there's no session history yet and suggest running `/session:end` at the end of today's work to create the first entry.

### If no search term was provided

Ask: "What are you looking for?"

Wait for their response, then search using that term. Don't list sessions or do anything else first — just ask the question.

### If a search term was provided

1. Read the session files most likely to be relevant, starting with the most recent and working backwards. Read as many as needed to give a useful answer — don't stop at the first match.

2. Return matches with context:

```
**[YYYY-MM-DD]** — [brief description of what that session was about]
> [relevant excerpt or paraphrase — the actual decision, finding, or work]
```

3. If the same topic appears across multiple sessions, synthesize: note how the thinking evolved rather than listing each session separately.

4. If nothing is found, say so plainly and suggest alternative search terms based on what you saw in the files.
