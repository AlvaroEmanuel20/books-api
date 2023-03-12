import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class DeleteAuthor {
    async execute(authorId: number) {
        const authorExists = await prisma.author.findUnique({
            where: { id: authorId },
        });

        if (!authorExists) throw new ApiError("Author not found", 404);

        const booksAuthor = await prisma.book.findMany({ where: { authorId } });
        if (booksAuthor.length > 0)
            throw new ApiError("There are a book using this author");

        await prisma.author.delete({ where: { id: authorId } });
        return;
    }
}
