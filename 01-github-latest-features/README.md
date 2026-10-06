# Section 1: The Modern GitHub Experience

Try two new GitHub CLI features. Each tutorial takes about five minutes.

1. [Attach images to an issue](attach-images-to-an-issue/README.md): add a screenshot to an issue from the terminal.
2. [Create a stacked PR](create-a-stacked-pr/README.md): split one change into small pull requests that build on each other.

## Before you start

Work in your own fork, so the issues and pull requests you create are yours.
Open the terminal (<kbd>Ctrl</kbd>+<kbd>`</kbd>) and run:

```bash
unset GITHUB_TOKEN
gh auth login --web
gh auth setup-git
gh repo fork --remote
gh repo set-default "$(gh api user --jq .login)/virtual-universe-26"
gh repo edit --enable-issues
```

Use this same terminal for both tutorials.

## Manage your open source project

- **Set participation boundaries:** Define how people and agents can contribute to your project.
- **Manage your contribution queue:** Organize incoming pull requests and keep reviews focused on actionable work.
- **Control contribution volume:** Keep incoming PRs manageable for your team.

[Join the Maintainer Community](https://maintainers.github.com/) to request
an invitation and connect with other maintainers.

[Back to the cookbooks](../README.md)
