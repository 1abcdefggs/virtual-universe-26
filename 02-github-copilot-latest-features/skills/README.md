# Create and run your first skill

**Part 1 of 4 · 15 min · 5 steps**

A skill is a set of instructions, scripts, and resources that Copilot loads
when needed to perform a specialized task.

In this guide you'll edit the `issue-to-pr` skill and then run it with a slash
command.

In the commands below, replace `YOUR-USERNAME` with your GitHub username.

## 1. Understand how a skill is built

To create a skill, navigate to or create a `.github/skills/my-skill/` folder,
then create a Markdown file named `SKILL.md` inside it.

In the `SKILL.md` file, the **name** becomes its slash command. The
**description** tells Copilot when to use it. The body lists the steps and the
rules. Here's what it would look like:

```markdown
---
name: my-skill
description: What the skill does and when to use it.
---

# My skill
1. The first thing to do
2. The next thing to do

## Rules
- Something it must never do
```

For our `issue-to-pr` skill, the file path is
[`.github/skills/issue-to-pr/SKILL.md`](../../.github/skills/issue-to-pr/SKILL.md).
Open it in the Copilot app and take a closer look.

## 2. Edit the skill

To create a new skill, you add a `skills` folder in the `.github` folder of
your repo. In this guide you will edit a skill that already exists. Click the
`<>` symbol in the file tab to edit the file.

Make every pull request explain how to test it. **Replace** the
`gh pr create` line in step 6:

```diff
 6. Commit, push, and open a draft pull request that closes the issue:
-   `gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"`
+   `gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"`
+   Start the body with "Closes #<n>", then add a short summary and a
+   "How to test" section with the exact commands a reviewer can run.
```

- **Copy the prompt** below into your session's Copilot chat.
- Copilot will create your own fork of the tutorial repo.

```text
Save my edited issue-to-pr skill to a new fork of octodemo/virtual-universe-26:
- Check GitHub access and help me sign in only if needed.
- Create a fork under my personal GitHub account.
- Preserve my saved local edit to .github/skills/issue-to-pr/SKILL.md.
- Commit only that skill change and push it to my fork's default branch. Do not publish any other local changes or push to the event repository.
- Do not ask me to preview or confirm the destination before committing. Keep any required app permission prompts.
- Verify that the commit and edited file are on my fork.
- On success, reply only with a link to my fork and confirmation that the change was committed and pushed. If blocked, explain the problem instead of claiming success.
```

## 3. Create a sample issue

Give the skill something real to fix. This issue asks for a small feature in
the `universe-notes` sample app.

**Copy and run** the command below in your session's Copilot chat. The `!`
prefix lets you run Bash commands directly in chat.

```text
!gh issue create -R YOUR-USERNAME/virtual-universe-26 --title "Add a list command to universe-notes" \
  --body "Add an npm script so 'npm run list' prints each keynote highlight title from universe-notes/notes/keynote-highlights.json, grouped by topic."
```

The terminal will open to run the command. Note the issue number it prints.
You can click the issue link to preview it.

> [!NOTE]
> Forks start with issues turned off. If the command fails, turn them on with
> `gh repo edit YOUR-USERNAME/virtual-universe-26 --enable-issues`.

## 4. Run the skill with its slash command

Run the skill on your newest issue from a session in your fork. If you leave
off the number, Copilot lists your open issues and asks which one.

```text
/issue-to-pr <issue-number>
```

> [!NOTE]
> Already in a chat? Run `/skills reload` first so Copilot picks up your edit.

## 5. Review the draft pull request

Open the pull request and check that it has a **How to test** section. Then
try the commands it lists. You can find it at
`https://github.com/YOUR-USERNAME/virtual-universe-26/pulls`.

> [!NOTE]
> Leave the pull request open. You'll review it for security issues later in
> this section.

---

You edited a skill and ran it with a slash command. Next, give your agent more
tools.

[Next: Tools and connectors →](../tools-and-connectors/README.md)

[Back to Section 2](../README.md)
