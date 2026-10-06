#!/usr/bin/env bash
set -euo pipefail

installed_extensions="$(gh extension list)"
if ! grep -Fq 'github/gh-stack' <<< "$installed_extensions"; then
  gh extension install github/gh-stack
fi
git config --global rerere.enabled true
git config --global remote.pushDefault origin
