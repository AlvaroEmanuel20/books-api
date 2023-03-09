import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes/routes";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}`);
});
