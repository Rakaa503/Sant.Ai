import { Hono } from "hono";

import { prisma } from "@santai/shared";

const youtube = new Hono();

youtube.get("/", async (c) => {
    const category =
        c.req.query("category") || undefined;

    const lang =
        c.req.query("lang") || undefined;

    const country =
        c.req.query("country") || undefined;

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

    if (lang) {
        where.language = lang;
    }

    if (country) {
        where.country = country;
    }

    const [items, total] = await Promise.all([
        prisma.youTubeVideo.findMany({
            where,
            orderBy: {
                publishedAt: "desc",
            },
            take: limit,
            skip: offset,
        }),

        prisma.youTubeVideo.count({
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

export default youtube;