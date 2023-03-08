import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}`);
});
