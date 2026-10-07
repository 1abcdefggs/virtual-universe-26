// Guide navigation stays in the canvas; chat blocks run in its owning fork session.
window.WALK = {
skills: {
  eyebrow: "SKILLS · GUIDE",
  title: "Edit and run your first skill",
  time: "8–10 min",
  intro: "Teach Copilot how you want a job done. Edit one existing skill, then use it to turn a sample issue into a draft pull request. Keep this guide and the same working chat open.",
  steps: [
    { h: "Work in your fork once", body: [
      "Check the repository and branch shown below. If this is the event repository, switch to your fork once. After that, the guide buttons send work to this chat rather than opening new sessions.",
      "If you forked the repository earlier, first open your fork on GitHub and use <b>Sync fork → Update branch</b> to bring in this guide and its repository instructions. If GitHub reports conflicts, stop and ask for help; do not discard your own work.",
      { fork: true },
      "The fork button runs <code>gh repo fork octodemo/virtual-universe-26 --clone=false --default-branch-only</code> and enables issues. Reuse the fork from Section 1 if you have one.",
      { note: "Already in your fork? Stay here. To reopen this guide without a model turn, use the panel's <b>+ → Installed extensions → Universe '26 welcome</b> after the repository extension has loaded." },
    ]},
    { h: "Find the skill, including hidden folders", body: [
      "Select <b>+ → Files</b> above the panel. In Files, open the <b>gear menu → Show tracked hidden files</b>. Then expand <code>.github → skills → issue-to-pr → SKILL.md</code>.",
      { img: { src: "open-files.png", alt: "First open Files using +. Then use the Files gear menu to show tracked hidden files." } },
      "<code>.github</code> is a folder, not a file. It is hidden by default. If it still does not appear, check the repository shown above and ask Copilot to locate the exact path; do not create a duplicate skill.",
      { link: { href: "https://github.com/{fork}/blob/main/.github/skills/issue-to-pr/SKILL.md", text: "View the skill in your fork on GitHub" } },
      "The <code>name</code> in the file defines <code>/issue-to-pr</code>, the description explains when to use it, and the body describes its steps and boundaries.",
    ]},
    { h: "Make one useful edit", body: [
      "In the skill's draft-PR step, require a <b>How to test</b> section in the pull request body, alongside the issue-closing reference and summary. Save the file. You can edit it yourself or send this request:",
      { k: "chat", text: "Update .github/skills/issue-to-pr/SKILL.md so every draft PR body includes Closes #<n>, a short summary, and a How to test section with exact commands. Show me the diff. Do not commit or push until I approve." },
      "Keep the edit in this working session. Before running the skill, type <code>/skills reload</code> in chat so it picks up your change. If your build does not support that command, ask Copilot to reload skills rather than starting another session.",
    ]},
    { h: "Create one sample issue", body: [
      { k: "chat", text: "In my verified fork, propose an issue titled Add a list command to universe-notes. It should request an npm script so npm run list prints the titles from universe-notes/notes/keynote-highlights.json grouped by topic. Show the issue body and ask before creating it. Remember the exact issue number for this exercise." },
      "Approve the issue after reviewing it. Keep its number; do not substitute the newest issue in your account.",
    ]},
    { h: "Run the skill here", body: [
      "Use the exact issue number from the previous step. The button sends the slash command to this chat; if a number is needed, Copilot asks you to choose.",
      { k: "chat", text: "/issue-to-pr" },
      "Review the proposed changes and approve committing and pushing when ready. Copilot should preserve your skill edit and leave the draft PR branch checked out for the review exercise.",
    ]},
    { h: "Check the result", body: [
      "Open the exact draft PR linked in chat. Check its summary and <b>How to test</b> section, and run the listed commands. Leave the PR open and stay in this session.",
      { note: "Success: one skill edit, one identified issue, one draft PR with reproducible checks. No merge is required." },
    ]},
  ],
  done: "Your skill now explains how to test its work. Next, connect a public documentation source—no new account required.",
  next: "tools",
},
tools: {
  eyebrow: "TOOLS & CONNECTORS · GUIDE",
  title: "Connect public documentation",
  time: "5–7 min",
  intro: "A skill teaches a job; tools add abilities; a connector gives tools access to a service. Use Microsoft Learn's public MCP server to retrieve documentation without a new account, API key, or paid subscription.",
  steps: [
    { h: "Discover with Agent Finder", body: [
      { k: "chat", text: "/agentfinder Find an MCP server for Microsoft's public documentation that requires no account or API key. Do not install anything." },
      "Results vary. A relevance score measures the search match, not trust or safety. If Microsoft Learn is not listed, use the official reference below instead of choosing an unrelated result.",
      { link: { href: "https://learn.microsoft.com/en-us/training/support/mcp", text: "Read Microsoft's server documentation" } },
    ]},
    { h: "Review and add the connector", body: [
      "This is an <b>MCP connector</b>, added through the app's MCP server settings—not a plugin or a new service account. It reads public documentation; it does not need your repository content.",
      { k: "file", label: "Connection settings (not a repository file)", text: '{\n  "name": "microsoft-learn",\n  "type": "http",\n  "url": "https://learn.microsoft.com/api/mcp"\n}' },
      { link: { href: "ghapp://mcp/install?%7B%22name%22%3A%22microsoft-learn%22%2C%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Flearn.microsoft.com%2Fapi%2Fmcp%22%7D", text: "Review Microsoft Learn connection" } },
      "The button opens the add-server form. Review the URL and choose <b>Add server</b>. If it is already connected, reuse it. Never paste credentials into the URL.",
      { note: "If the link is unavailable in your build, open Customize → MCP and add the HTTP server using the settings above. Organization policy may restrict MCP servers; do not bypass it." },
    ]},
    { h: "Use the connector, not just install it", body: [
      { k: "chat", text: "Use the Microsoft Learn MCP connector to find the introductory training on prompt engineering with GitHub Copilot. Summarize two tips I can use when asking Copilot to fix an issue, and cite the source link. Send only this public query, not repository content. Show which connector tool you used. If its tools are not available in this session, explain how to refresh or restart with my approval; do not substitute a web search and call the exercise complete." },
      "Inspect the tool call and open a returned source link. You have connected an external knowledge source to the agent without signing in anywhere new.",
    ]},
    { h: "Make the distinction", body: [
      { table: [
        ["Skill", "Instructions for doing the job: issue-to-pr."],
        ["Connector", "Access to an external service: Microsoft Learn's public documentation."],
        ["Plugin", "A package that may add tools, skills, agents, or canvases."],
      ]},
      "An authenticated connector, such as a team chat integration, additionally needs your permission to access that account. This exercise deliberately avoids that requirement.",
      { note: "Success means a real connector tool call with relevant source links. If policy blocks installation, read the public docs to keep learning, but mark the connector exercise incomplete." },
    ]},
    { h: "Optional: explore CI/CD tools later", body: [
      "For a longer exercise, use <code>/agentfinder find an agent that can help with CI/CD pipelines and GitHub Actions workflows</code>. Review <code>repo-actions-hub</code> if it appears, and approve installation only after inspecting its source. This is separate from connecting Microsoft Learn and is not required to finish today's flow.",
    ]},
  ],
  done: "You used a no-account connector to bring public documentation into your chat. Next, review your draft PR.",
  next: "security",
},
security: {
  eyebrow: "SECURITY REVIEW · GUIDE",
  title: "Review your draft PR",
  time: "4–5 min",
  intro: "Stay in the working session from Skills. Review the exact PR you created, not whichever PR happens to be newest.",
  steps: [
    { h: "Confirm the review target", body: [
      { k: "chat", text: "Identify the exact draft PR and branch created in our Skills exercise. Confirm the fork, PR number, and current checkout before reviewing it. If the target is unclear, ask me. Do not switch branches over unsaved changes or choose the newest PR automatically." },
    ]},
    { h: "Run the built-in review", body: [
      { k: "chat", text: "/security-review" },
      "Review the findings and their file/line references. No findings is a valid result; do not add an intentionally unsafe file just to manufacture a finding. Choose whether to apply any suggested fixes.",
    ]},
    { h: "Improve your skill (optional)", body: [
      { k: "chat", text: "Propose an edit to issue-to-pr so it requests a security review before opening the draft PR and reports unresolved findings. Show the diff, preserve other work, and ask before committing or pushing." },
      "Leave the PR open for human review. There is no reset or cleanup command to run.",
    ]},
  ],
  done: "You reviewed the agent's work without losing the working session. Next, explore a paused factory.",
  next: "automate",
},
automate: {
  eyebrow: "AUTOMATE · GUIDE",
  title: "Prepare a paused software factory",
  time: "5–8 min",
  intro: "A factory can start work from an event instead of a chat message. Configure it in this same session and keep it paused while you review its scope.",
  preview: "Software factories are in preview. Availability and labels depend on your account and app version.",
  steps: [
    { h: "Understand the three parts", body: [
      { table: [
        ["Worker", "Runs the job, such as responding to an issue with a draft PR."],
        ["Assessment", "Collects evidence about outcomes."],
        ["Improvement", "Proposes changes for a person to approve."],
      ]},
    ]},
    { h: "Check the source before creating", body: [
      { k: "chat", text: "Check whether the issue-to-pr skill edits from this exercise are committed, pushed, and available on my fork's default branch. Do not merge or switch branches automatically. If the edits are only in our open PR, explain that the factory will not use them from the default branch yet; I can review and merge that PR myself or defer factory creation." },
      "A local edit or an unmerged PR is not automatically the version a cloud worker will run. Keep the factory exercise paused if its source is not ready.",
    ]},
    { h: "Create only after review", body: [
      { k: "chat", text: "/factory-creator Prepare an issue-to-pr factory for my verified fork. Trigger on new issues, create only branches and draft PRs, never merge, and require the actor to have write access. Explain the source branch and granted tools. Ask for confirmation before creating it and leave the worker and any scheduled assessment paused." },
      "Review the repository, permissions, source, and trigger. Choose the create-only option, not create-and-enable. Do not assume the local documentation connector is available to the cloud worker.",
    ]},
    { h: "Optional: try one run later", body: [
      "When the source is ready, explicitly approve enabling the worker and create one synthetic issue in your fork. Inspect its resulting session and draft PR, then pause the worker. Do not enable recurring assessments merely to finish this exercise.",
      { k: "chat", text: "Show the current enabled state of my workshop factory and ask before changing it. I want it paused when I finish." },
    ]},
  ],
  done: "You edited a skill, used a public connector, reviewed a draft PR, and explored automation with human approval.",
},
};
