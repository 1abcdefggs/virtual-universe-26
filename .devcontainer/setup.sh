#!/usr/bin/env bash
gh extension install github/gh-stack || true
git config --global rerere.enabled true
git config --global remote.pushDefault origin
