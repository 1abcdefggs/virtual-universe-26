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
      "By convention, each skill gets its own folder: <code>.github/skills/my-skill/</code>, with a Markdown file named <code>SKILL.md</code> inside it. Replace <code>my-skill</code> with a short name that says what the skill does, like <code>issue-to-pr</code>.",
      "A <code>SKILL.md</code> file has two parts:",
      { list: [
        "<b>The YAML frontmatter</b>, between the two <code>---</code> lines at the top. The <b>name</b> becomes the skill's slash command, and the <b>description</b> tells Copilot when to use it.",
        "<b>The body</b>, below the frontmatter. It lists the steps Copilot follows and the rules it must keep.",
      ] },
      "Here's what that looks like:",
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
      "To create a new skill, you need to add a <code>skills</code> folder in the <code>.github</code> folder of your repo. In this guide you will edit a skill that already exists. Click the <code>&lt;&gt;</code> symbol in the file tab of the <code>SKILL.md</code> file you opened above to edit the file.",
      "<b>Replace</b> the <code>gh pr create</code> line in step 6. You can delete step 6, click the <b>Copy</b> button and paste this in its place:",
      { k: "diff", label: ".github/skills/issue-to-pr/SKILL.md", text: ` 6. Commit only the files you changed for this issue, push the branch to the
    fork, and open a draft pull request that closes the issue:
-   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "Closes #<n>"\`
+   \`gh pr create --draft --title "Fix #<n>: <issue title>" --body "<body>"\`
+   Start the body with "Closes #<n>", then add a short summary and a
+   "How to test" section with the exact commands a reviewer can run.` },
      "This change makes every pull request explain how to test it.",
      { list: [
        "<b>Copy the prompt</b> below into this session's Copilot chat.",
        "Copilot will use your existing fork of the tutorial repo, or create one if you don't have it yet.",
      ] },
      { k: "chat", noOpen: true, text: `Save my edited issue-to-pr skill to my fork of octodemo/virtual-universe-26:
- Check GitHub access and help me sign in only if needed.
- Find my fork: list the forks of octodemo/virtual-universe-26 and use the one owned by my personal GitHub account, even if it has a different name. Only create a fork if I don't have one. Don't treat an existing fork as a blocker.
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
      "Run <code>/skills reload</code> first so Copilot picks up your edit.",
      "Then run the skill on your newest issue. <b>Type</b> <code>/issue-to-pr{issue}</code> in this session's Copilot chat. As you type, the skill pops up in the slash command list. If you leave off the number, Copilot lists your open issues and asks which one.",
    ]},
    { h: "Review the draft pull request", body: [
      "Open the pull request link Copilot shares in chat and check that it has a <b>How to test</b> section.",
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
  intro: "A connector gives Copilot access to tools and information it doesn't have built in.<br><br>APIs change, and Copilot's built-in knowledge may be out of date. Find a connector that looks up current documentation so your issue-to-pr skill can base its fixes on documented APIs and examples, with sources you can check.",
  steps: [
    { h: "Find the right tool with Agent Finder", body: [
      "Describe your problem and let Agent Finder suggest a tool. <b>Copy the prompt</b> into this session's Copilot chat:",
      { k: "chat", noOpen: true, text: `/agentfinder my coding agent uses outdated library APIs, find a tool that gives it current documentation` },
      "Agent Finder only searches; it doesn't install anything. The top result should be <b>Context7</b>, an MCP server that looks up current library documentation.",
    ]},
    { h: "Add the suggested connector", body: [
      { list: [
        "On the left of your screen in the Copilot app, <b>click Customize</b> at the top of the sidebar that shows your sessions.",
        "Use the search bar to <b>search for Context7</b>, the tool Agent Finder suggested. Select the server and <b>click Add server</b>.",
        "<b>Select the HTTP tab</b> and accept the default settings presented.",
        "<b>Return to this session's Universe welcome canvas tab</b> to continue.",
      ] },
    ]},
    { h: "Try a documentation lookup", body: [
      "<b>Copy the prompt</b> into this chat:",
      { k: "chat", noOpen: true, text: `Use the Context7 MCP connector to find how Node.js reads a UTF-8 file with node:fs/promises. Show a short example and its documentation source. If the connector isn't available in this session, tell me; don't substitute web search.` },
      "Look for a Context7 tool call and a linked Node.js source. The connector retrieves documentation; it doesn't certify that a PR is correct.",
    ]},
    { h: "Use it in your skill", body: [
      "<b>Ask Copilot</b> to update the skill by copying this prompt into chat, or <b>edit it yourself</b> using the instructions below.",
      { k: "chat", noOpen: true, text: `Update .github/skills/issue-to-pr/SKILL.md to use the Context7 connector when a fix needs library or API documentation. Send only public documentation queries, cite relevant sources in the draft PR, and report unavailable tools instead of pretending a lookup succeeded. Show me the edit; don't commit or push yet.` },
      "To edit it yourself, <a href=\"#/tools\" data-open-skill>open the skill.md file here</a> <span data-open-skill-status role=\"status\"></span> and click the <code>&lt;&gt;</code> symbol. Add this instruction before the step that makes the fix, then save:",
      { k: "file", label: "Add to .github/skills/issue-to-pr/SKILL.md", text: `When a fix needs library or API documentation, use the Context7 MCP
connector to look it up. Send only public documentation queries, not
repository contents. Cite relevant sources in the draft PR. If the
connector is unavailable, report it instead of claiming the lookup
succeeded.` },
    ]},
  ],
  done: "Your skill can now ask for current documentation. Next, review the draft PR for security issues.",
  next: "security",
},

