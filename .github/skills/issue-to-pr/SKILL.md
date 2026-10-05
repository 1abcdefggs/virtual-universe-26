---
name: issue-to-pr
description: Read an open issue, propose a fix, and open a draft pull request for review. Use when asked to turn an issue into a suggested fix or pull request.
---

# Issue to PR

Turn one open issue into a suggested fix that a person reviews. These are the
same `gh` commands you ran by hand in Section 1.

1. Confirm the repository: `gh repo view --json nameWithOwner`
   - If it is `octodemo/virtual-universe-26`, say you are in the event repository
     and ask the user to confirm before you create an issue, a branch, or a pull request.
2. Pick the issue. Use the number you were given, or list open issues and ask:
   `gh issue list --state open`
3. Read the issue and the code it mentions: `gh issue view <n>`
4. Create a branch: `git switch -c fix/issue-<n>`
5. Make the smallest change that fixes the issue, and run the project's tests
   if it has any.
6. Commit, push, and open a draft pull request that closes the issue:
   `gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"`
7. Comment on the issue with what changed and how to test it, then switch back
   to the default branch.

## Rules

- Never merge, approve, or close anything. A person reviews the pull request.
- If the fix is unclear, comment on the issue with your questions instead of guessing.
- Stage only the files you changed for this issue.
