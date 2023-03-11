import { Request, Response } from "express";
import { RequestBody } from "./CreateBook";
import prisma from "@lib/prisma";
import { Book } from "@prisma/client";

export default class UpdateBook {
    async execute(req: Request, res: Response) {
        try {
            const { bookIsbn } = req.params;
            const {
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
                WHERE isbn = ${bookIsbn}
            `;

            if (!bookExists || bookExists.length === 0)
                return res.status(404).json({ msg: "Book not found" });

            await prisma.book.update({
                where: { isbn: bookIsbn },
                data: {
                    name,
                    description,
                    genre,
                    author,
                    publisher,
                    pages,
                    publishedAt,
                },
            });

            res.status(200).json({ msg: "Updated", affectedRows: 1 });
        } catch (error) {
            res.status(500).json({ msg: "Internal server error" });
        }
    }
}