security: {
  eyebrow: "SECURITY REVIEW · GUIDE",
  title: "Review the agent's work for security issues",
  time: "10 min",
  intro: "Copilot now has a built-in <code>/security-review</code> skill. The security review skill checks changed code and reports only vulnerabilities it is confident someone could exploit. In this guide you run it on the fix in the PR and make the review part of your skill.",
  steps: [
    { h: "Run the review on the fix in the PR", body: [
      "Review the pull request the skill opened earlier.",
      "<b>Copy the slash command</b> into this session's chat:",
      { k: "chat", noOpen: true, text: `/security-review Review the last PR created by the issue-to-pr skill in this chat. Use the chat history to identify it and review the fix in that PR, not unrelated local changes. If the PR is unclear, ask me which one.` },
      "The review shows findings in a table with the severity, file, lines, and confidence. No findings is a good result.",
    ]},
    { h: "Add the security review skill to your skill", body: [
      "<b>Copy the prompt</b> into this session's chat. Copilot adds the review step to your skill and commits the change:",
      { k: "chat", noOpen: true, text: `Update .github/skills/issue-to-pr/SKILL.md so it runs the built-in /security-review skill on its changes after making the fix and before committing and opening the pull request. Fix any HIGH or CRITICAL findings, and list any others in the pull request body. Renumber the following steps. Then commit only that file on the current branch with the message "Run security review in issue-to-pr".` },
      "Open the <a href=\"#/security\" data-open-skill>skill.md file</a> <span data-open-skill-status role=\"status\"></span> to check the new step.",
    ]},
    { h: "Run it on a new issue", body: [
      "<b>Copy and run</b> this command in this session's Copilot chat to create a new issue. The <code>!</code> prefix runs it as a Bash command.",
      { k: "chat", noOpen: true, text: `!gh issue create -R {fork} --title "Add a search command to universe-notes" \\
  --body "Add 'npm run search -- <word>' that prints highlights whose title or summary contains the word."` },
      "Then <b>type</b> <code>/issue-to-pr{issue}</code> in the chat to run your skill on it.",
      "Copilot now runs the security review skill on its own change before it opens the pull request.",
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
  done: "🎉 <b>Congratulations on completing this tutorial!</b><br><br>You built an <code>issue-to-pr</code> skill that turns an issue into a draft pull request. You connected Context7 so it uses current documentation, added the built-in <code>/security-review</code> skill so it checks its own work, and saved it as an automation you can run on demand.<br><br>For more resources, visit the <a href=\"https://github.com/octodemo/virtual-universe-26\" target=\"_blank\" rel=\"noopener\">Virtual Universe '26 repository</a>.",
},
};
