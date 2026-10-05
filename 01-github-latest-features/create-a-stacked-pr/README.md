# Create a stacked PR

Split one change into small pull requests that build on each other, so
reviewers see one layer at a time.

1. Go to this folder:

   ```bash
   cd 01-github-latest-features/create-a-stacked-pr
   ```

2. Start a stack, then commit the first change:

   ```bash
   gh stack init menu/espresso
   echo "- Espresso: \$3.00" > menu.md
   git add menu.md && git commit -m "Add espresso to the menu"
   ```

3. Add a second branch on top, then commit the next change:

   ```bash
   gh stack add menu/latte
   echo "- Latte: \$4.50" >> menu.md
   git commit -am "Add latte to the menu"
   ```

4. Push both branches and open a draft pull request for each:

   ```bash
   gh stack submit --auto
   ```

5. Open the links that `gh` prints. The latte pull request is based on the
   espresso branch, so it only shows the latte change.

[Back to Section 1](../README.md)
