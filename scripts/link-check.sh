#!/usr/bin/env bash
# Check links in the built site.
#
#   ./scripts/link-check.sh internal   # links between pages and assets
#   ./scripts/link-check.sh external   # links to other hosts
#
# Exits non-zero when a link is broken or when the report is missing, so a
# checker that failed to run cannot look like a pass. Requires lychee 0.24.1 or
# later on PATH and a build in .vitepress/dist.
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$repo_root"

mode=${1:-internal}
case "$mode" in
  internal) schemes=(--scheme file) ;;
  external) schemes=(--scheme http --scheme https) ;;
  *) echo "usage: $0 [internal|external]" >&2; exit 2 ;;
esac

if [ ! -d .vitepress/dist ]; then
  echo "no build found in .vitepress/dist; run npm run build first" >&2
  exit 1
fi

report=${LYCHEE_REPORT:-lychee-report.md}
rm -f "$report"

if lychee .vitepress/dist --root-dir .vitepress/dist "${schemes[@]}" \
  --format markdown --output "$report"; then
  status=0
else
  status=$?
fi

# The summary table is the only proof that lychee ran. A missing report, or one
# without the table, means the tool failed, not that the links are fine.
if ! grep -q 'Total' "$report" 2>/dev/null; then
  echo "lychee wrote no report for $mode links; the check did not run" >&2
  cat "$report" >&2 2>/dev/null || true
  exit 1
fi

# A zero total means lychee ran but checked nothing: a wrong scheme, a wrong
# root, or an empty build. That is not a pass.
total=$(grep -oE 'Total[[:space:]]*\|[[:space:]]*[0-9]+' "$report" | head -1 | grep -oE '[0-9]+$')
if [ -z "$total" ] || [ "$total" -eq 0 ]; then
  echo "lychee checked no links for $mode; the check did not run" >&2
  cat "$report" >&2
  exit 1
fi

cat "$report"
if [ -n "${GITHUB_STEP_SUMMARY:-}" ]; then
  cat "$report" >> "$GITHUB_STEP_SUMMARY"
fi

exit "$status"
