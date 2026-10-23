# Attach a cheat sheet artifact

Finish the workshop by asking Copilot to make your own GitHub Universe cheat
sheet and file it on an issue. This exercise brings together two parts of the
workshop: the GitHub CLI `--attach` flag from Section 1 and Copilot skills from
Section 2.

You need your fork of this repository with issues enabled, and GitHub CLI
2.99.0 or later.

1. **Find the skill.** In the Copilot app, run:

   ```text
   /skills list
   ```

   Look for `universe-cheatsheet`. It's already in this repository at
   [`.github/skills/universe-cheatsheet/`](../../.github/skills/universe-cheatsheet/SKILL.md),
   so there's nothing to install.

2. **Run the skill.**

   ```text
   /universe-cheatsheet create an issue artifact with the cheat sheet
   ```

   Copilot will:
   - read the [recap](../github-universe-recap/) and [cheat sheet](../github-universe-cheat-sheet/) pages
   - design a one-page cheat sheet in the Universe theme and save it as an image
   - make a surprise card in the style of the [Badger](https://leereilly.net/badger.github.io/virtual/) site
   - create an issue and upload the cheat sheet, the card, and a magic egg
     picture with `gh issue create --attach`
   - open a session from that issue and use `/create-issue-artifact` to add
     both images as artifacts

3. **Open the issue link** that Copilot gives you. The description shows a
   magic egg and says:

   > ✨Read the **Badger easter egg card** to get the full Universe recap details.✨

   Open **Artifacts**. You'll find two: your cheat sheet image, and the Badger
   easter egg card with a surprise for you to find.

## How the artifact is added

An artifact's body is Markdown, so the images are uploaded first with
`gh issue create --attach`. The skill then removes the cheat sheet and card
from the issue body and links each one from its own artifact instead. Only
the magic egg stays in the description.

`/create-issue-artifact` adds artifacts to the issue that the current Copilot
app session was opened from. That's why the skill opens a new session from
your issue before it adds them. Artifacts can have the type `generic`, `file`,
`plan`, or `link`.

The skill doesn't change any files in your repository. It only creates one
issue, one issue session, and two artifacts.

[Back to Section 3](../README.md)
