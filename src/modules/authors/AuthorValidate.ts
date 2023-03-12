import { z } from "zod";

export default class AuthorValidate {
    idParam = z.object({
        params: z.object({
            authorId: z.string(),
        }),
    });

    create = z.object({
        body: z.object({
            name: z.string(),
        }),
    });

    update = z.object({
        body: z.object({
            name: z.string(),
        }),
        params: z.object({
            authorId: z.string(),
        }),
    });
}
