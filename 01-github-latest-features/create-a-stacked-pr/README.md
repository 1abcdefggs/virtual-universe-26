# Create a stacked PR

Split one change into small pull requests that build on each other, so
reviewers see one layer at a time.

1. Go to this folder:

   ```bash
   cd "$(git rev-parse --show-toplevel)"
   cd 01-github-latest-features/create-a-stacked-pr
   ```

   Set the default repository for regular `gh` commands to your fork:

   ```bash
   gh repo set-default "$(git remote get-url origin)"
   gh repo set-default --view
   ```

   The output should name your fork, not `octodemo/virtual-universe-26`.
   If you haven't forked yet, complete [Getting started](../README.md#getting-started)
   first.

   `gh stack` can still prefer the `upstream` remote despite this setting.
   Step 4 uses `GH_REPO` to explicitly target your fork for pull requests.

2. Start a stack, then commit the first change:

   ```bash
   gh stack init menu/espresso
   echo '- Espresso: $3.00' > menu.md
   git add menu.md && git commit -m "Add espresso to the menu"
   ```

3. Add a second branch on top, then commit the next change:

   ```bash
   gh stack add menu/latte
   echo '- Latte: $4.50' >> menu.md
   git commit -am "Add latte to the menu"
   ```

4. Push both branches and open a draft pull request for each:

   ```bash
   GH_REPO="$(git remote get-url origin)" gh stack submit --auto --remote origin
   ```

   `GH_REPO` selects the repository for the pull requests; `--remote origin`
   selects where the branches are pushed. Both must point to your fork.

5. Open the links that `gh` prints. The latte pull request is based on the
   espresso branch, so it only shows the latte change.

If a previous submit pushed the branches but failed with "Head ref must be a
branch" or "No commits between", retry with the explicit repository override.
Setting `gh repo set-default` alone is not enough for affected `gh stack`
versions. You do not need to recreate the branches or commits:

```bash
GH_REPO="$(git remote get-url origin)" gh stack submit --auto --remote origin
```

[Back to Section 1](../README.md)
