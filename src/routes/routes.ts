import { Router } from "express";
import Controller from "../controller/Controller";
import validate from "../middlewares/validate";
import Validate from "../utils/Validate";

const router = Router();
const controller = new Controller();
const validateSchema = new Validate();

router.get("/", controller.list);
router.get("/:bookIsbn", validate(validateSchema.show), controller.show);
router.post("/", validate(validateSchema.create), controller.create);
router.patch("/:bookIsbn", validate(validateSchema.update), controller.update);
router.delete("/:bookIsbn", validate(validateSchema.delete), controller.delete);

export default router;
