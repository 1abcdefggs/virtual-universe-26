// Step-by-step guides opened by "Try this example" on the welcome canvas.
// Block types: string = paragraph (HTML), {k:"term"|"chat"|"file"|"diff", label?, text}, {note}, {table:[[q,a],...]},
// {fork:true} = the learner's fork status, {link:{href,text}} = a deep link button.
// Tokens filled from the learner's account: {login}, {fork}, {issue} (" 12" or ""), {pr}.
// Chat blocks get an "Open in Copilot app" button that starts a session in the learner's fork.
window.WALK = {
skills: {
  eyebrow: "SKILLS · GUIDE",
  title: "Create and run your first skill",
  time: "15 min",
  intro: "A skill is a Markdown file that teaches Copilot one job. In this guide you edit the <code>issue-to-pr</code> skill so every pull request explains how to test it, then run it with a slash command.",
  steps: [
    { h: "Open your fork in the Copilot app", body: [
      "Work in your own copy, so the agent never changes the event repository. Every link and command in these guides points at your fork.",
      { fork: true },
      "Open your fork as a project. The app clones it for you. Run the terminal commands in this guide in that project's terminal.",
    ]},
    { h: "Understand how a skill is built", body: [
      "A skill is a folder with a <code>SKILL.md</code> file in <code>.github/skills/</code>. The <b>name</b> becomes its slash command. The <b>description</b> tells Copilot when to use it. The body lists the steps and the rules.",
      { k: "file", label: ".github/skills/my-skill/SKILL.md", text: `---
name: my-skill
description: What the skill does and when to use it.
---

# My skill
1. The first thing to do
2. The next thing to do

## Rules
- Something it must never do` },
      "To create a new skill, you need to add a <code>skills</code> folder in the <code>.github</code> folder of your repo. In this guide you will edit a skill that already exists.",
    ]},
    { h: "Open the issue-to-pr skill", body: [
      "Click the <b>+</b> button at the top of this panel and select <b>Files</b>. Then browse to <code>.github/skills/issue-to-pr/SKILL.md</code> and open it.",
      { img: { src: "open-files.png", alt: "Click + above the panel, then choose Files." } },
      "The skill turns one issue into a draft pull request, using the same <code>gh</code> commands you ran in Section 1. It never merges anything.",
    ]},
    { h: "Edit the skill", body: [
      "Make every pull request explain how to test it. Replace the <code>gh pr create</code> line in step 6:",
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: ` 6. Commit, push, and open a draft pull request that closes the issue:
-   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"\`
+   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"\`
+   Start the body with "Closes #<n>", then add a short summary and a
+   "How to test" section with the exact commands a reviewer can run.` },
      "Save the file, then commit and push it so later runs use your version:",
      { k: "term", text: `git commit -am "Add how-to-test to issue-to-pr"
git push` },
    ]},
    { h: "Create a sample issue", body: [
      "Give the skill something real to fix. This issue asks for a small feature in the <code>universe-notes</code> sample app.",
      { k: "term", text: `gh issue create -R {fork} --title "Add a list command to universe-notes" \\
  --body "Add an npm script so 'npm run list' prints each keynote highlight title from universe-notes/notes/keynote-highlights.json, grouped by topic."` },
      "Note the issue number it prints.",
    ]},
    { h: "Run the skill with its slash command", body: [
      "Run the skill on your newest issue. <b>Open in Copilot app</b> starts a new session in your fork with the command filled in. If you leave off the number, Copilot lists your open issues and asks which one.",
      { k: "chat", text: `/issue-to-pr{issue}` },
      { note: "Already in a chat? Run <code>/skills reload</code> first so Copilot picks up your edit." },
      "Copilot confirms the repository first and stops if it is the event repository. It then creates a branch, makes the fix, and opens a draft pull request. Approve each step when it asks.",
    ]},
    { h: "Review the draft pull request", body: [
      "Open the pull request and check that it has a <b>How to test</b> section. Then try the commands it lists.",
      { link: { href: "ghapp://github.com/{fork}/pull/{pr}", text: "Open the pull request in Copilot app", needs: "pr" } },
      { link: { href: "https://github.com/{fork}/pulls", text: "View pull requests on GitHub" } },
      { note: "Leave the pull request open. You'll review it for security issues later in this section." },
    ]},
  ],
  done: "You edited a skill and ran it with a slash command. Next, give your agent more tools.",
  next: "tools",
},

