---
name: issue-to-pr
description: Read an open issue, propose a fix, and open a draft pull request for review. Use when asked to turn an issue into a suggested fix or pull request.
---

# Issue to PR

Turn one open issue into a suggested fix that a person reviews. These are the
same `gh` commands you ran by hand in Section 1.

1. Read `git remote get-url origin` and verify that repository with
   `gh repo view <origin-url> --json nameWithOwner,parent`. Target all subsequent
   `gh` commands explicitly at that verified fork with `GH_REPO=<owner/repo>`.
   - If it is `octodemo/virtual-universe-26` or not the learner's fork, stop and
     help them switch to their fork before creating an issue, branch, or PR.
2. Pick the issue. Use the number you were given, or list open issues and ask:
   `gh issue list --state open`
3. Read the issue and the code it mentions: `gh issue view <n>`
4. Create a branch: `git switch -c fix/issue-<n>`
5. Make the smallest change that fixes the issue, and run the project's tests
   if it has any.
6. Show the changes and obtain approval before committing, pushing, and opening
   a draft pull request that closes the issue. Preserve any learner skill edits
   and include them only with approval:
   `gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"`
7. Ask before commenting on the issue with what changed and how to test it.
   Report the exact issue, PR, and branch. Leave this PR branch checked out so
   the learner can review it in the same session; do not switch branches.

## Rules

- Never merge, approve, or close anything. A person reviews the pull request.
- If the fix is unclear, comment on the issue with your questions instead of guessing.
- Stage only the files you changed for this issue.
