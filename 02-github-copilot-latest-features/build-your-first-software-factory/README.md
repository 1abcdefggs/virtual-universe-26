# Build your first Software Factory

Create a repeatable code-review workflow with security checks and
human-approved improvements.

## The example

A review factory examines a small change, reports correctness and security
concerns with evidence, and uses assessments to propose improvements to
its review instructions.

## Before you begin

Use the GitHub Copilot app and a repository you control. Confirm that
Software Factory creation is available and inspect the supported tools,
triggers, permissions, and costs before approving a configuration.

## Start the conversation

> Help me design a small code-review Software Factory for a repository I
> choose. Include correctness and security review, evidence-based findings,
> and human approval of improvements. Show me the configuration first.
> Do not create or enable anything until I approve it.

## Exercise outline

1. Define the desired review outcome and choose a small sample change.
2. Review the proposed worker instructions and allowed tools.
3. Create the agreed factory paused, with manual assessment.
4. Run an approved sample and inspect the findings and assessment.
5. Review an improvement proposal before accepting any revised instructions.

Model-routing features are not a replacement for explicit review gates.
Do not assume memory, security tools, or automatic merging are included;
inspect and approve each capability separately.

## What to check

Findings cite evidence, configuration changes require approval, and the
factory stays within the agreed repository and execution scope.

[Back to Section 2](../README.md)
