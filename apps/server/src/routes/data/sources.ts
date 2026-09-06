import { Hono } from "hono";

import { prisma } from "@santai/shared";

const sources = new Hono();

sources.get("/", async (c) => {
    const items = await prisma.source.findMany({
        orderBy: {
            name: "asc",
        },
        select: {
            id: true,
            name: true,
            type: true,
            url: true,
            rssUrl: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return c.json({
        items,
    });
});

export default sources;