import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";
import { CreateBookBody } from "../BookController";

export default class CreateBook {
    async execute(data: CreateBookBody) {
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
        } = data;

        const bookExists = await prisma.book.findFirst({
            where: { OR: [{ isbn }, { name }] },
        });

        if (bookExists) throw new ApiError("Book already exists");

        const genreExists = await prisma.genre.findFirst({
            where: { name: genre },
        });

        const authorExists = await prisma.author.findFirst({
            where: { name: author },
        });

        const genreId = genreExists
            ? genreExists.id
            : (await prisma.genre.create({ data: { name: genre } })).id;

        const authorId = authorExists
            ? authorExists.id
            : (await prisma.author.create({ data: { name: author } })).id;

        await prisma.book.create({
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

        return;
    }
}
