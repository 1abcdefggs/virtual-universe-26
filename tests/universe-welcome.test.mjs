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
const context = { window: {} };
vm.runInNewContext(guide, context);
const guides = context.window.WALK;

async function harness() {
    const state = { sent: [], sendError: false };
    let registration;
    const session = {
        // No auth, metadata, repository, or fork API is needed to use the guide.
        send: async ({ prompt }) => {
            if (state.sendError) throw new Error("Chat is unavailable");
            state.sent.push(prompt);
        },
    };
    const script = source.replace(/^import .*;\n/gm, "").replaceAll("import.meta.url", JSON.stringify(extensionURL.href));
    await vm.runInNewContext(`(async()=>{${script}})()`, {
        createServer, readFile, URL,
        joinSession: async (options) => { registration = options; return session; },
        createCanvas: (options) => options,
    });
    return { state, canvas: registration.canvases[0] };
}

test("canvas and guides load with no account check, fork, or session navigation", async () => {
    const { canvas } = await harness();
    const { url } = await canvas.open({ instanceId: "browse" });
    try {
        const page = await fetch(url);
        assert.equal(page.status, 200);
        assert.equal(page.headers.get("cache-control"), "no-store");
        assert.match(await page.text(), /Start reading here/);
        const walkthroughs = await fetch(`${url}walkthroughs.js`);
        assert.equal(walkthroughs.status, 200);
        assert.equal(walkthroughs.headers.get("cache-control"), "no-store");
        assert.equal((await fetch(`${url}me`)).status, 404);
        assert.equal((await fetch(`${url}fork`, {
            method: "POST", headers: { Origin: new URL(url).origin },
        })).status, 404);
    } finally {
        await canvas.onClose({ instanceId: "browse" });
    }
    assert.doesNotMatch(source, /execFile|child_process|whoAmI|metadata\.snapshot/);
    assert.doesNotMatch(html, /ghapp:\/\/session|forkCard|loadMe|data-forkopen|ME\.working|Switch to your fork|Open in Copilot app/);
});

test("read-only, connector, setup, and help requests all stay in the owning chat", async () => {
    const { canvas, state } = await harness();
    const { url } = await canvas.open({ instanceId: "send" });
    const post = (body, origin = new URL(url).origin) => fetch(`${url}try`, {
        method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    try {
        for (const [id, text] of [
            ["skills", guides.skills.steps[0].body.find((b) => b.k === "chat").text],
            ["tools", guides.tools.steps[0].body.find((b) => b.k === "chat").text],
            ["skills", guides.skills.steps[1].body.find((b) => b.k === "chat").text],
        ]) {
            assert.equal((await post({ id, text })).status, 200);
            assert.equal(state.sent.at(-1), text);
        }
        assert.equal((await post({ id: "skills" })).status, 200);
        assert.match(state.sent.at(-1), /without creating a fork/);
        assert.equal((await post({ id: "tools" }, "https://unrelated.example")).status, 403);
        assert.equal((await post(null)).status, 400);
        assert.equal((await post({ id: "missing" })).status, 400);
        assert.equal((await post({ id: "skills", text: 42 })).status, 400);
        assert.equal((await post({ id: "skills", text: "x".repeat(17000) })).status, 413);
        assert.equal(state.sent.length, 4);
        state.sendError = true;
        const response = await post({ id: "tools" });
        assert.equal(response.status, 500);
        assert.match((await response.json()).error, /Chat is unavailable/);
    } finally {
        await canvas.onClose({ instanceId: "send" });
    }
});

test("fork setup follows reading and precedes editing without project switches", () => {
    const steps = guides.skills.steps;
    assert.equal(steps[0].h, "Ask Copilot to open the skill");
    assert.equal(steps[1].h, "Ready to make changes?");
    assert.equal(steps[2].h, "Make one useful edit");
    assert.match(JSON.stringify(steps[0]), /Read only/);
    assert.match(JSON.stringify(steps[1]), /same checkout/);
    assert.match(JSON.stringify(steps[1]), /Preserve origin/);
    assert.match(JSON.stringify(steps[1]), /Do not open another session or clone/);
    assert.match(JSON.stringify(guides.tools.steps[0]), /No fork/);
    assert.doesNotMatch(guide, /git reset --hard|\{fork\}|\{issue\}|\{pr\}/);
    assert.match(JSON.stringify(steps[0]), /Open \.github\/skills\/issue-to-pr\/SKILL\.md from this checkout in the editor/);
    assert.equal(steps[0].body.some((block) => typeof block === "object" && block.img), false);
    assert.doesNotMatch(guide, /gear menu|Show tracked hidden files|open-files\.png/);
    const blocks = Object.values(guides).flatMap((part) => part.steps.flatMap((step) => step.body));
    const install = blocks.find((block) => typeof block !== "string" && block.link?.href.startsWith("ghapp://mcp/install?"));
    assert.deepEqual(JSON.parse(decodeURIComponent(install.link.href.split("?")[1])), {
        name: "microsoft-learn", type: "http", url: "https://learn.microsoft.com/api/mcp",
    });
    assert.match(html, /Send to this chat/);
    for (const script of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script[1]);
});

test("short launch prompt and instructions preserve deferred-fork boundaries", async () => {
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
    assert.match(instructions, /need no fork/);
    assert.match(instructions, /preserving|Keep the current checkout/);
    assert.match(instructions, /factory is bound to the app project/);
    const skill = await readFile(new URL(".github/skills/issue-to-pr/SKILL.md", root), "utf8");
    assert.match(skill, /push only to/);
    assert.match(skill, /never implicitly to origin/);
    assert.match(skill, /Do not open or switch sessions/);
});
