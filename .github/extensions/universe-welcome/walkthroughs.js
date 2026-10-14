// Step-by-step guides opened by "Try this example" on the welcome canvas.
// Block types: string = paragraph (HTML), {k:"term"|"chat"|"file"|"diff", label?, text}, {note}, {table:[[q,a],...]},
// {fork:true} = the learner's fork status, {link:{href,text}} = a deep link button, {list:[text]} = bullet points.
// Tokens filled from the learner's account: {login}, {fork}, {issue} (" 12" or ""), {pr}.
// Chat blocks get an "Open in Copilot app" button that starts a session in the learner's fork.
window.WALK = {
skills: {
  eyebrow: "SKILLS · GUIDE",
  title: "Create and run your first skill",
  time: "15 min",
  intro: "A skill is a set of instructions, scripts, and resources that Copilot loads when needed to perform a specialized task.<br><br>In this guide you'll edit the <code>issue-to-pr</code> skill and then run it with a slash command.",
  steps: [
    { h: "Understand how a skill is built", body: [
      "To create a skill, navigate to or create a <code>.github/skills/my-skill/</code> folder, then create a Markdown file named <code>SKILL.md</code> inside it.",
      "In the <code>SKILL.md</code> file, the <b>name</b> becomes its slash command. The <b>description</b> tells Copilot when to use it. The body lists the steps and the rules. Here's what it would look like.",
      { k: "file", label: ".github/skills/my-skill/SKILL.md", text: `---
name: my-skill
description: What the skill does and when to use it.
---

# My skill
1. The first thing to do
2. The next thing to do

## Rules
- Something it must never do` },
      { openSkill: true },
    ]},
    { h: "Edit the skill", body: [
      "To create a new skill, you need to add a <code>skills</code> folder in the <code>.github</code> folder of your repo. In this guide you will edit a skill that already exists. Click the <code>&lt;&gt;</code> symbol in the file tab to edit the file.",
      "Make every pull request explain how to test it. <b>Replace</b> the <code>gh pr create</code> line in step 6:",
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: ` 6. Commit, push, and open a draft pull request that closes the issue:
-   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"\`
+   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"\`
+   Start the body with "Closes #<n>", then add a short summary and a
+   "How to test" section with the exact commands a reviewer can run.` },
      { list: [
        "<b>Copy the prompt</b> below into this session's Copilot chat.",
        "Copilot will create your own fork of the tutorial repo.",
      ] },
      { k: "chat", noOpen: true, text: `Save my edited issue-to-pr skill to a new fork of octodemo/virtual-universe-26:
- Check GitHub access and help me sign in only if needed.
- Create a fork under my personal GitHub account.
- Preserve my saved local edit to .github/skills/issue-to-pr/SKILL.md.
- Commit only that skill change and push it to my fork's default branch. Do not publish any other local changes or push to the event repository.
- Do not ask me to preview or confirm the destination before committing. Keep any required app permission prompts.
- Verify that the commit and edited file are on my fork.
- On success, reply only with a link to my fork and confirmation that the change was committed and pushed. If blocked, explain the problem instead of claiming success.` },
    ]},
    { h: "Create a sample issue", body: [
      "Give the skill something real to fix. This issue asks for a small feature in the <code>universe-notes</code> sample app.",
      "<b>Copy and run</b> the command below in this session's Copilot chat. The <code>!</code> prefix lets you run Bash commands directly in chat.",
      { k: "chat", noOpen: true, text: `!gh issue create -R {fork} --title "Add a list command to universe-notes" \\
  --body "Add an npm script so 'npm run list' prints each keynote highlight title from universe-notes/notes/keynote-highlights.json, grouped by topic."` },
      "The terminal will open to run the command. Note the issue number it prints. You can <b>click the issue link</b> to preview it, then <b>return to the Universe welcome canvas tab</b> to continue.",
    ]},
    { h: "Run the skill with its slash command", body: [
      "Run the skill on your newest issue. <b>Open in Copilot app</b> starts a new session in your fork with the command filled in. If you leave off the number, Copilot lists your open issues and asks which one.",
      { k: "chat", text: `/issue-to-pr{issue}` },
      { note: "Already in a chat? Run <code>/skills reload</code> first so Copilot picks up your edit." },
    ]},
    { h: "Review the draft pull request", body: [
      "Open the pull request and check that it has a <b>How to test</b> section. Then try the commands it lists.",
      { link: { href: "ghapp://github.com/{fork}/pull/{pr}", text: "Open the pull request in Copilot app", needs: "pr", plain: true } },
      { link: { href: "https://github.com/{fork}/pulls", text: "View pull requests on GitHub", plain: true } },
      { note: "Leave the pull request open. You'll review it for security issues later in this section." },
    ]},
  ],
  done: "You edited a skill and ran it with a slash command. Next, give your agent more tools.",
  next: "tools",
},

