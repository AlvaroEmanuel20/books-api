import { Request, Response } from "express";
import prisma from "../utils/database";
import { Book } from "@prisma/client";

export default class ShowBook {
	async execute(req: Request, res: Response) {
		try {
			const { bookIsbn } = req.params;
			const book = await prisma.$queryRaw<Book[]>`
				SELECT * 
				FROM "Book" 
				WHERE isbn = ${bookIsbn}
			`;

			if (!book || book.length === 0)
				return res.status(404).json({ msg: "Book not found" });

			res.json(book[0]);
		} catch (error) {
			res.status(500).json({ msg: "Internal server error" });
		}
	}
}
