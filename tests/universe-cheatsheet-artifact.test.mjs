import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import vm from "node:vm";
import test from "node:test";

const root = new URL("../", import.meta.url);
const extensionURL = new URL(".github/extensions/universe-cheatsheet-artifact/extension.mjs", root);
const source = await readFile(extensionURL, "utf8");

async function harness() {
    const sent = [];
    let registration;
    const session = { send: async ({ prompt }) => { sent.push(prompt); } };
    const script = source.replace(/^import .*;\n/gm, "").replaceAll("import.meta.url", JSON.stringify(extensionURL.href));
    await vm.runInNewContext(`(async()=>{${script}})()`, {
        createServer, readFile, URL,
        joinSession: async (options) => { registration = options; return session; },
        createCanvas: (options) => options,
    });
    return { sent, canvas: registration.canvases[0] };
}

test("cheat sheet canvas serves the guide and preview, centred on /create-issue-artifact", async () => {
    const { canvas, sent } = await harness();
    const { url } = await canvas.open({ instanceId: "t" });
    try {
        const page = await (await fetch(url)).text();
        assert.match(page, /\/create-issue-artifact follow github-virtual-universe-highlights\/attach-a-cheat-sheet-artifact\/instructions\.md/);
        const img = await fetch(new URL("preview.png", url));
        assert.equal(img.status, 200);
        assert.equal(img.headers.get("content-type"), "image/png");
        assert.equal((await fetch(new URL("nope", url))).status, 404);

        assert.equal((await fetch(new URL("try", url), { method: "POST", body: '{"id":"x"}' })).status, 400);
        assert.equal(sent.length, 0);
        assert.equal((await fetch(new URL("try", url), { method: "POST", body: '{"id":"issue"}' })).status, 200);
        assert.equal(sent.length, 1);
        assert.match(sent[0], /Never create it in octodemo\/virtual-universe-26/);
    } finally {
        await canvas.onClose({ instanceId: "t" });
    }
});
