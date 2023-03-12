import prisma from "@lib/prisma";

export default class ListAuthors {
    async execute() {
        return await prisma.author.findMany({
            include: {
                Book: {
                    select: {
                        isbn: true,
                        name: true,
                        genre: {
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
