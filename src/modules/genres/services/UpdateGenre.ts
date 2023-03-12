import prisma from "@lib/prisma";
import ApiError from "@lib/ApiError";

export default class UpdateGenre {
    async execute(name: string, genreId: number) {
        const genreExists = await prisma.genre.findUnique({
            where: { id: genreId },
        });

        if (!genreExists) throw new ApiError("Genre not found", 404);

        const nameExists = await prisma.genre.findFirst({ where: { name } });
        if (nameExists) throw new ApiError("There are a genre with this name");

        await prisma.genre.update({ where: { id: genreId }, data: { name } });
        return;
    }
}
