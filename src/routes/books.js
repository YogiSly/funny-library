import express from "express";
import { stor } from "../storage/books.js";
import { fileStor } from "../middleware/file.js";
import path from "node:path";
import Books from "../books/books.js";
import { container } from "../container.js";
import { BooksRepository } from "../books/BooksRepository.js";

console.log("Books", Books);

export const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const service = container.get(BooksRepository);
    const books = await service.find().select("-__v");
    res.render("../src/views/books/index.ejs", {
      title: "Books",
      books: books,
    });
  } catch (error) {
    res.redirect("/404");
  }
});

booksRouter.get("/create", (req, res) => {
  const { books } = stor;
  res.render("../src/views/books/create.ejs", {
    title: "Books | create",
    books: books,
  });
});

booksRouter.post(
  "/create",
  fileStor.fields([
    { name: "fileCover", maxCount: 1 },
    { name: "fileBook", maxCount: 1 },
  ]),
  async (req, res) => {
    const { title, description, authors, favorite, fileName } = req.body;
    const fileCover = path.join("..", req.files["fileCover"][0]?.path);
    const fileBook = path.join("..", req.files["fileBook"][0]?.path);
    const newBooks = new Books({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });
    try {
      await newBooks.save();
      res.redirect("/books");
    } catch (error) {
      res.redirect("/404");
    }
  }
);

booksRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const books = await Books.findById({ _id: id }).select("-__v");
    console.log(books, id);
    res.render("../src/views/books/view.ejs", {
      title: "Books | view",
      books: books,
    });
  } catch (error) {
    res.redirect("/404");
  }
});

booksRouter.get(
  "/update/:id",

  async (req, res) => {
    const { id } = req.params;
    try {
      const books = await Books.findById({ _id: id }).select("-__v");
      res.render("../src/views/books/update.ejs", {
        title: "Books | view",
        books: books,
      });
    } catch (error) {
      res.redirect("/404");
    }
  }
);

booksRouter.post(
  "/update/:id",
  fileStor.fields([
    { name: "fileCover", maxCount: 1 },
    { name: "fileBook", maxCount: 1 },
  ]),
  async (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    } = req.body;
    try {
      await Books.findByIdAndUpdate(
        { _id: id },
        { title, description, authors, favorite, fileCover, fileName, fileBook }
      );
      res.redirect(`/books/${id}`);
    } catch (e) {
      res.redirect("/404");
    }
  }
);

booksRouter.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Books.deleteOne({ _id: id });
    res.redirect(`/books`);
  } catch (e) {
    res.redirect("/404");
  }
});
