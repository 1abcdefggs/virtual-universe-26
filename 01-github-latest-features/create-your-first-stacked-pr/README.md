# Create your first stacked PR

Break a fix into small, dependent pull requests that are easier to review.

## Before you begin

Use the same Codespace and fork as
[Getting started with GitHub Issue Artifacts](../getting-started-with-artifacts/).
Check that stacked PRs are available for your repository.
This page defines the exercise structure, not an executable command sequence.

## Exercise outline

1. Read the bug report and investigation artifact.
2. Plan the fix as a sequence of dependent changes: the underlying service
   fix first, followed by the user-facing behavior that relies on it.
3. Put each change and its focused tests into a separate branch and PR.
   Base each PR on the branch immediately below it.
4. Review the stack in order and check that each diff contains only its
   own layer of work.
5. Make a change to a lower layer, update the dependent branches, and
   inspect the resulting reviews and security checks.

## What to check

Each PR tells one part of the same story. Tests and security checks cover
the changed behavior, and the stack links back to the original issue.

[Next: Create your first agentic workflow](../create-your-first-agentic-workflow/) ·
[Back to Section 1](../README.md)
