import { Hono } from "hono";

import { prisma } from "@santai/shared";

const article = new Hono();

article.get("/:id", async (c) => {
    const id = c.req.param("id");

    const result = await prisma.article.findUnique({
        where: {
            id,
        },
        include: {
            source: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!result) {
        return c.json(
            {
                error: "Not found",
            },
            404,
        );
    }

    return c.json(result);
});

export default article;