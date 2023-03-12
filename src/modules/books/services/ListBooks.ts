import prisma from "@lib/prisma";

export default class ListBooks {
    async execute() {
        return await prisma.book.findMany({
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
    }
}
