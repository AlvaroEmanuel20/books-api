import { Request, Response } from "express";
import prisma from "@lib/prisma";
import { Book } from "@prisma/client";

export default class ListBooks {
    async execute(req: Request, res: Response) {
        try {
            const books = await prisma.$queryRaw<Book[]>`SELECT * FROM "Book"`;
            res.json(books);
        } catch (error) {
            res.status(500).json({ msg: "Internal server error" });
        }
    }
}
