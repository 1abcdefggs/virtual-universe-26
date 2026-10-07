# Section 2: Agentic Software Development with GitHub Copilot

Build on the GitHub CLI work from [Section 1](../01-github-latest-features/):
teach an agent a job, give it a public documentation connector, review its work,
and prepare a paused software factory.

> **Software factory:** A system where triggers can start agent work, while
> people choose its scope and review the results.

## Start reading in your current session

[Open in Copilot App](https://github.com/copilot/app/launch?open=ghapp%3A%2F%2Fsession%2Fnew%3Frepo%3Doctodemo%252Fvirtual-universe-26%26mode%3Dinteractive%26prompt%3DOpen%2520the%2520Universe%2520welcome%2520canvas.)
and confirm the new session. The visible prompt is simply:

```text
Open the Universe welcome canvas.
```

The app must initialize the session and load the trusted repository extension
before the canvas can open. The link still uses a model turn; it is not an
instant direct-canvas shortcut.

**Already in a session for this repository or your fork?** Stay there. Once the
extension has loaded, use **+ → Installed extensions → Universe '26 welcome**
above the panel to open the canvas without asking the model. If it is unavailable,
check repository trust and extension loading rather than creating more sessions.

Start with the existing skill in this checkout. Reading the guides, asking for
help, and trying the public documentation connector require no fork or account
check. **Send to this chat** stays in the current session. There are no fork
status cards, project-switch buttons, or repeated app-launch buttons.

At **Ready to make changes?**, ask Copilot to prepare a fork destination with
your approval. It reuses or creates your fork and can add a named push remote
while preserving this checkout, origin, and local work. It does not clone or
reopen the fork. Issues, PRs, and pushes must explicitly target the verified fork.
An older remote fork does not need to supply the guide: this checkout keeps it.

An already-open session needs the updated repository files and extension
reloaded to show this revised guide. Preserve local changes when updating.

## The core path

Allow about 25–30 minutes of guided activity, plus initial setup and agent runs.
Optional steps can be done later.

1. **Skills:** Edit the existing
   [`issue-to-pr`](../.github/skills/issue-to-pr/SKILL.md) skill to require a
   **How to test** section. Create one sample issue, run the skill on that exact
   issue, and keep the resulting draft PR branch checked out.
2. **Tools and connectors:** Discover integrations with `/agentfinder`. Review
   and add [Microsoft Learn's public MCP server](https://learn.microsoft.com/en-us/training/support/mcp),
   then use its tools to retrieve official documentation with source links.
   No new account, API key, or paid subscription is required. The connection
   sends a public documentation query, not repository content. CI/CD plugin
   exploration is optional.
3. **Security review:** Run `/security-review` on the identified draft PR in
   the same working session. Review any findings; no findings is also valid.
   No intentionally unsafe file or destructive cleanup is required.
4. **Automate:** Check the skill version on your fork's default branch and the
   app's project binding. A fork push remote does not change that binding. If
   the session still belongs to the event project, keep factory creation as a
   plan for later; do not auto-switch sessions. Only create against a verified
   fork project, after review, with the worker and assessment paused.

**Open the skill:** Use **Send to this chat** in the Skills guide to ask Copilot
to open `.github/skills/issue-to-pr/SKILL.md` in the editor and explain it.

The canvas is supplied by
[`.github/extensions/universe-welcome`](../.github/extensions/universe-welcome/).
Its startup behavior and workshop boundaries live in
[`.github/copilot-instructions.md`](../.github/copilot-instructions.md), not in
a long launch prompt. Installation, connector availability, and factories remain
subject to app version and organization policy; do not bypass restrictions.

[Back to the cookbooks](../README.md)
