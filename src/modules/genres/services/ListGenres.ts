import prisma from "@lib/prisma";

export default class ListGenres {
    async execute() {
        return await prisma.genre.findMany({
            include: {
                Book: {
                    select: {
                        isbn: true,
                        name: true,
                        author: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }
}
