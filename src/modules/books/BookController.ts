import { Request, Response } from "express";
import CreateBook from "./services/CreateBook";
import DeleteBook from "./services/DeleteBook";
import ListBooks from "./services/ListBooks";
import ShowBook from "./services/ShowBook";
import UpdateBook from "./services/UpdateBook";
import { Language } from "@prisma/client";

export interface CreateBookBody {
    isbn: string;
    name: string;
    description: string;
    genre: string;
    author: string;
    language: Language;
    publisher?: string;
    pages: number;
    publishedAt?: Date;
}

export interface UpdateBookBody {
    name?: string;
    description?: string;
    genre?: string;
    author?: string;
    language?: Language;
    publisher?: string;
    pages?: number;
    publishedAt?: Date;
}

export default class BookController {
    async list(req: Request, res: Response) {
        const listBooks = new ListBooks();
        res.json(await listBooks.execute());
    }

    async show(req: Request, res: Response) {
        const { bookIsbn } = req.params;
        const showBook = new ShowBook();
        res.json(await showBook.execute(bookIsbn));
    }

    async create(req: Request, res: Response) {
        const data = req.body as CreateBookBody;
        const createBook = new CreateBook();
        await createBook.execute(data);
        res.sendStatus(201);
    }

    async update(req: Request, res: Response) {
        const { bookIsbn } = req.params;
        const data = req.body as UpdateBookBody;
        const updateBook = new UpdateBook();
        await updateBook.execute(data, bookIsbn);
        res.sendStatus(200);
    }

    async delete(req: Request, res: Response) {
        const { bookIsbn } = req.params;
        const deleteBook = new DeleteBook();
        await deleteBook.execute(bookIsbn);
        res.sendStatus(200);
    }
}
