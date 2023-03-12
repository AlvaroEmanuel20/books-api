import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class DeleteGenre {
    async execute(genreId: number) {
        const genreExists = await prisma.genre.findUnique({
            where: { id: genreId },
        });

        if (!genreExists) throw new ApiError("Genre not found", 404);

        const booksGenre = await prisma.book.findMany({ where: { genreId } });
        if (booksGenre.length > 0)
            throw new ApiError("There are a book using this genre");

        await prisma.genre.delete({ where: { id: genreId } });
        return;
    }
}
