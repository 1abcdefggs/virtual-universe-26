#!/usr/bin/env bash
set -euo pipefail

printf '\n%s\n\n' \
  'Welcome to Section 1: The Modern GitHub Experience!' \
  'Please wait while the Section 1 README opens in preview mode.' \
  'Once it appears, follow Getting started in the preview.'

# Open the Section 1 README with `code`, which applies the Markdown preview
# association (openFiles always opens a plain text editor).
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
code "$repo_root/01-github-latest-features/README.md"
