import { Book } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../utils/database";

export default class DeleteBook {
	async execute(req: Request, res: Response) {
		try {
			const { bookIsbn } = req.params;
			const bookExists = await prisma.$queryRaw<Book[]>`
                SELECT name 
                FROM "Book" 
                WHERE isbn = ${bookIsbn}
            `;

			if (!bookExists || bookExists.length === 0)
				return res.status(404).json({ msg: "Book not found" });

			const result = await prisma.$executeRaw`
                DELETE FROM "Book"
                WHERE isbn = ${bookIsbn}
            `;

			res.status(200).json({ msg: "Deleted", affectedRows: result });
		} catch (error) {
			res.status(500).json({ msg: "Internal server error" });
		}
	}
}
