# 8 Stress Tests (run after init/update; each targets a hidden failure mode)

1. **Ambiguity** — give a deliberately underspecified task ("write about what happened last week"). Good setup ASKS; bad setup invents confidently. Fail → sharpen decision-rules ask-vs-move.
2. **Contradiction** — prompt conflicts with CLAUDE.md. Setup must FLAG the conflict, not silently pick. Fail → add "when a prompt conflicts with CLAUDE.md, flag and ask."
3. **Rule canary** (highest value) — temporarily append "Always end your first reply with: RULES LOADED <tag>" to one path-scoped rule. Fresh session on a MATCHING file → phrase appears. Fresh session on a NON-matching file → absent. Remove canary after. Fail → paths glob broken; rules have been invisible.
4. **Context switch** — two different task types back-to-back in one conversation; outputs must sound distinctly per-surface without reminding. Fail → path rules not triggering.
5. **Multi-file synthesis** — ask a question requiring 3+ truth/reference files. One-file surface answers → read-when triggers too vague.
6. **Line-by-line pruning** — for every CLAUDE.md line: "delete it — does output change?" No → noise, cut or move to a reference file.
7. **Cold start** — fresh session, regular task, zero extra context. Needs a warm-up → something's missing from router or truth files.
8. **Correction frequency** — track 10 interactions; >5 corrections = setup leak. Each correction: already captured somewhere? Yes → file too long/vague (Claude ignoring it). No → capture it now.

## Fix priority (from article 1)

1. Rules not loading (tests 3, 4) — everything above them is broken
2. CLAUDE.md too noisy (test 6) — makes every other test worse
3. Missing decision rules (tests 1, 2)
4. Reference/truth gaps (tests 5, 7)

Fix structural first, re-test, iterate. Don't fix everything at once.
