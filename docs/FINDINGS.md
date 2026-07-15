# Validated Findings

Sources: The AI Maker — "From Blank Folder to Working System" (Apr 2026) + "The Complete Guide to the Context Folder" (May 2026). Field validation: a production brownfield retrofit, 2026-07.

| # | Finding | Evidence |
|---|---------|----------|
| 1 | CLAUDE.md is a ROUTER, ≤130 lines. Past ~150–200 lines Claude selectively ignores rules — everything equally important means nothing is. Every line must constrain behavior, trigger a decision, or point to a file with a read-when trigger. | Author cut 500→130 and "Claude got dramatically better." Validation retrofit: 199→88. |
| 2 | `.claude/rules/*.md` with `paths:` glob frontmatter auto-load ONLY when matching files are touched. Path-scoped mandates (design systems, schema gotchas, domain rules) belong there, never in CLAUDE.md. | Canary-proven in field use: an edit to a matching UI file surfaced the canary; a question about a scripts/ file loaded the schema rule instead. Session log shows "Loaded .claude\rules\<file>". |
| 3 | Instructions vs truth split: CLAUDE.md/rules = what to DO; `foundational/` = what is TRUE (dated snapshots, freshness rules). Agents acting on stale truth produce confidently-wrong output. | Validation project: a public-facing page had shipped multiply-wrong figures sourced from stale context; the truth folder's first human review caught a shipped-to-prod feature still marked blocked. |
| 4 | Progressive disclosure routing block: map task types → specific truth files, "load only the files that are relevant." Never a giant master prompt. | Article's core mechanism; applied verbatim. |
| 5 | Greenfield init = Dump → /init → Interview → Audit. Dump raw files BEFORE anything (no context from an empty folder); /init gets 60–70%; the interview (Claude asks the user) captures what files can't show; audit applies the line test. | Article's three-phase process. |
| 6 | Maintenance is friction-driven, never scheduled. After a miss: update the smallest file that would have changed the answer. Test for every added line: "would the next answer change?" | Both articles; the ownership-map README encodes it per project. |
| 7 | Layer-addition signals: rule ← repeated corrections; command ← same workflow 3×; skill ← should trigger automatically; agent ← background/parallel work. Automation comes from experience, not speculation. | Article 1 "let friction be your guide." |
| 8 | Stress tests catch failure modes normal use hides — the rule canary is the highest-value single test (proves rules actually load vs silently invisible). | See STRESS-TESTS.md. Canary validated live. |
| 9 | Truth-store ownership map (extension beyond the articles): exactly one home per fact across specs / loop-state / foundational / memory / caches. If a memory system owns user prefs, SKIP operator-profile/creator-style to avoid drift. | Validation project had 4 overlapping truth stores before the map ended the ambiguity. |
| 10 | Brownfield SAFE MODE (extension): never move code-referenced paths (build-time reads, Docker contexts, donor dirs, ingest sources); reorganize via new folders + gitignore + archive. Zero deploy risk. | Validation project: content dirs were read at build time and a second app inside the repo was a Docker build context — physical moves would have broken two deploy targets. |

## Anti-patterns the articles name

- 500-line CLAUDE.md ("everything becomes equally important, which means nothing is")
- FYI/informational lines ("every informational line dilutes the lines that matter")
- Copy-pasting content instead of pointing with read-when triggers
- Building commands/skills for things done once
- Writing rules for imaginary situations ("the file got long, but a lot of it was imaginary")
- Performance data as scoreboard ("do more of what won once") instead of transferable patterns
- Slogans without a rule-out ("a principle with no rule-out is a slogan")
