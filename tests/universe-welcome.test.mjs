import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import vm from "node:vm";
import test from "node:test";

const root = new URL("../", import.meta.url);
const extensionURL = new URL(".github/extensions/universe-welcome/extension.mjs", root);
const source = await readFile(extensionURL, "utf8");
const guide = await readFile(new URL(".github/extensions/universe-welcome/walkthroughs.js", root), "utf8");
const html = await readFile(new URL(".github/extensions/universe-welcome/welcome.html", root), "utf8");

async function harness(overrides = {}) {
    const state = {
        repo: "learner/virtual-universe-26", parent: "octodemo/virtual-universe-26",
        fork: true, issues: true, branch: "workshop-fix", sent: [], calls: [], ...overrides,
    };
    let registration;
    const session = {
        rpc: { metadata: { snapshot: async () => ({ workingDirectory: "/workshop", isRemote: false }) } },
        send: async ({ prompt }) => {
            if (state.sendError) throw new Error("Chat is unavailable");
            state.sent.push(prompt);
        },
    };
    function execFile(program, args, options, callback) {
        state.calls.push({ program, args, options });
        if (state.fail?.(program, args)) return callback(new Error("Command failed"), "", "Command failed");
        let result;
        if (program === "git") {
            assert.equal(options.cwd, "/workshop");
            result = args[0] === "remote" ? `https://github.com/${state.repo}.git` : state.branch;
        } else if (args[0] === "repo" && args[1] === "view") {
            assert.equal(options.cwd, "/workshop");
            const [owner, name] = state.parent.split("/");
            result = JSON.stringify({ nameWithOwner: state.repo, isFork: state.fork,
                parent: state.parent ? { owner: { login: owner }, name } : null });
        } else if (args[0] === "repo" && args[1] === "fork") {
            state.fork = true;
            result = "";
        } else if (args[0] === "repo" && args[1] === "edit") {
            state.issues = true;
            result = "";
        } else if (args[1] === "user") {
            result = "learner";
        } else if (args.includes("--paginate")) {
            result = state.fork ? "learner/virtual-universe-26" : "";
        } else if (args.at(-1) === ".has_issues") {
            result = String(state.issues);
        } else {
            throw new Error(`Unexpected command: ${program} ${args.join(" ")}`);
        }
        callback(null, result, "");
    }
    const script = source.replace(/^import .*;\n/gm, "").replaceAll("import.meta.url", JSON.stringify(extensionURL.href));
    const api = await vm.runInNewContext(`(async()=>{${script}; return {whoAmI, workingContext};})()`, {
        createServer, readFile, execFile, URL, setTimeout: (fn) => setTimeout(fn, 0),
        joinSession: async (options) => { registration = options; return session; },
        createCanvas: (options) => options,
    });
    return { state, api, canvas: registration.canvases[0] };
}

test("repository identity uses session cwd and the actual gh parent shape", async () => {
    const { api, state } = await harness();
    const me = await api.whoAmI(true);
    assert.equal(me.working, true);
    assert.equal(me.branch, "workshop-fix");
    assert.equal(me.repo, "learner/virtual-universe-26");
    assert.equal("issue" in me || "pr" in me, false);
    assert.equal(state.calls.some(({ args }) => args[0] === "issue" || args[0] === "pr"), false);
});

test("finding a fork does not authorize the event checkout or an unrelated parent", async () => {
    for (const overrides of [
        { repo: "octodemo/virtual-universe-26", parent: "" },
        { parent: "another/source" },
    ]) {
        const { api } = await harness(overrides);
        assert.equal((await api.whoAmI(true)).working, false);
    }
});

test("HTTP actions validate origin, fresh checkout, payload, and send outcome", async () => {
    const { canvas, state } = await harness();
    const { url } = await canvas.open({ instanceId: "test" });
    const post = (body, origin = new URL(url).origin) => fetch(`${url}try`, {
        method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    try {
        assert.equal((await post({ id: "skills", text: "/issue-to-pr" }, "https://unrelated.example")).status, 403);
        assert.equal((await post(null)).status, 400);
        assert.equal((await post({ id: "missing" })).status, 400);
        assert.equal((await post({ id: "skills", text: 42 })).status, 400);
        assert.equal((await post({ id: "skills", text: "x".repeat(17000) })).status, 413);
        let response = await post({ id: "skills", text: "/issue-to-pr" });
        assert.equal(response.status, 200);
        assert.deepEqual(state.sent, ["/issue-to-pr"]);
        state.repo = "octodemo/virtual-universe-26";
        state.parent = "";
        assert.equal((await post({ id: "tools" })).status, 409);
        assert.equal(state.sent.length, 1);
        state.repo = "learner/virtual-universe-26";
        state.parent = "octodemo/virtual-universe-26";
        state.sendError = true;
        response = await post({ id: "tools" });
        assert.equal(response.status, 500);
        assert.match((await response.json()).error, /Chat is unavailable/);
    } finally {
        await canvas.onClose({ instanceId: "test" });
    }
});

test("explicit fork action reuses or creates the fork and reports errors", async () => {
    for (const fork of [true, false]) {
        const { canvas, state } = await harness({ repo: "octodemo/virtual-universe-26", parent: "", fork, issues: false });
        const { url } = await canvas.open({ instanceId: "fork" });
        try {
            const response = await fetch(`${url}fork`, { method: "POST", headers: { Origin: new URL(url).origin } });
            const result = await response.json();
            assert.equal(result.fork, "learner/virtual-universe-26");
            assert.equal(result.issues, true);
            assert.equal(state.calls.filter(({ args }) => args[0] === "repo" && args[1] === "fork").length, fork ? 0 : 1);
        } finally {
            await canvas.onClose({ instanceId: "fork" });
        }
    }
    const { api } = await harness({ fail: () => true });
    await assert.rejects(api.whoAmI(true), /Command failed/);
});

test("guides use explicit same-chat actions and a reviewable no-account MCP config", () => {
    const context = { window: {} };
    vm.runInNewContext(guide, context);
    assert.equal(Object.keys(context.window.WALK).length, 4);
    const blocks = Object.values(context.window.WALK).flatMap((part) => part.steps.flatMap((step) => step.body));
    const install = blocks.find((block) => typeof block !== "string" && block.link?.href.startsWith("ghapp://mcp/install?"));
    const config = JSON.parse(decodeURIComponent(install.link.href.split("?")[1]));
    assert.deepEqual(config, { name: "microsoft-learn", type: "http", url: "https://learn.microsoft.com/api/mcp" });
    assert.equal(blocks.some((block) => block.k === "chat" && block.text === "/issue-to-pr"), true);
    assert.doesNotMatch(guide, /git reset --hard|\{issue\}|\{pr\}/);
    assert.match(guide, /Show tracked hidden files/);
    assert.match(html, /Send to this chat/);
    assert.doesNotMatch(html, />Open in Copilot app</);
    for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
});

test("both README launch links contain only the short canvas request", async () => {
    for (const path of ["README.md", "02-github-copilot-latest-features/README.md"]) {
        const text = await readFile(new URL(path, root), "utf8");
        const link = text.match(/https:\/\/github\.com\/copilot\/app\/launch\?open=[^\s)]+/)[0];
        const target = new URL(new URL(link).searchParams.get("open"));
        assert.equal(target.searchParams.get("repo"), "octodemo/virtual-universe-26");
        assert.equal(target.searchParams.get("prompt"), "Open the Universe welcome canvas.");
    }
    const instructions = await readFile(new URL(".github/copilot-instructions.md", root), "utf8");
    assert.match(instructions, /universe-welcome/);
    assert.match(instructions, /Do not list the parts/);
});
