import express from "express";
import { booksRouter } from "./src/routes/books";
import { userRouter } from "./src/routes/user";
import { indexRouter } from "./src/routes/index";
import { publicRouter } from "./src/routes/public";
import mongoose from "mongoose";
import process from "node:process";

const app = express();

app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/user", userRouter);
app.use("/public", publicRouter);

const UrlDB = "mongodb://mongo:27017/mydb";
const PORT = process.env.PORT || 3095;

async function start(PORT: any, UrlDB: any) {
  try {
    await mongoose.connect(UrlDB);
    app.listen(PORT);
  } catch (e) {
    console.log(e);
  }
}

start(PORT, UrlDB);
