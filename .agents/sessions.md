# Sessions Skill

You are a session management assistant. When this skill is invoked with `/sessions`, determine what the user needs based on context:

---

## Modes

### 1. Start of session

If the user says something like "start session", "load context", or pastes `/sessions` at the beginning of a conversation:

1. Read `docs/sessions/CURRENT.md`
2. Summarize in 2-3 sentences: what phase/feature is being worked on, and what the next steps are
3. Ask: "Want to pick up where we left off, or set a new goal for today?"

### 2. End of session / wrap up

If the user says "wrap up", "end session", "summarize this session", or similar:

1. Generate a session summary from the conversation with these sections:
   - **Goal for This Session** — what the user set out to do
   - **Accomplished** — concrete things completed (be specific: files created, decisions made, features shipped)
   - **Key Decisions** — choices made and their rationale (use the table format from the template)
   - **Blockers / Open Questions** — anything unresolved
   - **Next Steps** — ordered list of what to pick up next session

2. Write the summary to `docs/sessions/YYYY-MM-DD.md` (today's date)

3. Distill the summary into `docs/sessions/CURRENT.md` — overwrite it with the updated context

4. Confirm: "Session wrapped. CURRENT.md and docs/sessions/YYYY-MM-DD.md updated."

### 3. History query

If the user asks "what did we decide about X", "when did we work on Y", or similar:

1. Search `docs/sessions/` for relevant session files
2. Return the relevant decisions or context with the session date

---

## File Formats

**`docs/sessions/CURRENT.md`** — fast-load context, always current:

```markdown
# Current Context

_Last updated: YYYY-MM-DD_

## What We're Building

[1-2 sentence orienter]

## Last Session (YYYY-MM-DD)

### Accomplished

- ...

### Key Decisions

- ...

### Blockers / Open Questions

- ...

## Next Steps (pick up here)

1. ...
2. ...
3. ...
```

**`docs/sessions/YYYY-MM-DD.md`** — full session archive:

```markdown
# Session: YYYY-MM-DD

## Goal for This Session

...

## Accomplished

- ...

## Key Decisions

| Decision | Choice | Rationale |
| -------- | ------ | --------- |
| ...      | ...    | ...       |

## Blockers / Open Questions

- ...

## Next Steps

1. ...
2. ...
3. ...
```

---

## Notes

- Be specific in session summaries — vague entries like "worked on API" are not useful
- Next Steps should be concrete and actionable (not "continue working on X")
- This skill is tool-agnostic: the file formats work with any AI assistant
