import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

import {
    securityHeaders,
    rateLimit,
    trustedProxy,
} from "./security";

import {
    auth,
    serverURL,
    webOrigin,
} from "./auth";

import account from "./routes/account";
import search from "./routes/search";
import articles from "./routes/data/articles";
import article from "./routes/data/article";

const port = Number(process.env.SERVER_PORT ?? 3001);

const app = new Hono();

/**
 * Security Headers
 */
app.use("*", securityHeaders);

/**
 * Trusted Proxy
 */
app.use("*", trustedProxy);

/**
 * CORS
 */
app.use(
    "/api/*",
    cors({
        origin: webOrigin,
        credentials: true,
        allowMethods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],
        allowHeaders: [
            "Content-Type",
            "Authorization",
        ],
    }),
);

/**
 * Rate Limit
 */
app.use(
    "/api/*",
    rateLimit({
        windowMs: 60_000,
        limit: 100,
    }),
);

/**
 * Health Check
 */
app.get("/api/health", (c) => {
    return c.json({
        ok: true,
        service: "santai-server",
        time: new Date().toISOString(),
    });
});

/**
 * Better Auth
 */
app.all("/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
});

/**
 * Account Routes
 */
app.route("/api/account", account);

/**
 * Search Routes
 */
app.route("/api/search", search);

/**
 * Article Routes
 */
app.route("/api/data/articles", articles);
app.route("/api/data/articles", article);

/**
 * Server
 */
serve(
    {
        fetch: app.fetch,
        port,
    },
    (info) => {
        console.log(
            `[server] auth baseURL=${serverURL} webOrigin=${webOrigin}`,
        );

        console.log(
            `[server] listening on http://localhost:${info.port}`,
        );
    },
);