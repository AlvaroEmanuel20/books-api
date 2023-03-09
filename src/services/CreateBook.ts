import { Request, Response } from "express";
import prisma from "../utils/database";
import { Book } from "@prisma/client";

export interface RequestBody {
	isbn: string;
	name: string;
	description: string;
	genre: string;
	author: string;
	publisher?: string;
	pages: number;
	publishedAt?: Date;
}

export default class CreateBook {
	async execute(req: Request, res: Response) {
		try {
			const {
				isbn,
				name,
				description,
				genre,
				author,
				publisher,
				pages,
				publishedAt,
			} = req.body as RequestBody;

			const bookExists = await prisma.$queryRaw<Book[]>`
				SELECT name 
				FROM "Book" 
				WHERE isbn = ${isbn}
			`;

			if (bookExists && bookExists.length > 0)
				return res.status(400).json({ msg: "Book already exists" });

			await prisma.book.create({
				data: {
					isbn,
					name,
					description,
					genre,
					author,
					publisher,
					pages,
					publishedAt,
				},
			});

			res.status(201).json({ msg: "Created", affectedRows: 1 });
		} catch (error) {
			res.status(500).json({ msg: "Internal server error" });
		}
	}
}
