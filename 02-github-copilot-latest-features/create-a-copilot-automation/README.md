# Create a Copilot Automation

Connect the dots across code and documentation to identify what needs updating.

## The example

A documentation check compares a small code change with the README or usage
guide that explains it, then produces a report of specific mismatches.

## Before you begin

Work entirely in the GitHub Copilot app. Choose a repository you can access
that contains both code and documentation. This cookbook repository's initial
pages alone are not a complete code-and-docs fixture.

## Start the conversation

> Help me design a manual documentation-check automation for a repository
> I choose. Compare its code and documentation, report mismatches with file
> references, and propose updates without editing files. Show me the scope
> and prompt before creating anything.

## Exercise outline

1. Select the repository and the code and documentation paths to compare.
2. Try the review interactively and inspect its evidence.
3. Turn the reviewed prompt into a manual automation after confirmation.
4. Run it once, then review the proposed documentation changes.
5. Discuss a schedule only after the manual result is useful.

If GitHub IQ is available, explore relevant development context
interactively. Do not assume that an automation inherits access to other
repositories or that cross-repository scheduling is supported.

## What to check

The report points to concrete source evidence, distinguishes uncertainty,
and does not publish changes or enable a schedule without approval.

[Back to Section 2](../README.md)
