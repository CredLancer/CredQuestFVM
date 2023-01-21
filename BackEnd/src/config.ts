import dotenv from "dotenv";
dotenv.config();

export const PORT = parseInt(process.env.PORT || "8000");