tools: {
  eyebrow: "TOOLS · GUIDE",
  title: "Find and add a tool with Agent Finder",
  time: "15 min",
  intro: "Tools give your agent more abilities. Agent Finder searches GitHub for plugins, agents, and MCP servers. In this guide you find a CI/CD plugin, install it, add a workflow, and teach your skill to wait for checks.",
  steps: [
    { h: "Search with Agent Finder", body: [
      "In the Copilot app chat, describe the job you need help with:",
      { k: "chat", text: `/agentfinder find an agent that can help with CI/CD pipelines and GitHub Actions workflows` },
      "Copilot lists the matches with a relevance score. The score shows how well a result matches your search, not whether it is safe. Agent Finder never installs anything on its own.",
    ]},
    { h: "Check what you're installing", body: [
      "Pick <b>repo-actions-hub</b>. Before you install a plugin, read its <code>plugin.json</code> and the code it points to.",
      { k: "file", label: "plugins/repo-actions-hub/plugin.json", text: `{
  "name": "repo-actions-hub",
  "description": "Browse repository GitHub Actions workflows, inspect recent runs, and trigger manual workflow_dispatch runs from a Copilot canvas.",
  "version": "1.0.2",
  "author": { "name": "James Montemagno" },
  "extensions": {
    "com.github.awesome-copilot": {
      "extensions": ["./extensions/repo-actions-hub"]
    }
  }
}` },
      "The <code>extensions</code> entry is the code that runs. You can read it in <a href=\"https://github.com/github/awesome-copilot/tree/main/plugins/repo-actions-hub\" target=\"_blank\" rel=\"noopener\">github/awesome-copilot</a>.",
    ]},
    { h: "Install the plugin", body: [
      "Open the install form in the Copilot app and confirm:",
      { link: { href: "ghapp://plugins/install?source=repo-actions-hub%40awesome-copilot", text: "Install repo-actions-hub in Copilot app" } },
      "If the app says the marketplace is unknown, add it once and try again:",
      { link: { href: "ghapp://plugins/marketplace/add?source=github%2Fawesome-copilot", text: "Add the awesome-copilot marketplace" } },
      "The buttons below start new sessions, so they load the plugin.",
    ]},
    { h: "Add a workflow to check", body: [
      "Your fork has no workflows yet. Ask Copilot to add one:",
      { k: "chat", text: `Add a GitHub Actions workflow that checks universe-notes/notes/keynote-highlights.json is valid JSON on every pull request, and that I can also run by hand. Show me the file, then commit it to the default branch and push.` },
      "It should look similar to this:",
      { k: "file", label: ".github/workflows/check-notes.yml", text: `name: Check notes
on: [pull_request, workflow_dispatch]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: python3 -m json.tool universe-notes/notes/keynote-highlights.json > /dev/null` },
    ]},
    { h: "Run it from the plugin", body: [
      { k: "chat", text: `Open the Repo Actions Hub for this repository` },
      "Select <b>Check notes</b>, choose <b>Run workflow</b>, and watch the run finish.",
    ]},
    { h: "Teach your skill to wait for checks", body: [
      "Add a step after the pull request is opened, and renumber the last step:",
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: `    \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"\`
+7. Wait for the pull request checks and report the result:
+   \`gh pr checks --watch\`
+   If a check fails, read the log with \`gh run view --log-failed\`,
+   fix the problem, and push again.
-7. Comment on the issue with what changed and how to test it, then switch back
+8. Comment on the issue with what changed and how to test it, then switch back` },
      { k: "term", text: `git commit -am "Wait for checks in issue-to-pr"
git push` },
    ]},
    { h: "Run it on a new issue", body: [
      { k: "term", text: `gh issue create -R {fork} --title "Add a software factory highlight" \\
  --body "Add a highlight about building a software factory to universe-notes/notes/keynote-highlights.json, in the same format as the others."` },
      { k: "chat", text: `/issue-to-pr{issue}` },
      "This time Copilot waits for <b>Check notes</b> to pass before it reports back.",
    ]},
  ],
  done: "You found a tool, read it before installing it, and wired it into your skill. Next, add a security review.",
  next: "security",
},

security: {
  eyebrow: "SECURITY REVIEW · GUIDE",
  title: "Review the agent's work for security issues",
  time: "10 min",
  intro: "The security review agent checks changed code and reports only vulnerabilities it is confident someone could exploit. In this guide you run it on your fix, see what a finding looks like, and make the review part of your skill.",
  steps: [
    { h: "Run the review on your fix", body: [
      "Review the pull request the skill opened in the Skills guide. <b>Open in Copilot app</b> starts a session on that pull request's branch in your fork.",
      { k: "chat", text: `/security-review`, pr: true },
      "It reviews the changes on this branch and shows findings in a table with the severity, file, lines, and confidence. No findings is a good result.",
    ]},
    { h: "See what a finding looks like (optional)", body: [
      "In that session's terminal, add a file that passes user input to a shell command, and commit it locally. Don't push it.",
      { k: "file", label: "universe-notes/show-note.js", text: `import { execSync } from "node:child_process";

const file = process.argv[2];
console.log(execSync(\`cat \${file}\`).toString());` },
      { k: "term", text: `git add universe-notes/show-note.js
git commit -m "Try an unsafe change"` },
      "Then run the review again in the same chat:",
      { k: "chat", text: `/security-review`, noOpen: true },
      "Expect a high-severity command injection finding with the line and a suggested fix. Then remove the commit:",
      { k: "term", text: `git reset --hard HEAD~1` },
    ]},
    { h: "See how the review agent is defined", body: [
      "The security review agent is built into Copilot. It is a prompt and a set of tools, like a skill.",
      { k: "file", label: "security-review.agent.yaml (abridged)", text: `name: security-review
description: >
  Performs security-focused code review to identify
  high-confidence vulnerabilities in the diff.
prompt: |
  Identify HIGH-CONFIDENCE security vulnerabilities
  in the modified and added lines of code.
  1. MINIMIZE FALSE POSITIVES: only flag issues you
     are more than 80% confident are exploitable.
  2. FOCUS ON IMPACT: unauthorized access, data
     breaches, or system compromise.` },
    ]},
    { h: "Add the review to your skill", body: [
      "Switch back to the default branch, then add a review step before the pull request is opened. Renumber the steps after it.",
      { k: "term", text: `git switch main` },
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: ` 5. Make the smallest change that fixes the issue, and run the project's tests
    if it has any.
+6. Ask the security-review agent to review your changes. Fix any HIGH or
+   CRITICAL findings, and list the others in the pull request body.
-6. Commit, push, and open a draft pull request that closes the issue:
+7. Commit, push, and open a draft pull request that closes the issue:` },
      { k: "term", text: `git commit -am "Review security in issue-to-pr"
git push` },
    ]},
    { h: "Run it on a new issue", body: [
      { k: "term", text: `gh issue create -R {fork} --title "Add a search command to universe-notes" \\
  --body "Add 'npm run search -- <word>' that prints highlights whose title or summary contains the word."` },
      { k: "chat", text: `/issue-to-pr{issue}` },
      "Copilot now reviews its own change before it opens the pull request.",
    ]},
  ],
  done: "Your skill now checks its own work for security issues. Next, let a trigger start it for you.",
  next: "automate",
},

