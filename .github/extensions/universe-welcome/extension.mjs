import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { joinSession, createCanvas } from "@github/copilot-sdk/extension";

const EXAMPLES = {
    skills:
        "I'm following the Skills guide in the Universe '26 welcome canvas: fork virtual-universe-26, edit .github/skills/issue-to-pr/SKILL.md, create a sample issue, and run /issue-to-pr on it. Check where I am (repository, branch, skill changes, open issues) and help me with the next step. Confirm the repository and the issue with me before you create an issue, a branch, or a pull request.",
    tools:
        "Help me with the Tools and Connectors guide: find the Context7 Expert agent in github/awesome-copilot, check its compatibility, and connect https://mcp.context7.com/mcp without an API key. Use current resolve-library-id and query-docs tools for a public Node.js documentation query, then add relevant documentation lookup to issue-to-pr. Keep this session. Ask before installing or changing configuration. Send no repository contents to the connector, and report missing tools or rate limits rather than substituting web search.",
    security:
        "I'm following the Security review guide in the Universe '26 welcome canvas: check out my issue-to-pr pull request, run /security-review, and add a review step to the issue-to-pr skill. Check where I am and help me with the next step. Explain any finding and ask before applying a fix.",
    automate:
        "Help me follow the Automate guide: open Automations, choose New Automation, select my verified fork of virtual-universe-26 as the project, enter /issue-to-pr, and choose the Manual trigger. Make sure that project has my updated skill. Guide me through the form; do not create or run an automation without my approval.",
};
const files = {
    "/": ["welcome.html", "text/html; charset=utf-8"],
    "/avatar.svg": ["avatar.svg", "image/svg+xml"],
    "/open-files.png": ["open-files.png", "image/png"],
    "/new-automation.png": ["new-automation.png", "image/png"],
    "/walkthroughs.js": ["walkthroughs.js", "text/javascript; charset=utf-8"],
};
const UPSTREAM = "octodemo/virtual-universe-26";
const servers = new Map();
let meCache = { at: 0, value: null };

function gh(args) {
    return new Promise((resolve) => {
        execFile("gh", args, { timeout: 15000 }, (err, stdout) => resolve(err ? null : stdout.trim()));
    });
}

// Finds the learner's GitHub login, their fork of the event repository, and its newest open issue and pull request.
// Runs only when the learner clicks "Fork and open". Creates the fork on GitHub (no local clone)
// and turns issues on, then waits until the fork is ready.
let forking = null;
function createFork() {
    forking ??= (async () => {
        let me = await whoAmI(true);
        if (!me.login) return { ...me, error: "Sign in to the GitHub CLI with gh auth login, then try again." };
        if (!me.fork) {
            await gh(["repo", "fork", UPSTREAM, "--clone=false", "--default-branch-only"]);
            for (let i = 0; i < 15 && !me.fork; i++) {
                await new Promise((r) => setTimeout(r, 2000));
                me = await whoAmI(true);
            }
            if (!me.fork) return { ...me, error: "GitHub didn't create the fork. Try Fork on GitHub instead." };
        }
        if (me.issues === false) {
            await gh(["repo", "edit", me.fork, "--enable-issues"]);
            me = await whoAmI(true);
        }
        return me;
    })().finally(() => { forking = null; });
    return forking;
}

async function whoAmI(force) {
    if (!force && meCache.value && Date.now() - meCache.at < 8000) return meCache.value;
    const login = await gh(["api", "user", "-q", ".login"]);
    let fork = null;
    if (login) {
        const forks = await gh(["api", `repos/${UPSTREAM}/forks?per_page=100`, "-q", `.[] | select(.owner.login == "${login}") | .full_name`]);
        fork = forks ? forks.split("\n")[0] : null;
        if (!fork) {
            const own = await gh(["api", `repos/${login}/virtual-universe-26`, "-q", "select(.fork) | .full_name"]);
            fork = own || null;
        }
    }
    let issues = null, issue = null, pr = null;
    if (fork) {
        issues = (await gh(["api", `repos/${fork}`, "-q", ".has_issues"])) === "true";
        const n = issues ? await gh(["issue", "list", "-R", fork, "--state", "open", "--limit", "1", "--json", "number", "-q", ".[0].number"]) : null;
        issue = n ? Number(n) : null;
        const p = await gh(["pr", "list", "-R", fork, "--state", "open", "--limit", "1", "--json", "number", "-q", ".[0].number"]);
        pr = p ? Number(p) : null;
    }
    const value = { login, upstream: UPSTREAM, fork, issues, issue, pr };
    meCache = { at: Date.now(), value };
    return value;
}
let session;

async function startServer() {
    const server = createServer(async (req, res) => {
        if (req.method === "POST" && req.url === "/open-skill") {
            res.setHeader("Content-Type", "application/json");
            try {
                await session.rpc.canvas.open({
                    canvasId: "editor",
                    instanceId: "universe-issue-to-pr-skill",
                    input: {
                        scope: "repo",
                        path: ".github/skills/issue-to-pr/SKILL.md",
                        title: "Issue to PR skill",
                    },
                });
                return res.end(JSON.stringify({ ok: true }));
            } catch (error) {
                console.error("Could not open the local skill file:", error);
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: "Could not open the skill. Try again, or use + > Files to open .github/skills/issue-to-pr/SKILL.md." }));
            }
        }
        if (req.method === "POST" && req.url === "/fork") {
            res.setHeader("Content-Type", "application/json");
            return res.end(JSON.stringify(await createFork()));
        }
        if (req.method === "POST" && req.url === "/try") {
            let body = "";
            for await (const chunk of req) body += chunk;
            let id;
            try {
                ({ id } = JSON.parse(body || "{}"));
            } catch {}
            if (!Object.hasOwn(EXAMPLES, id)) {
                res.statusCode = 400;
                return res.end();
            }
            await session.send({ prompt: EXAMPLES[id] });
            res.setHeader("Content-Type", "application/json");
            return res.end('{"ok":true}');
        }
        if (req.method === "GET" && req.url.startsWith("/me")) {
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Cache-Control", "no-store");
            return res.end(JSON.stringify(await whoAmI(req.url.includes("refresh"))));
        }
        const entry = files[req.url.split("?")[0]];
        if (!entry) {
            res.statusCode = 404;
            return res.end();
        }
        res.setHeader("Content-Type", entry[1]);
        res.end(await readFile(new URL(`./${entry[0]}`, import.meta.url)));
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

session = await joinSession({
    canvases: [
        createCanvas({
            id: "universe-welcome",
            displayName: "Universe '26 welcome",
            description: "Welcome screen for the Universe '26 Section 2 cookbook: introduces building an automation with skills, tools and connectors, security review, and triggers.",
            actions: [],
            open: async (ctx) => {
                let entry = servers.get(ctx.instanceId);
                if (!entry) {
                    entry = await startServer();
                    servers.set(ctx.instanceId, entry);
                }
                return { title: "Welcome to Universe '26", url: entry.url };
            },
            onClose: async (ctx) => {
                const entry = servers.get(ctx.instanceId);
                if (entry) {
                    servers.delete(ctx.instanceId);
                    await new Promise((resolve) => entry.server.close(() => resolve()));
                }
            },
        }),
    ],
});
