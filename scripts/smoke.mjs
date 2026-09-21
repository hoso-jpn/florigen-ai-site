import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

async function withServer(credentials, check) {
  const socket = createServer();
  socket.listen(0, "127.0.0.1");
  await once(socket, "listening");
  const port = socket.address().port;
  await new Promise((resolve) => socket.close(resolve));
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    env: { ...process.env, SITE_USER: credentials.user, SITE_PASSWORD: credentials.password, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const closed = once(child, "close");
  let logs = "";
  child.stdout.on("data", (data) => { logs += data; });
  child.stderr.on("data", (data) => { logs += data; });
  const base = `http://127.0.0.1:${port}`;
  const request = (path, authorization) => fetch(`${base}${path}`, {
    headers: authorization ? { authorization } : {},
    signal: AbortSignal.timeout(5000),
    redirect: "manual",
  });

  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null) throw new Error(`Next.js exited: ${logs}`);
      try { await request("/"); ready = true; break; } catch { await delay(200); }
    }
    assert.ok(ready, `Next.js did not start: ${logs}`);
    await check(request);
  } finally {
    child.kill("SIGTERM");
    const force = setTimeout(() => child.kill("SIGKILL"), 5000);
    try { await closed; } finally { clearTimeout(force); }
  }
}

const user = "smoke-reader";
const password = `test:${randomUUID()}`;
const authorization = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;

await withServer({ user, password }, async (request) => {
  for (const path of ["/", "/roadmap", "/api/hello", "/favicon.ico-private", "/_next/static-private", "/_next/image-private", "/florigen-app-icon.svg"]) {
    const response = await request(path);
    assert.equal(response.status, 401, path);
    assert.match(response.headers.get("www-authenticate"), /^Basic /);
    assert.match(response.headers.get("cache-control"), /no-store/);
  }
  for (const bad of [authorization.replace("Basic", "Bearer"), `Basic ${Buffer.from(`${user}:${password}:extra`).toString("base64")}`, "Basic !!!"]) {
    assert.equal((await request("/", bad)).status, 401);
  }
  for (const path of ["/", "/roadmap"]) {
    const response = await request(path, authorization);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("x-robots-tag"), /noindex/);
    assert.match(response.headers.get("cache-control"), /no-store/);
    const html = await response.text();
    assert.match(html, /<html[^>]+lang="ja"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /<nav[^>]+aria-label="メインナビゲーション"/);
    assert.ok(html.includes(`href="https://florigen.ai${path}"`));
    assert.match(html, /生育観測/);
  }
  assert.equal((await request("/favicon.ico")).status, 200);
  assert.equal((await request("/florigen-app-icon.svg", authorization)).status, 200);
});

await withServer({ user: "", password: "" }, async (request) => {
  assert.equal((await request("/", authorization)).status, 401);
});

console.log("Production smoke passed: routes, auth, metadata, assets and missing configuration.");
