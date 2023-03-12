import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class UpdateAuthor {
    async execute(name: string, authorId: number) {
        const authorExists = await prisma.author.findUnique({
            where: { id: authorId },
        });

        if (!authorExists) throw new ApiError("Author not found", 404);

        const nameExists = await prisma.author.findFirst({ where: { name } });
        if (nameExists) throw new ApiError("There are a author with this name");
        
        await prisma.author.update({ where: { id: authorId }, data: { name } });
        return;
    }
}
