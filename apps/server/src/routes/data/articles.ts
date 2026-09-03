import { Hono } from "hono";

import { prisma } from "@santai/shared";

const articles = new Hono();

articles.get("/", async (c) => {
    const category = c.req.query("category") || undefined;
    const keyword = c.req.query("keyword") || undefined;
    const source = c.req.query("source") || undefined;
    const lang = c.req.query("lang") || undefined;
    const country = c.req.query("country") || undefined;

    const limit = Math.min(
        parseInt(c.req.query("limit") || "50"),
        100,
    );

    const offset = parseInt(
        c.req.query("offset") || "0",
    );

    const where: any = {};

    if (category && category !== "all") {
        where.category = category;
    }

    if (keyword) {
        where.title = {
            contains: keyword,
            mode: "insensitive",
        };
    }

    if (source && source !== "all") {
        where.sourceId = source;
    }

    if (lang && lang !== "all") {
        where.language = lang;
    }

    if (country && country !== "all") {
        where.country = country;
    }

    const [items, total] = await Promise.all([
        prisma.article.findMany({
            where,
            orderBy: {
                publishedAt: "desc",
            },
            take: limit,
            skip: offset,
        }),

        prisma.article.count({
            where,
        }),
    ]);

    return c.json({
        items,
        total,
        limit,
        offset,
    });
});

export default articles;