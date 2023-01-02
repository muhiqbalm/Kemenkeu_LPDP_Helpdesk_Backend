import process from "process";
import express from "express";
import mongoose from "mongoose";
import getenv from "./src/helper/getenv.js";
import cors from "cors";

const app = express();

const PORT = getenv("PORT");
const MONGO_URI = getenv("MONGO_URI");

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to the database!"))
  .catch((err) => {
    console.error(`Can't connect to the database!`);
    console.error(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Express");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
