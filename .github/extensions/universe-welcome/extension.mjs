import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { joinSession, createCanvas } from "@github/copilot-sdk/extension";

const EXAMPLES = {
    skills:
        "I'm following the Skills guide in the Universe '26 welcome canvas: fork virtual-universe-26, edit .github/skills/issue-to-pr/SKILL.md, create a sample issue, and run /issue-to-pr on it. Check where I am (repository, branch, skill changes, open issues) and help me with the next step. Confirm the repository and the issue with me before you create an issue, a branch, or a pull request.",
    tools:
        "I'm following the Tools and connectors guide: discover and explicitly add Microsoft Learn's public MCP server, then use it for a public documentation query without an account or API key. Help with my current step. Ask before installing anything, do not send private data, and do not substitute web search for a connector tool call.",
    security:
        "I'm following the Security review guide in the Universe '26 welcome canvas: check out my issue-to-pr pull request, run /security-review, and add a review step to the issue-to-pr skill. Check where I am and help me with the next step. Explain any finding and ask before applying a fix.",
    automate:
        "I'm following the Automate guide in the Universe '26 welcome canvas: turn the issue-to-pr skill into a paused software factory that runs when an issue is opened in my fork. Check where I am and help me with the next step. Explain the worker, assessment, and improvement parts, and ask before creating or enabling anything.",
};
const files = {
    "/": ["welcome.html", "text/html; charset=utf-8"],
    "/mona.png": ["mona.png", "image/png"],
    "/open-files.png": ["open-files.png", "image/png"],
    "/walkthroughs.js": ["walkthroughs.js", "text/javascript; charset=utf-8"],
};
const UPSTREAM = "octodemo/virtual-universe-26";
const servers = new Map();
let meCache = { at: 0, value: null };

function command(program, args, { cwd } = {}) {
    return new Promise((resolve, reject) => {
        execFile(program, args, { cwd, timeout: 60000 }, (err, stdout, stderr) => {
            if (err) return reject(new Error(stderr?.trim() || err.message));
            resolve(stdout.trim());
        });
    });
}
const gh = (args) => command("gh", args);

async function workingContext() {
    const { workingDirectory: cwd, isRemote } = await session.rpc.metadata.snapshot();
    if (isRemote) throw new Error("Open this workshop in a local repository session to verify its working checkout.");
    const [origin, branch] = await Promise.all([
        command("git", ["remote", "get-url", "origin"], { cwd }),
        command("git", ["branch", "--show-current"], { cwd }),
    ]);
    const repo = JSON.parse(await command("gh", ["repo", "view", origin, "--json", "nameWithOwner,isFork,parent"], { cwd }));
    const parent = repo.parent ? `${repo.parent.owner.login}/${repo.parent.name}` : null;
    return { repo: repo.nameWithOwner, parent, branch: branch || "(detached HEAD)" };
}

// Only the learner's explicit fork button creates a fork or enables issues.
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
            if (!me.issues) return { ...me, error: "Could not confirm that issues are enabled in your fork. Check its settings and try again." };
        }
        return me;
    })().catch((error) => ({ error: error.message })).finally(() => { forking = null; });
    return forking;
}

async function whoAmI(force) {
    if (!force && meCache.value && Date.now() - meCache.at < 8000) return meCache.value;
    const [login, current] = await Promise.all([gh(["api", "user", "-q", ".login"]), workingContext()]);
    let fork = null;
    if (login) {
        if (current.parent?.toLowerCase() === UPSTREAM.toLowerCase() &&
            current.repo.split("/")[0].toLowerCase() === login.toLowerCase()) {
            fork = current.repo;
        } else {
            const forks = await gh(["api", "--paginate", `repos/${UPSTREAM}/forks?per_page=100`, "-q", `.[] | select(.owner.login == "${login}") | .full_name`]);
            fork = forks ? forks.split("\n")[0] : null;
        }
    }
    let issues = null;
    if (fork) {
        issues = (await gh(["api", `repos/${fork}`, "-q", ".has_issues"])) === "true";
    }
    const working = Boolean(fork && current.repo.toLowerCase() === fork.toLowerCase() &&
        current.parent?.toLowerCase() === UPSTREAM.toLowerCase());
    const value = { login, upstream: UPSTREAM, fork, issues, repo: current.repo, branch: current.branch, working };
    meCache = { at: Date.now(), value };
    return value;
}
let session;

async function startServer() {
    const server = createServer(async (req, res) => {
        try {
            if (req.method === "POST" && req.headers.origin !== `http://127.0.0.1:${server.address().port}`) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Use the buttons in the workshop canvas to send an action." }));
            }
            if (req.method === "POST" && req.url === "/fork") {
                const result = await createFork();
                res.writeHead(result.error ? 500 : 200, { "Content-Type": "application/json" });
                return res.end(JSON.stringify(result));
            }
            if (req.method === "POST" && req.url === "/try") {
                let body = "";
                for await (const chunk of req) {
                    body += chunk;
                    if (body.length > 16000) {
                        res.writeHead(413, { "Content-Type": "application/json" });
                        return res.end(JSON.stringify({ error: "The guide request is too large." }));
                    }
                }
                let request;
                try {
                    request = JSON.parse(body);
                } catch {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Invalid guide request." }));
                }
                if (!request || !Object.hasOwn(EXAMPLES, request.id) ||
                    (request.text !== undefined && (typeof request.text !== "string" || !request.text.trim() || request.text.length > 4000))) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Choose a valid guide action." }));
                }
                const me = await whoAmI(true);
                if (!me.working) {
                    res.writeHead(409, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: "Switch to your fork's working session before sending this step." }));
                }
                await session.send({ prompt: request.text || EXAMPLES[request.id] });
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
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: error.message }));
        }
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

session = await joinSession({
    canvases: [
        createCanvas({
            id: "universe-welcome",
            displayName: "Universe '26 welcome",
            description: "Welcome screen for the Universe '26 Section 2 cookbook: explains the software factory you build and opens a step-by-step guide for each part.",
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