automate: {
  eyebrow: "AUTOMATE · GUIDE",
  title: "Turn your skill into a software factory",
  time: "15 min",
  intro: "So far you started every run yourself. A software factory starts the work for you when something happens, like a new issue. It also checks how the work is going and suggests improvements for you to approve.",
  preview: "Software factories are in preview in the GitHub Copilot app. Names and options may change.",
  steps: [
    { h: "Know the three parts", body: [
      { table: [
        ["Worker", "Does the job when a trigger fires. Here, it runs <code>issue-to-pr</code> when an issue is opened."],
        ["Assessment", "Collects evidence about the results on a schedule, like whether pull requests pass checks and get merged."],
        ["Improvement", "Uses the assessments to suggest changes to the prompt, triggers, or tools. You decide whether to apply them."],
      ]},
    ]},
    { h: "Push your skill", body: [
      "The factory runs from your fork on GitHub, so make sure your latest skill is pushed.",
      { k: "term", text: `git switch main
git status
git push` },
    ]},
    { h: "Start the factory creator", body: [
      "Start a session in your fork with the factory creator:",
      { k: "chat", text: `/factory-creator Turn the issue-to-pr skill into a software factory that runs when an issue is opened in my fork.` },
      "It asks one question at a time and writes the configuration for you.",
    ]},
    { h: "Answer its questions", body: [
      "These answers work well for this guide:",
      { table: [
        ["Which repository?", "<code>{fork}</code>"],
        ["What outcome do you want?", "Every new issue gets a reviewed draft pull request."],
        ["What should start it?", "When an issue is opened."],
        ["What can it change?", "Create branches and draft pull requests. Never merge or close anything."],
        ["How will you know it's working?", "A pull request is opened, checks pass, the security review is clean, and a person merges it."],
        ["How often should it assess?", "Weekly."],
      ]},
    ]},
    { h: "Create it paused", body: [
      "Copilot summarizes the configuration. It looks similar to this:",
      { k: "file", label: "factory configuration (abridged)", text: `{
  "worker": {
    "name": "issue-to-pr",
    "prompt": "Run /issue-to-pr on the new issue",
    "triggers": { "issues": { "types": ["opened"] } }
  },
  "assessment": { "name": "Weekly fix check", "interval": "weekly" },
  "improvement": { "name": "Suggest skill changes", "interval": "manual" }
}` },
      "When it asks <b>Ready to create the factory?</b>, choose <b>Just create it</b>. Nothing runs until you turn it on.",
    ]},
    { h: "Turn it on and open an issue", body: [
      "In the same chat where you created the factory, ask:",
      { k: "chat", text: `Turn on the worker for my factory`, noOpen: true },
      { k: "term", text: `gh issue create -R {fork} --title "Add a topic count to the universe-notes README" \\
  --body "Add a section to universe-notes/README.md that lists each topic in notes/keynote-highlights.json and how many highlights it has."` },
      "You don't start anything this time. Within a few minutes a new session starts on its own and opens a draft pull request for you to review.",
    ]},
    { h: "Check how it's doing", body: [
      { k: "chat", text: `Run the assessment for my factory now`, noOpen: true },
      { k: "chat", text: `Run improvement for my factory and show me what it suggests`, noOpen: true },
      "Improvement only suggests changes. You choose what to apply. When you're done, pause it:",
      { k: "chat", text: `Pause my factory`, noOpen: true },
    ]},
  ],
  done: "You built a software factory: a skill does the job, tools and a security review support it, a trigger starts it, and you make the final call.",
},
};
