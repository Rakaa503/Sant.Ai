import { createAuth } from "@santai/shared";

const port = Number(process.env.SERVER_PORT ?? 3001);

const serverURL =
    process.env.BETTER_AUTH_URL ??
    `http://localhost:${port}`;

const webOrigin =
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000";

const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
    throw new Error("BETTER_AUTH_SECRET is not set");
}

export const auth = createAuth({
    secret,
    baseURL: serverURL,
    siteURL: webOrigin,
});

export { serverURL, webOrigin };