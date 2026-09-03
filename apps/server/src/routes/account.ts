import { Hono } from "hono";

import { auth } from "../auth";

const account = new Hono();

account.post("/set-password", async (c) => {
    try {
        const { newPassword } = await c.req.json<{
            newPassword?: string;
        }>();

        if (!newPassword || newPassword.length < 8) {
            return c.json(
                {
                    error: "Password must be at least 8 characters",
                },
                400,
            );
        }

        const result = await auth.api.setPassword({
            body: {
                newPassword,
            },
            headers: c.req.raw.headers,
        });

        return c.json(result);
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to set password";

        return c.json(
            {
                error: message,
            },
            400,
        );
    }
});

account.post("/unlink", async (c) => {
    try {
        const { providerId } = await c.req.json<{
            providerId?: string;
        }>();

        if (
            providerId !== "google" &&
            providerId !== "github"
        ) {
            return c.json(
                {
                    error: "invalid provider",
                },
                400,
            );
        }

        const result = await auth.api.unlinkAccount({
            body: {
                providerId,
            },
            headers: c.req.raw.headers,
        });

        return c.json(result);
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "Failed to unlink";

        return c.json(
            {
                error: message,
            },
            400,
        );
    }
});

export default account;