import { z } from "zod";

export default class GenreValidate {
    idParam = z.object({
        params: z.object({
            genreId: z.string(),
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
            genreId: z.string(),
        }),
    });
}
