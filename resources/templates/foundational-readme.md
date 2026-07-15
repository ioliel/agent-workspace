# /foundational — Current-State Truth for AI Agents

Instructions (CLAUDE.md, `.claude/rules/`) say what to DO. This folder says what is TRUE. Load per task via the routing block in CLAUDE.md — never all files by default.

## Truth-store ownership map (exactly one home per fact)

| Store | Owns | Never put here |
|-------|------|----------------|
| {specs dir, e.g. docs/ or .planning/} | Feature/design SPECS — how it should be built | Session state, current priorities |
| {loop-state dir, e.g. .paul/ — if any} | Process state + history | Durable truths (they get buried) |
| `foundational/` (this) | Current-state truth SNAPSHOTS — dated, freshness-ruled, small | Full specs (point at them) |
| {memory system, e.g. Claude Code auto-memory} | User preferences + cross-session feedback | Project facts derivable from the repo |
| {caches/derived stores — if any} | Derived/search data | Anything authoritative |

## Maintenance loop (from friction, not schedule)

After a meaningful task, ask: *what did the agent get wrong because truth was missing, stale, or vague?* Update the SMALLEST file that would have changed the answer:
- Stale project facts → `project-context.md`
- Wrong task shape / risky action / bad ask-vs-move → `decision-rules.md`
- {Wrong domain output → `domain-truth.md`}
- {Missed the audience → `audience-profile.md`}
- {Re-hit a known trap → `performance-patterns.md`}

Test for every line added: **would the next answer change because of this line?** If no — cut it. Empty is better than fake clarity.
