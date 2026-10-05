# Section 2: Agentic Software Development with GitHub Copilot

Choose an exercise to explore in the GitHub Copilot app:

1. [Create a Copilot Automation](create-a-copilot-automation/): Connect the dots across code and documentation to identify what needs updating.
2. [Get started with Copilot Dreaming](get-started-with-copilot-dreaming/): Explore how curated memories can carry useful context and preferences into future sessions.
3. [Build your first Software Factory](build-your-first-software-factory/): Create a repeatable code-review workflow with security checks and human-approved improvements.

## Start here

[Open a guided session in Copilot App](https://github.com/copilot/app/launch?open=ghapp%3A%2F%2Fsession%2Fnew%2Foctodemo%2Fvirtual-universe-26%3Fmode%3Dinteractive%26prompt%3DRead%252002-github-copilot-latest-features%252FREADME.md%2520and%2520follow%2520its%2520instructions%2520to%2520guide%2520me%2520through%2520the%2520Copilot%2520cookbook.%2520Do%2520not%2520change%2520files%2520until%2520I%2520choose%2520an%2520exercise.) and confirm the new session. The kickoff prompt asks Copilot to read this page.

Alternatively, open this repository in the Copilot app, copy the instructions
below using the code block's copy button, and paste them into a new or existing
session for this repository. You need the app installed and access to this repository.

When the session starts, Copilot opens a welcome canvas that explains
automations and lets you pick an exercise. The canvas comes from the repository
extension in [`.github/extensions/universe-welcome`](../.github/extensions/universe-welcome/),
which loads after you trust the repository folder.

These starter guides outline each exercise. Feature availability depends
on your account and organization settings.

## Instructions for Copilot

```text
Guide me through the Copilot cookbooks in octodemo/virtual-universe-26. First, open the universe-welcome canvas with instanceId universe-welcome so I see the welcome screen. If that canvas is unavailable, say the repository extension in .github/extensions/universe-welcome is not loaded and continue in chat. Then welcome me to Agentic Software Development in chat and explain in two or three sentences what we will learn: Copilot can move from one-off chat help to repeatable agent work; an automation is a saved agent task made of a trigger, a prompt, tools, and a result I review; and we will apply this to the Section 1 note-taker export pull request with a manual, read-only security review before adding schedules, event triggers, or a software factory. Read 02-github-copilot-latest-features/README.md for the exercise links. Present these three exercises and tell me I can also pick one from the welcome screen: Create a Copilot Automation; Get started with Copilot Dreaming; Build your first Software Factory. Ask which one I want to explore. Do not change files or create resources yet. After I choose, read the selected exercise's README, explain its goal, and check the prerequisites available in my app. Guide me one step at a time. These are initial outlines, not complete lab implementations. Say clearly when a feature, fixture, or detailed step is unavailable; do not invent commands or claim an action succeeded. Before creating an automation, factory, or recurring schedule, explain what it will access and change and obtain my confirmation. Keep initial work manual or paused. Do not enable recurring execution or publish repository changes without my approval. Use synthetic examples. Do not request secrets or assume access to private repositories, chat connectors, or email.
```

[Back to the cookbooks](../README.md)
