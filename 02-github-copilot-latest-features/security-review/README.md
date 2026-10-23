# Review the agent's work for security issues

**Part 3 of 4 · 10 min · 3 steps**

The security review agent checks changed code and reports only vulnerabilities
it is confident someone could exploit. In this guide you run it on the fix in
the PR and make the review part of your skill.

In the commands below, replace `YOUR-USERNAME` with your GitHub username.

<details>
<summary>View example</summary>

```yaml
name: security-review
displayName: Security Review Agent
description: >
  Performs security-focused code review to identify
  high-confidence vulnerabilities in the diff.
tools:
  - "*"
prompt: |
  Identify HIGH-CONFIDENCE security vulnerabilities
  in the modified and added lines of code.
  1. MINIMIZE FALSE POSITIVES: only flag issues you
     are more than 80% confident are exploitable.
  2. FOCUS ON IMPACT: unauthorized access, data
     breaches, or system compromise.
  3. Skip style, performance, and theoretical issues.
```

</details>

## 1. Run the review on the fix in the PR

Review the pull request the skill opened in the
[Skills guide](../skills/README.md).

**Copy the slash command** into your session's chat:

```text
/security-review Review the last PR created by the issue-to-pr skill in this chat. Use the chat history to identify it and review the fix in that PR, not unrelated local changes. If the PR is unclear, ask me which one.
```

The review shows findings in a table with the severity, file, lines, and
confidence. No findings is a good result.

## 2. Add the review to your skill

Open
[`.github/skills/issue-to-pr/SKILL.md`](../../.github/skills/issue-to-pr/SKILL.md)
and **click `<>` to edit**. Add the review step shown below before the pull
request is opened, then renumber the following steps and save.

```diff
 5. Make the smallest change that fixes the issue, and run the project's tests
    if it has any.
+6. Ask the security-review agent to review your changes. Fix any HIGH or
+   CRITICAL findings, and list the others in the pull request body.
-6. Commit, push, and open a draft pull request that closes the issue:
+7. Commit, push, and open a draft pull request that closes the issue:
```

**Copy this command** into chat to commit only the skill file on your current
branch. The `!` prefix opens the terminal to run it. No branch switch is needed
to use the edited skill locally.

```text
!git add .github/skills/issue-to-pr/SKILL.md && git commit --only .github/skills/issue-to-pr/SKILL.md -m "Review security in issue-to-pr"
```

This commits the edit locally. Before publishing it, ask Copilot to verify the
fork remote and target branch rather than running a plain `git push`.

## 3. Run it on a new issue

Create another issue in your fork:

```bash
gh issue create -R YOUR-USERNAME/virtual-universe-26 --title "Add a search command to universe-notes" \
  --body "Add 'npm run search -- <word>' that prints highlights whose title or summary contains the word."
```

Then run the skill on it:

```text
/issue-to-pr <issue-number>
```

Copilot now reviews its own change before it opens the pull request.

---

Your skill now checks its own work for security issues. Next, let a trigger
start it for you.

[Next: Automate →](../automate/README.md)

[← Previous: Tools and connectors](../tools-and-connectors/README.md) · [Back to Section 2](../README.md)
