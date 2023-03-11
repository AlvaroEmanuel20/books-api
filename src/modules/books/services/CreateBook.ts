import { Request } from "express";
import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";
import { Language } from "@prisma/client";

export interface RequestBody {
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

export default class CreateBook {
    async execute(req: Request) {
        const {
            isbn,
            name,
            description,
            genre,
            author,
            language,
            publisher,
            pages,
            publishedAt,
        } = req.body as RequestBody;

        const bookExists = await prisma.book.findFirst({
            where: { OR: [{ isbn }, { name }] },
        });

        if (bookExists) throw new ApiError("Book already exists");

        const genreId = await createGenre(genre);
        const authorId = await createAuthor(author);

        const newBook = await prisma.book.create({
            data: {
                isbn,
                name,
                description,
                genreId,
                authorId,
                language,
                publisher,
                publishedAt,
                pages,
            },
        });

        return newBook.isbn;
    }
}

async function createGenre(genre: string) {
    const genreExists = await prisma.genre.findFirst({
        where: { name: genre },
    });

    if (genreExists) {
        return genreExists.id;
    } else {
        const newGenre = await prisma.genre.create({
            data: {
                name: genre,
            },
        });

        return newGenre.id;
    }
}

async function createAuthor(author: string) {
    const authorExists = await prisma.author.findFirst({
        where: { name: author },
    });

    if (authorExists) {
        return authorExists.id;
    } else {
        const newAuthor = await prisma.author.create({
            data: {
                name: author,
            },
        });

        return newAuthor.id;
    }
}
