#!/usr/bin/env node
// SessionStart hook: warn when foundational/project-context.md is stale.
// Install (opt-in): copy into <project>/.claude/, then in .claude/settings.json:
//   "hooks": { "SessionStart": [ { "hooks": [ { "type": "command", "command": "node .claude/check-freshness.cjs" } ] } ] }
// Exit 0 always — warn-only, never blocks.

const fs = require('fs');
const path = require('path');

const FRESHNESS_DAYS = 14; // ponytail: hardcoded default; edit here if a project needs a different window
const file = path.join(process.cwd(), 'foundational', 'project-context.md');

try {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/Last updated:\s*(\d{4}-\d{2}-\d{2})/i);
  if (!m) {
    console.log('[agent-workspace] foundational/project-context.md has no "Last updated:" date — add one.');
  } else {
    const ageDays = Math.floor((Date.now() - new Date(m[1] + 'T00:00:00Z').getTime()) / 86400000);
    if (ageDays > FRESHNESS_DAYS) {
      console.log(
        `[agent-workspace] STALE TRUTH: foundational/project-context.md last updated ${m[1]} (${ageDays}d ago, window ${FRESHNESS_DAYS}d). ` +
        'Verify "Active now" against the project state source before acting on it.'
      );
    }
  }
} catch {
  // No foundational folder — nothing to check.
}
process.exit(0);
