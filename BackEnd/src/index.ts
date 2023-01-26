import express from "express";
import { PORT } from "./config";
import cors from "cors";
import web3EventListeners from "./web3EventListeners";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

web3EventListeners();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
