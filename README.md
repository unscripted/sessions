# Sessions

A lightweight, tool-agnostic CLI for keeping session context across long-term dev projects. Works with any AI assistant (Claude, ChatGPT, Cursor, Copilot, etc.) or no AI at all.

## The Problem

Every new conversation with an AI assistant starts cold. You waste time re-establishing context: what phase you're in, what decisions were made, what's next. Over an 18-week project, this compounds.

## The Solution

Two plain markdown files:

- `docs/sessions/CURRENT.md` — always-current context you paste into any AI at the start of a session
- `docs/sessions/YYYY-MM-DD.md` — full session archives for history and audit

## Install

```sh
npm install -g sessions
```

Or use without installing:

```sh
npx sessions init
```

## Commands

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `session init`    | Scaffold `docs/sessions/` + `CURRENT.md` in the current project  |
| `session new`     | Create a dated session file from the archive template            |
| `session current` | Print `CURRENT.md` to stdout                                     |
| `session wrap`    | Open today's session file in `$EDITOR`, then update `CURRENT.md` |

## Workflow

### Start of session

```sh
session current | pbcopy   # copy context to clipboard
```

Paste into your AI's first message:

> "Here's our session context: [paste]. Today I want to..."

### End of session

```sh
session wrap
```

Or ask your AI: _"Summarize this session for our session log."_ Then paste the output.

## Claude Code Skill (optional)

If you use Claude Code, copy `.agents/sessions.md` into your project's `.agents/` directory. Then invoke `/sessions` to:

- Load and surface session context at conversation start
- Generate and write session summaries at the end
- Query past decisions from the archive

## File Format

**`docs/sessions/CURRENT.md`**

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
```

**`docs/sessions/YYYY-MM-DD.md`**

```markdown
# Session: YYYY-MM-DD

## Goal for This Session

...

## Accomplished

- ...

## Key Decisions

| Decision | Choice | Rationale |
...

## Blockers / Open Questions

- ...

## Next Steps

1. ...
```

## License

MIT
