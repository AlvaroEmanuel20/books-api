import express from "express";
import "express-async-errors";
import cors from "cors";
import "dotenv/config";
import router from "./routes/routes";
import errors from "@middlewares/errors";

export const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use(errors);

export const server = app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});
