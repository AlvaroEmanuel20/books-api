import { z } from "zod";

export default class Validate {
	show = z.object({
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
			publisher: z.string().optional(),
			pages: z.number().int().positive(),
			publishedAt: z.date().optional(),
		}),
	});

	update = z.object({
		body: z.object({
			name: z.string().optional(),
			description: z.string().max(1000).optional(),
			genre: z.string(),
			author: z.string().optional(),
			publisher: z.string().optional(),
			pages: z.number().int().positive().optional(),
			publishedAt: z.date().optional(),
		}),
		params: z.object({
			bookIsbn: z.string().length(13),
		}),
	});

	delete = z.object({
		params: z.object({
			bookIsbn: z.string().length(13),
		}),
	});
}
