import ApiError from "@lib/ApiError";
import prisma from "@lib/prisma";

export default class ShowBook {
    async execute(bookIsbn: string) {
        const book = await prisma.book.findUnique({
            where: { isbn: bookIsbn },
            include: {
                genre: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
                author: {
                    select: {
                        name: true,
                        id: true,
                    },
                },
            },
        });

        if (!book) throw new ApiError("Book not found", 404);
        return book;
    }
}
