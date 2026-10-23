# Give Copilot the right tools and context

**Part 2 of 4 · 10 min · 4 steps**

A custom agent gives Copilot a focused approach. A connector gives it access
to tools and information.

APIs change, and Copilot's built-in knowledge may be out of date. Use Context7
to look up current Node.js documentation so your `issue-to-pr` skill can base
its fixes on documented APIs and examples, with sources you can check.

## 1. Find a documentation agent with Agent Finder

**Copy the prompt** into your session's Copilot chat:

```text
/agentfinder find the Context7 Expert custom agent in github/awesome-copilot for looking up current library documentation
```

**Review the result**, then ask Copilot to add the agent:

```text
Add the Context7 Expert agent from github/awesome-copilot to this project. Check compatibility with this app and use the keyless Context7 connector with its current resolve-library-id and query-docs tools. Ask before installing or changing its configuration. Keep this session open.
```

Search results can vary. You can check the source of the
[Context7 Expert agent](https://github.com/github/awesome-copilot/blob/main/agents/context7.agent.md)
before adding it.

## 2. Add the Context7 connector

1. On the left of your screen in the Copilot app, **click Customize** at the
   top of the sidebar that shows your sessions.
2. Use the search bar to **search for Context7**, select the server, and
   **click Add server**.
3. **Select the HTTP tab** and accept the default settings presented.
4. Return to your session to continue.

## 3. Try a documentation lookup

**Copy the prompt** into your chat:

```text
Use the Context7 Expert agent and the Context7 MCP connector to find how Node.js reads a UTF-8 file with node:fs/promises. Show a short example and its documentation source. Send only this public documentation query, not repository contents. If the agent or connector isn't available in this session, tell me; don't substitute web search.
```

Look for a Context7 tool call and a linked Node.js source. The connector
retrieves documentation; it doesn't certify that a PR is correct.

## 4. Use it in your skill

**Ask Copilot** to update the skill by copying this prompt into chat, or
**edit it yourself** using the instructions below.

```text
Update .github/skills/issue-to-pr/SKILL.md to use the Context7 Expert agent and connector when a fix needs library or API documentation. Send only public documentation queries, cite relevant sources in the draft PR, and report unavailable tools instead of pretending a lookup succeeded. Show me the edit; don't commit or push yet.
```

To edit it yourself, open
[`.github/skills/issue-to-pr/SKILL.md`](../../.github/skills/issue-to-pr/SKILL.md)
and click the `<>` symbol. Add this instruction before the step that makes the
fix, then save:

```markdown
When a fix needs library or API documentation, use the Context7 Expert
agent and Context7 MCP connector to look it up. Send only public
documentation queries, not repository contents. Cite relevant sources
in the draft PR. If the agent or connector is unavailable, report it
instead of claiming the lookup succeeded.
```

> [!NOTE]
> Context7's remote endpoint was tested without an API key. Rate limits and app
> or organization policies may affect availability. A documentation lookup is
> not a substitute for tests or a security review.

---

Your skill can now ask for current documentation. Next, review the draft PR
for security issues.

[Next: Security review →](../security-review/README.md)

[← Previous: Skills](../skills/README.md) · [Back to Section 2](../README.md)
