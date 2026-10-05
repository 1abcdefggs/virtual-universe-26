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

[Open a guided session in Copilot App](https://github.com/copilot/app/launch?open=ghapp%3A%2F%2Fsession%2Fnew%3Frepo%3Doctodemo%252Fvirtual-universe-26%26mode%3Dinteractive%26prompt%3DRead%252002-github-copilot-latest-features%252FREADME.md%2520and%2520follow%2520its%2520instructions%2520to%2520guide%2520me%2520through%2520the%2520Copilot%2520cookbook.) and confirm the new session. The kickoff prompt asks Copilot to read this page.

Alternatively, open this repository in the Copilot app, copy the instructions
below using the code block's copy button, and paste them into a new or existing
session for this repository. You need the app installed and access to this repository.

When the session starts, Copilot opens a welcome canvas that explains the
software factory you build in this section. Open each part (Skills, Tools,
Security review, and Automate) to see an example, then select **Try this example**
to run it in chat. The canvas comes from the repository
extension in [`.github/extensions/universe-welcome`](../.github/extensions/universe-welcome/),
which loads after you trust the repository folder.

Each part has a step-by-step guide in the canvas. Feature availability depends
on your account and organization settings.

## Instructions for Copilot

```text
Guide me through the Copilot cookbooks in octodemo/virtual-universe-26. First, open the universe-welcome canvas with instanceId universe-welcome so I see the welcome screen. If that canvas is unavailable, say the repository extension in .github/extensions/universe-welcome is not loaded and continue in chat. Then welcome me to Agentic Software Development in chat in two or three sentences: in Section 1 I manually created an issue and a stacked pull request with the GitHub CLI, and in this section I build a software factory, a set of agents that run that process on repeat while I review every change as a draft pull request. Present the four parts and tell me I can open each one on the welcome screen and select Try this example: 1. Skills (the issue-to-pr skill in .github/skills/issue-to-pr/SKILL.md turns an issue into a draft pull request); 2. Tools (/agentfinder finds an agent for CI/CD pipelines and GitHub Actions workflows); 3. Security review (the /security-review slash command checks the agent's changes); 4. Automate (turn the skill into a paused software factory with a worker, an assessment, and improvement). Ask which one I want to try. Do not change files or create resources yet. After I choose, read any related files, explain the goal, and check the prerequisites available in my app. Guide me one step at a time. Say clearly when a feature, fixture, or detailed step is unavailable; do not invent commands or claim an action succeeded. Work in my own fork of octodemo/virtual-universe-26 if I have one. If I am working in octodemo/virtual-universe-26 itself, say so and confirm with me before changing anything there. Before creating an issue, pull request, automation, factory, or recurring schedule, explain what it will access and change and obtain my confirmation. Keep initial work manual or paused. Do not enable recurring execution or publish repository changes without my approval. Use synthetic examples. Do not request secrets or assume access to private repositories, chat connectors, or email.
```

[Back to the cookbooks](../README.md)
