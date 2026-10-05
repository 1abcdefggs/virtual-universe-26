import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { joinSession, createCanvas } from "@github/copilot-sdk/extension";

const EXERCISES = [
    "Build your first Copilot automation",
    "Customize an agent",
    "Connect your agent",
    "Review your agent\u2019s work",
];
const htmlPath = new URL("./welcome.html", import.meta.url);
const servers = new Map();
let session;

async function startServer() {
    const server = createServer(async (req, res) => {
        if (req.method === "POST" && req.url === "/choose") {
            let body = "";
            for await (const chunk of req) body += chunk;
            const { exercise } = JSON.parse(body || "{}");
            if (!EXERCISES.includes(exercise)) {
                res.statusCode = 400;
                return res.end();
            }
            await session.send({ prompt: `Start chapter: ${exercise}` });
            res.setHeader("Content-Type", "application/json");
            return res.end('{"ok":true}');
        }
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(await readFile(htmlPath, "utf8"));
    });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

session = await joinSession({
    canvases: [
        createCanvas({
            id: "universe-welcome",
            displayName: "Universe '26 welcome",
            description: "Welcome screen for the Universe '26 Section 2 cookbook: outlines the four chapters and lets the learner pick one.",
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
