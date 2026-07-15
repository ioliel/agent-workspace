---
paths:
  - "src/**"
  - "lib/**"
  - "tests/**"
---

# Engineering Practices — MANDATORY

<!-- Fill from the init interview; delete lines that don't apply. Every line must change behavior. -->

## Before claiming DONE
- Run `{verification command — e.g. npx tsc --noEmit, npm test, pytest}` — must be clean. Type/lint-clean is NOT "working": {runtime verification for this project — run the app / hit the endpoint / render the page}.

## Code standards
- No placeholder comments, no truncated code, no TODO-stubs shipped as done — full output required.
- Reuse before writing: check {existing utils/components location} for an equivalent first.
- Error handling floor: {trust boundaries that must validate input; failures that must not lose data}.
- {Naming/idiom conventions specific to this stack}.

## Never
- {stack-specific landmines — e.g. "never edit generated files in {dir}", "never bypass the ORM for writes", "never commit .env"}

Full conventions: {pointer to CONTRIBUTING.md / style guide, if one exists}.
