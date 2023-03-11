import { Router } from "express";
import BookController from "./BookController";
import BookValidate from "./BookValidate";
import validate from "@middlewares/validate";

const booksRoutes = Router();
const bookController = new BookController();
const bookValidate = new BookValidate();

booksRoutes.get("/", bookController.list);
booksRoutes.get("/:bookIsbn", validate(bookValidate.show), bookController.show);
booksRoutes.post("/", validate(bookValidate.create), bookController.create);
booksRoutes.patch(
    "/:bookIsbn",
    validate(bookValidate.update),
    bookController.update
);
booksRoutes.delete(
    "/:bookIsbn",
    validate(bookValidate.delete),
    bookController.delete
);

export default booksRoutes;
