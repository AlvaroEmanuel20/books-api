import { Request, Response } from "express";
import ListGenres from "./services/ListGenres";
import ShowGenre from "./services/ShowGenre";
import CreateGenre from "./services/CreateGenre";
import UpdateGenre from "./services/UpdateGenre";
import DeleteGenre from "./services/DeleteGenre";

export default class GenreController {
    async list(req: Request, res: Response) {
        const listGenres = new ListGenres();
        res.json(await listGenres.execute());
    }

    async show(req: Request, res: Response) {
        const { genreId } = req.params;
        const showGenre = new ShowGenre();
        res.json(await showGenre.execute(Number(genreId)));
    }

    async create(req: Request, res: Response) {
        const { name }: { name: string } = req.body;
        const createGenre = new CreateGenre();
        await createGenre.execute(name);
        res.sendStatus(201);
    }

    async update(req: Request, res: Response) {
        const { genreId } = req.params;
        const { name }: { name: string } = req.body;
        const updateGenre = new UpdateGenre();
        await updateGenre.execute(name, Number(genreId));
        res.sendStatus(200);
    }

    async delete(req: Request, res: Response) {
        const { genreId } = req.params;
        const deleteGenre = new DeleteGenre();
        await deleteGenre.execute(Number(genreId));
        res.sendStatus(200);
    }
}
