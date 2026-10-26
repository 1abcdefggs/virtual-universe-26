import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { joinSession, createCanvas } from "@github/copilot-sdk/extension";

const PROMPTS = {
    issue: "Create an issue titled \"My GitHub Universe '26 cheat sheet\" in my fork of octodemo/virtual-universe-26 and open a session for it. Never create it in octodemo/virtual-universe-26. If you can't tell which repository is my fork, ask me.",
};
const tutorial = "../../../github-virtual-universe-highlights/attach-a-cheat-sheet-artifact/";
const files = {
    "/": ["cheatsheet.html", "text/html; charset=utf-8"],
    "/preview.png": [`${tutorial}cheatsheet-preview.png`, "image/png"],
};
const servers = new Map();
let session;

async function startServer() {
    const server = createServer(async (req, res) => {
        if (req.method === "POST" && req.url === "/try") {
            let body = "";
            for await (const chunk of req) body += chunk;
            let id;
            try {
                ({ id } = JSON.parse(body || "{}"));
            } catch {}
            if (!Object.hasOwn(PROMPTS, id)) {
                res.statusCode = 400;
                return res.end();
            }
            await session.send({ prompt: PROMPTS[id] });
            res.setHeader("Content-Type", "application/json");
            return res.end('{"ok":true}');
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
            id: "universe-cheatsheet-artifact",
            displayName: "Universe '26 cheat sheet artifact",
            description: "Short Section 3 guide: use /create-issue-artifact to attach a GitHub Universe cheat sheet and a surprise card to an issue.",
            actions: [],
            open: async (ctx) => {
                let entry = servers.get(ctx.instanceId);
                if (!entry) {
                    entry = await startServer();
                    servers.set(ctx.instanceId, entry);
                }
                return { title: "Attach a cheat sheet artifact", url: entry.url };
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
