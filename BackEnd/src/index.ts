import express from "express";
import { PORT } from "./config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
