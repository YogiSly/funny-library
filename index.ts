import express from "express";
import { booksRouter } from "./src/routes/books.js";
import { userRouter } from "./src/routes/user.js";
import { indexRouter } from "./src/routes/index.js";
import { publicRouter } from "./src/routes/public.js";
import mongoose from "mongoose";
import process from "node:process";

const app = express();

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/user", userRouter);
app.use("/public", publicRouter);

const UrlDB = "mongodb://mongo:27017/mydb";
const PORT = process.env.PORT || 3095;

async function start(PORT, UrlDB) {
  try {
    await mongoose.connect(UrlDB);
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

start(PORT, UrlDB);
