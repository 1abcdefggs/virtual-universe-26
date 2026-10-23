<p align="center">
  <img src="banner.svg" alt="Section 3 final exercise: Attach a cheat sheet artifact. One skill, one issue, two artifacts, and a surprise." width="100%">
</p>

**Final exercise · 5 min · 3 steps**

Finish the workshop by asking Copilot to make your own GitHub Universe cheat
sheet and file it on an issue. This brings together two things you've already
used: the GitHub CLI `--attach` flag from Section 1 and Copilot skills from
Section 2.

> [!NOTE]
> You need your fork of this repository with issues enabled, and GitHub CLI
> 2.99.0 or later. Check with `gh --version`.

## 1. Find the skill

In the Copilot app, run:

```text
/skills list
```

Look for `universe-cheatsheet`. It's already in this repository at
[`.github/skills/universe-cheatsheet/`](../../.github/skills/universe-cheatsheet/SKILL.md),
so there's nothing to install.

## 2. Run the skill

```text
/universe-cheatsheet create an issue artifact with the cheat sheet
```

Copilot will:

- 📖 Read the [recap](../github-universe-recap/) and [cheat sheet](../github-universe-cheat-sheet/) pages
- 🎨 Design a one-page cheat sheet in the Universe theme and save it as an image
- 🥚 Make a surprise card in the style of the [Badger](https://leereilly.net/badger.github.io/virtual/) site
- 📎 Create an issue and upload the cheat sheet, the card, and a magic egg picture with `gh issue create --attach`
- 🗂️ Open a session from that issue and use `/create-issue-artifact` to add the cheat sheet and card as artifacts

## 3. Open your issue

Open the issue link that Copilot gives you. The description shows a magic egg
and says:

> ✨Read the **Badger easter egg card** to get the full Universe recap details.✨

Open **Artifacts**. You'll find two: your cheat sheet image, and the Badger
easter egg card with a surprise for you to find.

## What you'll get

<table>
  <tr>
    <td width="70%" valign="top">
      <img src="cheatsheet-preview.png" alt="Example cheat sheet with The Modern GitHub Experience and Agentic Software Development with GitHub Copilot features">
      <p align="center"><b>Artifact 1</b> · Your cheat sheet</p>
    </td>
    <td width="30%" valign="middle" align="center">
      <img src="../../.github/skills/universe-cheatsheet/magic-egg.svg" alt="A sparkly magic egg" width="140">
      <p><b>Artifact 2</b> · The easter egg card<br><sub>No spoilers. Run the skill to see it.</sub></p>
    </td>
  </tr>
</table>

<details>
<summary><b>How the artifact is added</b></summary>
<br>

An artifact's body is Markdown, so the images are uploaded first with
`gh issue create --attach`. The skill then removes the cheat sheet and card
from the issue body and links each one from its own artifact instead. Only
the magic egg stays in the description.

`/create-issue-artifact` adds artifacts to the issue that the current Copilot
app session was opened from. That's why the skill opens a new session from
your issue before it adds them. Artifacts can have the type `generic`, `file`,
`plan`, or `link`.

</details>

> [!TIP]
> The skill doesn't change any files in your repository. It only creates one
> issue, one issue session, and two artifacts.

---

<p align="center">
  🎉 <b>That's the end of the workshop.</b> Thanks for building with us!<br><br>
  <a href="../README.md">← Back to Section 3</a> ·
  <a href="../github-universe-recap/">Universe recap</a> ·
  <a href="../github-universe-cheat-sheet/">Cheat sheet</a>
</p>