tools: {
  eyebrow: "TOOLS · GUIDE",
  title: "Give Copilot the right tools and context",
  time: "10 min",
  intro: "A custom agent gives Copilot a focused approach. A connector gives it access to tools and information.<br><br>APIs change, and Copilot's built-in knowledge may be out of date. Use Context7 to look up current Node.js documentation so your issue-to-pr skill can base its fixes on documented APIs and examples, with sources you can check.",
  steps: [
    { h: "Find a documentation agent with Agent Finder", body: [
      "<b>Copy the prompt</b> into this session's Copilot chat:",
      { k: "chat", noOpen: true, text: `/agentfinder find the Context7 Expert custom agent in github/awesome-copilot for looking up current library documentation` },
      "<b>Review the result</b>, then ask Copilot to add the agent.",
      { k: "chat", noOpen: true, text: `Add the Context7 Expert agent from github/awesome-copilot to this project. Check compatibility with this app and use the keyless Context7 connector with its current resolve-library-id and query-docs tools. Ask before installing or changing its configuration. Keep this session open.` },
    ]},
    { h: "Add the Context7 connector", body: [
      { list: [
        "On the left of your screen in the Copilot app, <b>click Customize</b> at the top of the sidebar that shows your sessions.",
        "Use the search bar to <b>search for Context7</b>, select the server, and <b>click Add server</b>.",
        "<b>Select the HTTP tab</b> and accept the default settings presented.",
        "<b>Return to this session's Universe welcome canvas tab</b> to continue.",
      ] },
    ]},
    { h: "Try a documentation lookup", body: [
      "<b>Copy the prompt</b> into this chat:",
      { k: "chat", noOpen: true, text: `Use the Context7 Expert agent and the Context7 MCP connector to find how Node.js reads a UTF-8 file with node:fs/promises. Show a short example and its documentation source. Send only this public documentation query, not repository contents. If the agent or connector isn't available in this session, tell me; don't substitute web search.` },
      "Look for a Context7 tool call and a linked Node.js source. The connector retrieves documentation; it doesn't certify that a PR is correct.",
    ]},
    { h: "Use it in your skill", body: [
      "<b>Ask Copilot</b> to update the skill by copying this prompt into chat, or <b>edit it yourself</b> using the instructions below.",
      { k: "chat", noOpen: true, text: `Update .github/skills/issue-to-pr/SKILL.md to use the Context7 Expert agent and connector when a fix needs library or API documentation. Send only public documentation queries, cite relevant sources in the draft PR, and report unavailable tools instead of pretending a lookup succeeded. Show me the edit; don't commit or push yet.` },
      "To edit it yourself, <a href=\"#/tools\" data-open-skill>open the skill.md file here</a> <span data-open-skill-status role=\"status\"></span> and click the <code>&lt;&gt;</code> symbol. Add this instruction before the step that makes the fix, then save:",
      { k: "file", label: "Add to .github/skills/issue-to-pr/SKILL.md", text: `When a fix needs library or API documentation, use the Context7 Expert
agent and Context7 MCP connector to look it up. Send only public
documentation queries, not repository contents. Cite relevant sources
in the draft PR. If the agent or connector is unavailable, report it
instead of claiming the lookup succeeded.` },
    ]},
  ],
  done: "Your skill can now ask for current documentation. Next, review the draft PR for security issues.",
  next: "security",
},

