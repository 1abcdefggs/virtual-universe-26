import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { joinSession, createCanvas } from "@github/copilot-sdk/extension";

const EXAMPLES = {
    skills:
        "Help me with the Skills guide in the Universe welcome canvas. Start by explaining the existing skill in this checkout, without creating a fork or changing files. Only prepare a fork destination when I am ready to make changes; keep this same session and ask before setup or resource creation.",
    tools:
        "Help me with the Tools and connectors guide: discover and explicitly add Microsoft Learn's public MCP server, then use it for a public documentation query. No fork or new account is needed. Ask before installing, do not send private data, and do not substitute web search for a connector call.",
    security:
        "Help me review the exact draft PR from the Skills exercise in this same session. Ask which PR if unclear. Explain findings and ask before fixes; do not select the newest PR automatically or open another session.",
    automate:
        "Help me plan a paused issue-to-pr factory for my verified fork. Check the app's repository binding before creation, not only Git remotes. If this session belongs to the event project, stop at a plan for later. Do not switch sessions or create resources without approval.",
};
const files = {
    "/": ["welcome.html", "text/html; charset=utf-8"],
    "/mona.png": ["mona.png", "image/png"],
    "/open-files.png": ["open-files.png", "image/png"],
    "/walkthroughs.js": ["walkthroughs.js", "text/javascript; charset=utf-8"],
};
const servers = new Map();
let session;

async function startServer() {
    const server = createServer(async (req, res) => {
        try {
            if (req.method === "POST" && req.headers.origin !== `http://127.0.0.1:${server.address().port}`) {
                res.writeHead(403, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Use the buttons in the workshop canvas to send an action." }));
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
                // Chat owns setup and approval; browsing the guide never requires a fork.
                await session.send({ prompt: request.text || EXAMPLES[request.id] });
                res.setHeader("Content-Type", "application/json");
                return res.end('{"ok":true}');
            }
            const entry = req.method === "GET" && files[req.url.split("?")[0]];
            if (!entry) {
                res.statusCode = 404;
                return res.end();
            }
            res.setHeader("Content-Type", entry[1]);
            res.setHeader("Cache-Control", "no-store");
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
            description: "Welcome screen and step-by-step guides for Universe '26 Section 2. Start reading immediately; prepare a fork later in the same session only when ready to make changes.",
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
