import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class CreateGenre {
    async execute(name: string) {
        const genreExists = await prisma.genre.findFirst({ where: { name } });
        if (genreExists) throw new ApiError("Genre already exists");
        await prisma.genre.create({ data: { name } });
        return;
    }
}
