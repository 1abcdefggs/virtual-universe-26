# Section 2: Agentic Software Development with GitHub Copilot

In [Section 1](../01-github-latest-features/) you manually created an issue and a
stacked pull request with the GitHub CLI. In this section you'll learn some of the
steps required to build your own software factory.

> **Software factory:** A system of work where triggers, not humans, start agent
> sessions, so more work runs on its own and your time is saved for the decisions
> that need you.

Every software factory looks different. Here are some building blocks you can use:

- **Skills** can teach the agent a job, like turning an issue into a fix.
- **Tools** can give the agent more ways to do that job, like plugins, agents, or connectors.
- **Reviews** can check the agent's work, for example for security issues.
- **Triggers** can start the agent on their own, like a new issue, a schedule, or a failed CI run.
- **People** decide where they step in, such as approving a pull request before it merges.

In this section you build a small software factory in four parts:

1. **Skills:** Edit the [`issue-to-pr`](../.github/skills/issue-to-pr/SKILL.md) skill, which turns an issue into a draft pull request, then run it with `/issue-to-pr`.
2. **Tools:** Use `/agentfinder` to find an agent for CI/CD pipelines and GitHub Actions workflows, then install the `repo-actions-hub` plugin.
3. **Security review:** Run `/security-review` on the agent's pull request and add a review step to the skill.
4. **Automate:** Turn the skill into a paused software factory that runs when an issue is opened.

## Start here

[Open the welcome canvas in Copilot App](https://github.com/copilot/app/launch?open=ghapp%3A%2F%2Fsession%2Fnew%3Frepo%3Doctodemo%252Fvirtual-universe-26%26mode%3Dinteractive%26prompt%3DOpen%2520canvasId%2520universe-welcome%2520with%2520instanceId%2520universe-welcome%2520now%252C%2520before%2520reading%2520files%2520or%2520checking%2520prerequisites.%2520Once%2520open%252C%2520say%2520only%253A%2520%2522Welcome%2520to%2520Section%25202.%2520Read%2520the%2520canvas%2520and%2520use%2520its%2520Try%2520this%2520example%2520buttons%2520to%2520open%2520the%2520guides.%2520I%2520will%2520help%2520in%2520chat%2520when%2520you%2520ask.%2522%2520Then%2520stop.%2520Do%2520not%2520show%2520a%2520chat%2520menu%252C%2520list%2520the%2520four%2520parts%252C%2520or%2520ask%2520what%2520to%2520try.%2520Do%2520not%2520change%2520files%2520or%2520create%2520resources.%2520If%2520the%2520canvas%2520is%2520unavailable%252C%2520explain%2520that%2520the%2520repository%2520must%2520be%2520trusted%2520and%2520its%2520universe-welcome%2520extension%2520loaded%253B%2520do%2520not%2520start%2520a%2520chat%2520walkthrough.) and confirm the new session. The kickoff prompt asks Copilot to open the canvas directly, without reading this page first.

Alternatively, open this repository in the Copilot app, copy the instructions
below using the code block's copy button, and paste them into a new or existing
session for this repository. You need the app installed and access to this repository.

When the session starts, Copilot opens a welcome canvas that explains the
software factory you build in this section. Open each part (Skills, Tools,
Security review, and Automate) to see an example, then select **Try this example**
to open its step-by-step guide in the canvas. Use chat when you need help, rather
than choosing from a second menu. The canvas comes from the repository
extension in [`.github/extensions/universe-welcome`](../.github/extensions/universe-welcome/),
which loads after you trust the repository folder.

Each part has a step-by-step guide in the canvas. Feature availability depends
on your account and organization settings.

## Instructions for Copilot

```text
Open canvasId universe-welcome with instanceId universe-welcome now, before reading files or checking prerequisites. Once open, say only: "Welcome to Section 2. Read the canvas and use its Try this example buttons to open the guides. I will help in chat when you ask." Then stop. Do not show a chat menu, list the four parts, or ask what to try. Do not change files or create resources. If the canvas is unavailable, explain that the repository must be trusted and its universe-welcome extension loaded; do not start a chat walkthrough.
```

[Back to the cookbooks](../README.md)
