import { Hono } from "hono";

import { prisma } from "@santai/shared";

const keywords = new Hono();

keywords.get("/", async (c) => {
    const items = await prisma.keyword.findMany({
        orderBy: {
            keyword: "asc",
        },
    });

    return c.json({
        items,
    });
});

export default keywords;