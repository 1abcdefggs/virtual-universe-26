# Create your first agentic workflow

Explore an automated review workflow and follow a finding through to a fix.

## Before you begin

Use your own fork and the same Codespace as the other Section 1 exercises.
Review GitHub Actions permissions and the chosen workflow's authentication
requirements before enabling it.

This starter guide does not install or enable a workflow.

## Exercise outline

1. Browse the [Agentic Workflows gallery](https://github.github.com/gh-aw/gallery/)
   and choose a bounded review example.
2. Inspect its trigger, permissions, model access, and allowed outputs.
3. Start with a manual run against a small sample change.
4. Inspect the workflow output and verify any reported finding against
   the code before acting on it.
5. Fix a confirmed finding, rerun the review, and compare the results.
6. Consider PR-update triggers only after the manual flow is understood.

Do not assume that the interactive `/security-review` command can simply
be invoked inside a workflow. That integration and its authentication need
to be validated for the selected example. Treat fork PRs as untrusted input
and never expose secrets to their code.

## What to check

The workflow has a clear scope, produces reviewable evidence, and leaves
changes and merge decisions under human control.

[Back to Section 1](../README.md)
