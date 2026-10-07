# Universe workshop

## Opening the welcome canvas

When the user asks to open the Universe welcome canvas, open canvasId
`universe-welcome` with instanceId `universe-welcome`. Do this before reading
tutorial files or checking prerequisites. After a successful open, briefly
direct the user to read the canvas and use its guide buttons, then stop.
Do not list the parts, show a chat menu, ask what to try, or begin an exercise.
If the canvas is unavailable, explain that this repository must be trusted and
its extension loaded. Suggest the panel's + menu once the extension is available;
do not claim it opened or silently replace it with a chat walkthrough.

These startup rules apply only to opening the guide. Continue helping normally
when the user sends an exercise or asks a question.

## Working through the guides

- Keep work in the current session and keep the guide available. Create another
  session only when switching to the learner's fork or explicitly requested.
- Before changing files or creating resources, verify the current checkout,
  branch, and origin. Work in the learner's fork, not the event repository.
  Do not assume that discovering a fork means this checkout uses it.
- Target GitHub CLI commands explicitly at the verified fork. Do not infer the
  target from upstream remotes or the latest open issue or pull request.
- Ask which issue to use when its number is not supplied. Remember the exact
  issue and resulting pull request within this session. Verify them before acting.
- `.github` is a folder. To reveal the skill, use Files > gear menu >
  Show tracked hidden files, then `.github/skills/issue-to-pr/SKILL.md`.
- Explain and obtain approval before installing or connecting a tool, creating
  an issue or pull request, committing/pushing, or creating/enabling a factory.
  Keep initial factory creation paused. Never merge on the learner's behalf.
- Connector discovery is not installation or authorization. Use the learner's
  explicit choice; never install a search result automatically. The core Tools
  exercise uses the public Microsoft Learn MCP server at
  `https://learn.microsoft.com/api/mcp`, which needs no account or API key.
  Send only the public documentation query, not repository files or private data.
  If unavailable, explain the blocker; a web search is not a successful MCP test.
- Check connector tools in the current session after installation. If a restart
  is required, explain it and obtain consent; do not silently start a new session.
- Use synthetic examples. Do not request secrets, assume private-service access,
  discard unrelated changes, or use destructive cleanup commands.
