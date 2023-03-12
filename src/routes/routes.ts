import { Router } from "express";
import booksRoutes from "src/modules/books/routes";
import authorsRoutes from "src/modules/authors/routes";
import genresRoutes from "src/modules/genres/routes";

const router = Router();

router.use("/books", booksRoutes);
router.use("/genres", genresRoutes);
router.use("/authors", authorsRoutes);

export default router;
