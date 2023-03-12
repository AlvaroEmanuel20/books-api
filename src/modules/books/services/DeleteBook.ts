import ApiError from "@lib/ApiError";
import prisma from "@lib/prisma";

export default class DeleteBook {
    async execute(bookIsbn: string) {
        const bookExists = await prisma.book.findUnique({
            where: { isbn: bookIsbn },
        });

        if (!bookExists) throw new ApiError("Book not found", 404);
        await prisma.book.delete({
            where: { isbn: bookIsbn },
        });

        return;
    }
}
