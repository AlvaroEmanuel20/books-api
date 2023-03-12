import ApiError from "@lib/ApiError";
import prisma from "@lib/prisma";
import { UpdateBookBody } from "../BookController";

export default class UpdateBook {
    async execute(data: UpdateBookBody, bookIsbn: string) {
        const {
            name,
            description,
            genre,
            author,
            publisher,
            pages,
            publishedAt,
        } = data;

        const bookExists = await prisma.book.findUnique({
            where: { isbn: bookIsbn },
        });

        const nameExists = await prisma.book.findFirst({ where: { name } });

        if (!bookExists) throw new ApiError("Book not found", 404);
        if (nameExists) throw new ApiError("There are a book with this name");

        if (genre) {
            const genreExists = await prisma.genre.findFirst({
                where: { name: genre },
            });

            const genreId = genreExists
                ? genreExists.id
                : (await prisma.genre.create({ data: { name: genre } })).id;

            await prisma.book.update({
                where: { isbn: bookIsbn },
                data: {
                    genreId,
                },
            });
        }

        if (author) {
            const authorExists = await prisma.author.findFirst({
                where: { name: author },
            });

            const authorId = authorExists
                ? authorExists.id
                : (await prisma.author.create({ data: { name: author } })).id;

            await prisma.book.update({
                where: { isbn: bookIsbn },
                data: {
                    authorId,
                },
            });
        }

        await prisma.book.update({
            where: { isbn: bookIsbn },
            data: {
                name,
                description,
                publisher,
                pages,
                publishedAt,
            },
        });

        return;
    }
}
