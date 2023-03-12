import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class CreateAuthor {
    async execute(name: string) {
        const authorExists = await prisma.author.findFirst({ where: { name } });
        if (authorExists) throw new ApiError("Author already exists");
        await prisma.author.create({ data: { name } });
        return;
    }
}
