import { Request, Response } from "express";
import ListAuthors from "./services/ListAuthors";
import ShowAuthor from "./services/ShowAuthor";
import CreateAuthor from "./services/CreateAuthor";
import UpdateAuthor from "./services/UpdateAuthor";
import DeleteAuthor from "./services/DeleteAuthor";

export default class AuthorController {
    async list(req: Request, res: Response) {
        const listAuthors = new ListAuthors();
        res.json(await listAuthors.execute());
    }

    async show(req: Request, res: Response) {
        const { authorId } = req.params;
        const showAuthor = new ShowAuthor();
        res.json(await showAuthor.execute(Number(authorId)));
    }

    async create(req: Request, res: Response) {
        const { name }: { name: string } = req.body;
        const createAuthor = new CreateAuthor();
        await createAuthor.execute(name);
        res.sendStatus(201);
    }

    async update(req: Request, res: Response) {
        const { authorId } = req.params;
        const { name }: { name: string } = req.body;
        const updateAuthor = new UpdateAuthor();
        await updateAuthor.execute(name, Number(authorId));
        res.sendStatus(200);
    }

    async delete(req: Request, res: Response) {
        const { authorId } = req.params;
        const deleteAuthor = new DeleteAuthor();
        await deleteAuthor.execute(Number(authorId));
        res.sendStatus(200);
    }
}
