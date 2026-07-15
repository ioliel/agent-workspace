# agent-workspace

A Claude Code skill that **inits** and **updates** AI-optimized project structures, based on The AI Maker's methodology ("From Blank Folder to Working System" + "The Complete Guide to the Context Folder"), field-validated on a real production retrofit (2026-07).

The core idea: **instructions tell the agent what to DO; a truth folder tells it what is TRUE** — and both stay small through progressive disclosure:

- `CLAUDE.md` — a ≤130-line **router**. Every line must constrain behavior, trigger a decision, or point to a file. (Past ~150–200 lines, Claude selectively ignores rules.)
- `.claude/rules/*.md` — **path-scoped mandates** with `paths:` frontmatter that auto-load only when matching files are touched.
- `foundational/` — **dated truth snapshots** (project context, decision rules, domain truth, audience, hardened lessons) loaded per task via a routing block.
- Good-practices setup for the work product (official scaffolder + an auto-loading `engineering.md` rule), activated by the init interview.

## Install

### Personal (all your projects)

```bash
git clone https://github.com/Energia-Real/agent-workspace.git ~/.claude/skills/agent-workspace
```

Windows (PowerShell):

```powershell
git clone https://github.com/Energia-Real/agent-workspace.git "$env:USERPROFILE\.claude\skills\agent-workspace"
```

### Project-scoped (team-shared, committed to the repo)

```bash
git clone https://github.com/Energia-Real/agent-workspace.git <project>/.claude/skills/agent-workspace
```

Restart Claude Code (or start a new session). The skill registers automatically — verify by typing `/agent-workspace` or asking "set up AI project structure".

## Use

### New project (greenfield)

```
cd my-new-project
claude
> /agent-workspace init
```

The skill walks the article's three-phase process:

1. **Dump** — you throw all raw material into the folder first (don't organize)
2. **Generate** — `/init` drafts CLAUDE.md from the dump (~60–70%)
3. **Interview** — Claude asks *you* targeted questions (preferences, anti-patterns, ask-vs-move boundaries) + picks which truth files this project needs
4. **Audit** — line-test every CLAUDE.md line; add the routing block
5. **Good practices** — for code projects: official scaffolder + tooling + an auto-loading `engineering.md` rule; for content projects: conventions; for scratch: skipped
6. **Rules dir + optional staleness hook** (opt-in SessionStart warning when project-context.md goes stale)
7. **Cold-start check** — fresh session, real task, zero extra context

### Existing project (brownfield)

```
cd my-existing-project
claude
> /agent-workspace update
```

Safe-mode retrofit: recon → slim CLAUDE.md into a router + extract path-scoped rules (with a mandate-trace table and a **rule canary test**) → build `foundational/` from actual state (with a **human truth-review checkpoint**) → gitignore/commit hygiene. Never moves code-referenced paths (build reads, Docker contexts, deploy surfaces).

## What gets created

```
project/
├── CLAUDE.md                  # router ≤130 lines
├── .claude/
│   └── rules/                 # path-scoped mandates (auto-load on file match)
│       ├── _example.md
│       └── engineering.md     # code projects: verification-before-done etc.
├── foundational/
│   ├── README.md              # truth-store ownership map + maintenance loop
│   ├── project-context.md     # dated snapshot + freshness rule
│   ├── decision-rules.md
│   └── …                      # chosen at the init interview
└── src/ …                     # from the stack's official scaffolder
```

Deliberately NOT created on day one (added only when friction signals them): `commands/` (same workflow 3×), `skills/` (should auto-trigger), `agents/` (background work).

## Reference

- [`SKILL.md`](SKILL.md) — the skill itself (both modes, hard rules)
- [`docs/FINDINGS.md`](docs/FINDINGS.md) — the 10 validated findings + anti-patterns
- [`docs/STRESS-TESTS.md`](docs/STRESS-TESTS.md) — 8 stress tests incl. the rule canary
- [`resources/templates/`](resources/templates/) — router + rule + all foundational templates
- [`scripts/check-freshness.cjs`](scripts/check-freshness.cjs) — opt-in staleness hook

## Credits

Methodology: [The AI Maker](https://aimaker.substack.com) (Wyndo) — "From Blank Folder to Working System" (Apr 2026) and "The Complete Guide to the Context Folder" (May 2026). This skill operationalizes those articles plus lessons from applying them to a production codebase.
