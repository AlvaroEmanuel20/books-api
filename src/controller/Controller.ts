import { Request, Response } from "express";
import CreateBook from "../services/CreateBook";
import DeleteBook from "../services/DeleteBook";
import ListBooks from "../services/ListBooks";
import ShowBook from "../services/ShowBook";
import UpdateBook from "../services/UpdateBook";

export default class Controller {
	list(req: Request, res: Response) {
		const listBooks = new ListBooks();
		listBooks.execute(req, res);
	}

	show(req: Request, res: Response) {
		const showBook = new ShowBook();
		showBook.execute(req, res);
	}

	create(req: Request, res: Response) {
		const createBook = new CreateBook();
		createBook.execute(req, res);
	}

	update(req: Request, res: Response) {
		const updateBook = new UpdateBook();
		updateBook.execute(req, res);
	}

	delete(req: Request, res: Response) {
		const deleteBook = new DeleteBook();
		deleteBook.execute(req, res);
	}
}
