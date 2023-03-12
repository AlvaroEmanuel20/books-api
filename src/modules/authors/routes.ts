import { Router } from "express";
import AuthorValidate from "./AuthorValidate";
import validate from "@middlewares/validate";
import AuthorController from "./AuthorController";

const authorsRoutes = Router();
const authorController = new AuthorController();
const authorValidate = new AuthorValidate();

authorsRoutes.get("/", authorController.list);

authorsRoutes.get(
    "/:authorId",
    validate(authorValidate.idParam),
    authorController.show
);

authorsRoutes.post(
    "/",
    validate(authorValidate.create),
    authorController.create
);

authorsRoutes.put(
    "/:authorId",
    validate(authorValidate.update),
    authorController.update
);

authorsRoutes.delete(
    "/:authorId",
    validate(authorValidate.idParam),
    authorController.delete
);

export default authorsRoutes;
