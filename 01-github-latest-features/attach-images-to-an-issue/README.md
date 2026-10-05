# Attach images to an issue

Use `--attach` to add a screenshot to an issue, straight from the terminal.

1. Go to this folder:

   ```bash
   cd 01-github-latest-features/attach-images-to-an-issue
   ```

2. Create an issue with the screenshot. The text after `#` is the image's alt text.

   ```bash
   gh issue create \
     --title "Menu prices show \$NaN" \
     --body "Playwright caught this:" \
     --attach 'menu-prices.png#Menu board showing $NaN'
   ```

3. Open the link that `gh` prints. The screenshot is in the issue.

`--attach` also works with `gh issue comment` and `gh pr create`.

[Next: Create a stacked PR](../create-a-stacked-pr/README.md) ·
[Back to Section 1](../README.md)
