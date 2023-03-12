import { z } from "zod";

export default class BookValidate {
    isbnParam = z.object({
        params: z.object({
            bookIsbn: z.string().length(13),
        }),
    });

    create = z.object({
        body: z.object({
            isbn: z.string().length(13),
            name: z.string(),
            description: z.string().max(1000),
            genre: z.string(),
            author: z.string(),
            language: z.enum(["PORTUGUESE", "ENGLISH", "SPANISH"]),
            publisher: z.string().optional(),
            pages: z.number().int().positive(),
            publishedAt: z.date().optional(),
        }),
    });

    update = z.object({
        body: z.object({
            name: z.string().optional(),
            description: z.string().max(1000).optional(),
            genre: z.string().optional(),
            author: z.string().optional(),
            language: z.enum(["PORTUGUESE", "ENGLISH", "SPANISH"]).optional(),
            publisher: z.string().optional(),
            pages: z.number().int().positive().optional(),
            publishedAt: z.date().optional(),
        }),
        params: z.object({
            bookIsbn: z.string().length(13),
        }),
    });
}
