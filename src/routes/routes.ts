import { Router } from "express";
import booksRoutes from "src/modules/books/routes";

const router = Router();

router.use("/books", booksRoutes);

export default router;
