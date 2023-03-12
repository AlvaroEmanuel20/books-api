import { Router } from "express";
import GenreValidate from "./GenreValidate";
import validate from "@middlewares/validate";
import GenreController from "./GenreController";

const genresRoutes = Router();
const genreController = new GenreController();
const genreValidate = new GenreValidate();

genresRoutes.get("/", genreController.list);

genresRoutes.get(
    "/:genreId",
    validate(genreValidate.idParam),
    genreController.show
);

genresRoutes.post("/", validate(genreValidate.create), genreController.create);

genresRoutes.put(
    "/:genreId",
    validate(genreValidate.update),
    genreController.update
);

genresRoutes.delete(
    "/:genreId",
    validate(genreValidate.idParam),
    genreController.delete
);

export default genresRoutes;
