#!/usr/bin/env bash
# gh 2.96+ is needed for `gh issue create --attach`.
need=2.96
have=$(gh --version | head -1 | awk '{print $3}')
if [ "$(printf '%s\n' "$need" "$have" | sort -V | head -1)" != "$need" ]; then
  v=$(curl -fsSL https://api.github.com/repos/cli/cli/releases/latest | grep -m1 '"tag_name"' | sed -E 's/.*"v([^"]+)".*/\1/')
  curl -fsSLo /tmp/gh.deb "https://github.com/cli/cli/releases/download/v${v}/gh_${v}_linux_$(dpkg --print-architecture).deb"
  sudo dpkg -i /tmp/gh.deb && rm /tmp/gh.deb
fi
gh extension install github/gh-stack || true
git config --global rerere.enabled true
git config --global remote.pushDefault origin
