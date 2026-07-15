---
name: "Agent Workspace"
description: "Init or update a project's AI-optimized structure: lean CLAUDE.md router, path-scoped .claude/rules/, /foundational truth folder with progressive-disclosure routing. Use when the user invokes /agent-workspace, asks to 'init a vibe coding project', 'set up AI project structure', 'apply The AI Maker methodology', or 'audit/update CLAUDE.md and context structure' on an existing repo."
---

# Agent Workspace

## What This Skill Does

Applies "The AI Maker" methodology (blank-folder system + context folder), field-validated on a production brownfield retrofit (2026-07):
1. **`init`** — scaffold a NEW project: Dump → /init → Interview → Audit, plus rules dir, foundational truth folder, routing block.
2. **`update`** — retrofit an EXISTING project safely: audit CLAUDE.md line-by-line, extract path-scoped rules, build foundational from real state, hygiene pass.

Core principle: instructions (CLAUDE.md, rules) say what to DO; `foundational/` says what is TRUE. CLAUDE.md stays a ≤130-line router — every line must **constrain behavior, trigger a decision, or point to a file**. Full findings: [docs/FINDINGS.md](docs/FINDINGS.md).

## Quick Start

- `/agent-workspace init` — in an empty or new project folder
- `/agent-workspace update` — in an existing repo (safe-mode retrofit)

---

## Mode: init (greenfield)

### Step 1 — Dump
Tell the user: throw ALL raw material into the folder first (code, docs, briefs, past work, brand files). Don't organize, don't rename. Claude can't build context from an empty folder.

### Step 2 — Generate
Run `/init` (Claude Code built-in) to scan and draft CLAUDE.md. This gets ~60–70%.

### Step 3 — Interview (the step everyone skips)
Ask the user targeted questions grounded in what the dump revealed — preferences, anti-patterns, decision rules, ask-vs-move boundaries. Prompt pattern: *"Based on what I now know about this project, here are the questions whose answers would most improve how I work here…"* Fold answers into CLAUDE.md.

**Include the truth-file interview:** which foundational files does THIS project need? Offer the menu (project-context and decision-rules are near-universal; the rest depend on the project):
- `project-context.md` — dated current-state snapshot + freshness rule (almost always)
- `decision-rules.md` — mode defaults, ask-vs-move, evidence standards (almost always)
- `domain-truth.md` — design tokens / API contracts / domain constants (rename per domain, e.g. design-truth)
- `audience-profile.md` — who the output serves, what builds/kills their trust
- `performance-patterns.md` — hardened lessons table (starts empty, grows from friction)
- `operator-profile.md` / `creator-style.md` — ONLY if no memory system owns user prefs/voice (Claude Code auto-memory usually does — skip to avoid drift)

Scaffold chosen files from [resources/templates/](resources/templates/), plus `foundational/README.md` (ownership map — mandatory).

### Step 4 — Audit
Line-test every CLAUDE.md line: *"if I delete this, does the next answer change?"* No → cut. Add the routing block (template: `resources/templates/claude-md-router.md`). Target ≤130 lines.

### Step 5 — Work-product good practices (activated BY the interview, never by default)
The Step-3 interview asks: *"What's the work product?"* Route:
- **Code project** → ask the stack, then climb the ladder: prefer the stack's OFFICIAL scaffolder (`create-next-app`, `npm create vite`, `uv init`, `cargo new`…) over hand-rolled structure. Then layer on top:
  - stack-appropriate `.gitignore` + formatter/linter/typecheck config (only what the stack conventionally uses — no speculative tooling)
  - one runnable verification command documented in CLAUDE.md Build Rules (typecheck/test — the "before saying done" command)
  - `.claude/rules/engineering.md` from [resources/templates/rule-engineering.md](resources/templates/rule-engineering.md), path-scoped to the source dirs — agents ENFORCE the practices, configs alone don't
  - verification standards mirrored into `foundational/decision-rules.md` → evidence section
- **Content/research project** → conventions instead of tooling: naming scheme, folder-per-surface, draft/final separation, archive policy — recorded as a path-scoped rule, not prose in CLAUDE.md.
- **Quick/scratch project** → skip entirely. Practices are an interview branch, not ceremony.

In `update` mode this step is AUDIT-ONLY: flag gaps (no typecheck script, no lint, untested money paths) in the report; impose nothing.

### Step 6 — Rules dir + hook offer
Create `.claude/rules/` with `_example.md` showing `paths:` frontmatter. Then OFFER (never silently install) the staleness hook — see Hook section.

### Step 7 — Cold-start check
Fresh session, one real task, zero extra context. Usable first output = pass. Friction found = first maintenance-loop update.

---

## Mode: update (brownfield — SAFE MODE, always)

Order matters; each phase is its own reviewable chunk:

1. **Recon (read-only):** measure CLAUDE.md lines; inventory which mandates are path-scoped vs always-relevant; map truth stores (specs / loop state / memory / caches); find code-referenced paths (build reads, Docker contexts, deploy surfaces) — these NEVER move.
2. **Router + rules:** extract path-scoped mandates to `.claude/rules/*.md` with `paths:` frontmatter — copy NEVER/MUST sentences **verbatim** (trim prose, never soften language). Rewrite CLAUDE.md as router. Produce a mandate-trace table (old line → new home) — zero mandates lost.
   **Checkpoint — rule canary test** (see [docs/STRESS-TESTS.md](docs/STRESS-TESTS.md) #3): fresh session + matching file must show the canary; non-matching file must not. If rules don't auto-load in that environment: fallback = keep mandates compressed in CLAUDE.md, rules become read-when reference targets.
3. **Foundational:** build truth files from ACTUAL project state (state docs, memory, shipped history). Never invent — uncertain facts go under "changing/uncertain" with the open question stated. Dated headers + freshness rules on volatile files.
   **Checkpoint — human truth review:** the user reviews for factual errors (in field use this immediately caught a shipped-to-prod feature still marked blocked). Wrong truth poisons every future session.
4. **Hygiene:** gitignore policy for debris + confidential binaries; organized commits. Ask before deleting anything not obviously junk — folders containing `.obsidian/` or other user-workspace markers are NEVER debris.

---

## The Staleness Hook (opt-in, offered at init/update)

A SessionStart hook that warns when `foundational/project-context.md`'s `Last updated:` exceeds its freshness window (default 14 days). Install ONLY on user yes:

1. Copy `scripts/check-freshness.cjs` into the project's `.claude/` dir.
2. Add to the project's `.claude/settings.json` hooks: SessionStart → `node .claude/check-freshness.cjs`.

Script: [scripts/check-freshness.cjs](scripts/check-freshness.cjs). Declining = fine; the friction-driven maintenance loop is the articles' default position.

---

## Hard Rules (both modes)

- Every CLAUDE.md line: constrain / decide / point — or delete. ≤130 lines.
- Mandate language copied verbatim when moving; never paraphrase NEVER/MUST.
- Never move code-referenced paths without build/deploy verification (safe mode).
- Never invent truth-file content; empty beats fake clarity.
- One home per fact — write the ownership map (foundational/README template).
- Maintenance = friction-driven: after a miss, update the SMALLEST file that would have changed the answer. No scheduled audits.
- Layer signals: rule ← repeating corrections · command ← 3× same workflow · skill ← should auto-trigger · agent ← background work. Don't automate early.

## Reference

- [docs/FINDINGS.md](docs/FINDINGS.md) — the 10 validated findings with evidence
- [docs/STRESS-TESTS.md](docs/STRESS-TESTS.md) — 8 stress tests + fix priority
- [resources/templates/](resources/templates/) — router + all foundational templates + rule-file example
