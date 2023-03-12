import ApiError from "@lib/ApiError";
import prisma from "@lib/prisma";

export default class ShowAuthor {
    async execute(authorId: number) {
        const author = await prisma.author.findUnique({
            where: { id: authorId },
            include: {
                Book: {
                    select: {
                        name: true,
                        isbn: true,
                        genre: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!author) throw new ApiError("Author not found", 404);
        return author;
    }
}
