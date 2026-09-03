import { Hono } from "hono";

import { prisma } from "@santai/shared";

type SearchCategory =
    | "all"
    | "users"
    | "projects"
    | "ideas"
    | "articles"
    | "videos"
    | "discussions";

type SearchHit = {
    id: string;
    type:
        | "user"
        | "project"
        | "idea"
        | "article"
        | "video"
        | "discussion";
    title: string;
    subtitle?: string;
    image?: string;
    href: string;
    badge?: string;
};

type SearchResponse = {
    results: SearchHit[];
    total: number;
};

const SEARCH_LIMIT = 10;
const MAX_RESULTS = SEARCH_LIMIT * 4;

const search = new Hono();

search.get("/", async (c) => {
    const q = c.req.query("q")?.trim() ?? "";

    const filter =
        (c.req.query("filter") ?? "all") as SearchCategory;

    if (!q) {
        return c.json<SearchResponse>({
            results: [],
            total: 0,
        });
    }

    const results: SearchHit[] = [];

    const queries: Promise<SearchHit[]>[] = [];

    if (
        filter === "all" ||
        filter === "users"
    ) {
        queries.push(
            (async () => {
                const users =
                    await prisma.user.findMany({
                        where: {
                            OR: [
                                {
                                    name: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    username: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    bio: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    university: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    studyProgram: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                            banned: false,
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            image: true,
                            bio: true,
                            role: true,
                            studyProgram: true,
                        },
                    });

                return users.map((user) => ({
                    id: user.id,
                    type: "user" as const,
                    title: user.name,
                    subtitle: user.studyProgram
                        ? `Mahasiswa • ${user.studyProgram}`
                        : user.bio
                            ? user.bio
                            : `@${user.username}`,
                    image:
                        user.image ??
                        undefined,
                    href: `/${user.username}`,
                    badge:
                        user.role !== "user"
                            ? user.role
                            : undefined,
                }));
            })(),
        );
    }

    if (
        filter === "all" ||
        filter === "projects"
    ) {
        queries.push(
            (async () => {
                const projects =
                    await prisma.project.findMany({
                        where: {
                            OR: [
                                {
                                    title: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    description: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    techStack: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            status: true,
                            creator: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    });

                return projects.map((project) => ({
                    id: project.id,
                    type: "project" as const,
                    title: project.title,
                    subtitle:
                        project.description.slice(
                            0,
                            100,
                        ),
                    href: `/projects/${project.id}`,
                    badge: project.status,
                }));
            })(),
        );
    }

    if (
        filter === "all" ||
        filter === "ideas"
    ) {
        queries.push(
            (async () => {
                const ideas =
                    await prisma.idea.findMany({
                        where: {
                            OR: [
                                {
                                    title: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    description: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            voteCount: true,
                            user: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    });

                return ideas.map((idea) => ({
                    id: idea.id,
                    type: "idea" as const,
                    title: idea.title,
                    subtitle:
                        idea.description.slice(
                            0,
                            100,
                        ),
                    href: `/${idea.user.username}`,
                    badge: `${idea.voteCount} votes`,
                }));
            })(),
        );
    }

    if (
        filter === "all" ||
        filter === "articles"
    ) {
        queries.push(
            (async () => {
                const articles =
                    await prisma.article.findMany({
                        where: {
                            OR: [
                                {
                                    title: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    description: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    content: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            category: true,
                            url: true,
                            image: true,
                        },
                    });

                return articles.map((article) => ({
                    id: article.id,
                    type: "article" as const,
                    title: article.title,
                    subtitle:
                        article.description.slice(
                            0,
                            100,
                        ),
                    image:
                        article.image ??
                        undefined,
                    href: `/articles/${article.id}`,
                    badge:
                        article.category ??
                        undefined,
                }));
            })(),
        );
    }

    if (
        filter === "all" ||
        filter === "videos"
    ) {
        queries.push(
            (async () => {
                const videos =
                    await prisma.youTubeVideo.findMany({
                        where: {
                            OR: [
                                {
                                    title: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    description: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    channelName: {
                                        contains: q,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            title: true,
                            channelName: true,
                            thumbnail: true,
                            views: true,
                        },
                    });

                return videos.map((video) => ({
                    id: video.id,
                    type: "video" as const,
                    title: video.title,
                    subtitle:
                        video.channelName,
                    image:
                        video.thumbnail ??
                        undefined,
                    href: `/intelligence/video/${video.id}`,
                    badge: `${(
                        video.views / 1000
                    ).toFixed(0)}k views`,
                }));
            })(),
        );
    }

    if (
        filter === "all" ||
        filter === "discussions"
    ) {
        queries.push(
            (async () => {
                const comments =
                    await prisma.comment.findMany({
                        where: {
                            content: {
                                contains: q,
                                mode: "insensitive",
                            },
                        },
                        take: SEARCH_LIMIT,
                        select: {
                            id: true,
                            content: true,
                            createdAt: true,
                            user: {
                                select: {
                                    username: true,
                                    name: true,
                                },
                            },
                            idea: {
                                select: {
                                    title: true,
                                    id: true,
                                },
                            },
                            project: {
                                select: {
                                    title: true,
                                    id: true,
                                },
                            },
                        },
                    });

                return comments.map((comment) => ({
                    id: comment.id,
                    type: "discussion" as const,
                    title:
                        comment.content.slice(
                            0,
                            80,
                        ),
                    subtitle: `${comment.user.name} • ${
                        comment.idea?.title ??
                        comment.project?.title ??
                        ""
                    }`,
                    href: comment.idea
                        ? `/${comment.user.username}`
                        : `/projects/${comment.project?.id}`,
                    badge: "Comment",
                }));
            })(),
        );
    }

    const settled =
        await Promise.allSettled(queries);

    for (const result of settled) {
        if (
            result.status === "fulfilled"
        ) {
            results.push(...result.value);
        }
    }

    const normalizedQuery =
        q.toLowerCase();

    results.sort((a, b) => {
        const aTitle =
            a.title.toLowerCase();

        const bTitle =
            b.title.toLowerCase();

        const aExact =
            aTitle === normalizedQuery
                ? 0
                : 1;

        const bExact =
            bTitle === normalizedQuery
                ? 0
                : 1;

        if (aExact !== bExact) {
            return aExact - bExact;
        }

        const aStarts =
            aTitle.startsWith(
                normalizedQuery,
            )
                ? 0
                : 1;

        const bStarts =
            bTitle.startsWith(
                normalizedQuery,
            )
                ? 0
                : 1;

        if (aStarts !== bStarts) {
            return aStarts - bStarts;
        }

        return 0;
    });

    const sliced =
        results.slice(
            0,
            MAX_RESULTS,
        );

    return c.json<SearchResponse>({
        results: sliced,
        total: sliced.length,
    });
});

export default search;