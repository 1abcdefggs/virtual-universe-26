# Getting started with GitHub Issue Artifacts

Create an issue with a screenshot, then preserve the bug report and agent
investigation as Issue Artifacts.

## Before you begin

Use a GitHub Codespace, GitHub CLI with `--attach` support, and a writable
fork with issues enabled. Confirm the CLI targets your fork, not the shared
event repository. This starter page outlines the exercise; the screenshot,
sample app, and full command sequence are not included here yet.

## Exercise outline

1. Create an issue containing the bug report and screenshot using
   `gh issue create --attach`.
2. Open the issue on GitHub and check the image is visible.
3. Retrieve the latest issue's details from your selected repository.
   Confirm its URL before making another change.
4. Use the Issue Artifacts API through `gh api` to preserve the bug report
   and uploaded image as a structured artifact.
5. Add the agent's shareable investigation summary as a second artifact.

`--attach` embeds media in an issue body. It does not by itself create a
structured Issue Artifact. Use a concise investigation summary, not private
agent reasoning.

## What to check

Your fork contains the issue and two separately readable artifacts:
the bug report with screenshot, and the investigation summary.

## References

- [GitHub CLI issue creation](https://cli.github.com/manual/gh_issue_create)
- [GitHub CLI API requests](https://cli.github.com/manual/gh_api)

[Next: Create your first stacked PR](../create-your-first-stacked-pr/) ·
[Back to Section 1](../README.md)
