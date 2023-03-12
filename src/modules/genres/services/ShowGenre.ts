import ApiError from "@lib/ApiError";
import prisma from "@lib/prisma";

export default class ShowGenre {
    async execute(genreId: number) {
        const genre = await prisma.genre.findUnique({
            where: { id: genreId },
            include: {
                Book: {
                    select: {
                        name: true,
                        isbn: true,
                        author: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!genre) throw new ApiError("Genre not found", 404);
        return genre;
    }
}