security: {
  eyebrow: "SECURITY REVIEW · GUIDE",
  title: "Review the agent's work for security issues",
  time: "10 min",
  intro: "The security review agent checks changed code and reports only vulnerabilities it is confident someone could exploit. In this guide you run it on the fix in the PR and make the review part of your skill.",
  steps: [
    { h: "Run the review on the fix in the PR", body: [
      "Review the pull request the skill opened earlier.",
      "<b>Copy the slash command</b> into this session's chat:",
      { k: "chat", noOpen: true, text: `/security-review Review the last PR created by the issue-to-pr skill in this chat. Use the chat history to identify it and review the fix in that PR, not unrelated local changes. If the PR is unclear, ask me which one.` },
      "The review shows findings in a table with the severity, file, lines, and confidence. No findings is a good result.",
    ]},
    { h: "Add the review to your skill", body: [
      "<a href=\"#/security\" data-open-skill>Open the skill.md file here</a> <span data-open-skill-status role=\"status\"></span> and <b>click &lt;&gt; to edit</b>. Add the review step shown below before the pull request is opened, then renumber the following steps and save.",
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: ` 5. Make the smallest change that fixes the issue, and run the project's tests
    if it has any.
+6. Ask the security-review agent to review your changes. Fix any HIGH or
+   CRITICAL findings, and list the others in the pull request body.
-6. Commit, push, and open a draft pull request that closes the issue:
+7. Commit, push, and open a draft pull request that closes the issue:` },
      "<b>Copy this command</b> into chat to commit only the skill file on your current branch. The <code>!</code> prefix opens the terminal to run it. No branch switch is needed to use the edited skill locally.",
      { k: "chat", noOpen: true, text: `!git add .github/skills/issue-to-pr/SKILL.md && git commit --only .github/skills/issue-to-pr/SKILL.md -m "Review security in issue-to-pr"` },
      "This commits the edit locally. Before publishing it, ask Copilot to verify the fork remote and target branch rather than running a plain <code>git push</code>.",
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
  title: "Turn your skill into an Automation",
  time: "5 min",
  intro: "Save your skill as an automation so you can run it again without rewriting the prompt. You can schedule it for a certain time, but for this tutorial you'll trigger it manually.",
  steps: [
    { h: "Create an automation", body: [
      "<b>Open Automations</b> in the app sidebar and <b>click New Automation</b>.",
      "Give it a name, such as <code>Issue to PR</code>. Under <b>Trigger</b>, choose <b>Manual</b>. You can choose a scheduled time later.",
    ]},
    { h: "Select your project and skill", body: [
      "<b>Click the project selector</b> below the prompt box, marked by the green arrow, and select <b>your fork of virtual-universe-26</b>, not <code>octodemo/virtual-universe-26</code>.",
      { img: { src: "new-automation.png", alt: "New automation form. The green arrow points to the project selector below the prompt box.", projectArrow: true } },
      "The screenshot shows the event repository and a Daily trigger. For this tutorial, use <b>your fork</b> and <b>Manual</b> instead.",
      "<b>Type <code>/issue-to-pr</code></b> in the prompt box and select the skill suggestion. Make sure the selected project has your updated skill.",
      "<b>Copy this text</b> after the skill in the automation's prompt box:",
      { k: "chat", label: "Automation prompt", noOpen: true, text: `Find the oldest open issue in this fork that has no linked pull request and use this skill to propose a fix. Notify me when the PR is ready to be reviewed to be merged.` },
    ]},
    { h: "Save and run when ready", body: [
      "<b>Click Create</b> to save the automation. With a Manual trigger, it won't run until you start it.",
      "When you're ready, <b>click the play button</b> on the automation. Follow its run and review the draft PR it produces; nothing should merge without your review.",
    ]},
  ],
  done: "You've turned your skill into an automation you can run on demand. Later, you can give it a schedule.",
},
};
