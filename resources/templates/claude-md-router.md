# {Project Name} — Claude Context

{2 sentences: what this project is + primary stack/deploy targets.}

## Build/Run Rules
{ONLY always-relevant hard constraints — build commands, deploy flow, what never to run. Verbatim NEVER/MUST language.}

## Path-Scoped Rules
Mandates in `.claude/rules/` load automatically when matching files are touched — do not restate or weaken them:
{`rule-a` · `rule-b` · …}

## Foundational Context
`foundational/` holds current-state TRUTH (dated snapshots). Before starting a task, load ONLY the files relevant to it — never all by default:
- `project-context.md` — planning anything, "what's in flight", deploy questions
- `decision-rules.md` — choosing task shape, ask-vs-move, risky actions, evidence standards
{- `domain-truth.md` — any {domain} work}
{- `audience-profile.md` — audience-facing output}
{- `performance-patterns.md` — debugging known traps, pre-sign-off}

Ownership map + maintenance loop: `foundational/README.md`. When output was wrong because truth was missing or stale, update the smallest foundational file that would have changed the answer.

## Reference Files — read WHEN
| File | Read when |
|------|-----------|
| {path} | {specific trigger — "writing X", "planning Y" — never just "important file"} |

## Repository Map
{Folder purposes only, one line each. Not every file.}

<!-- LINE TEST for every line in this file: if deleted, does the next answer change? No → cut. Target ≤130 lines. -->
