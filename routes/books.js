import express from "express";
import { stor } from "../storage/books.js";
import { Book } from "../classes/book.js";
import bodyParser from "body-parser";
import { error404 } from "../middleware/err-404.js";
import { fileStor } from "../middleware/file.js";

export const booksRouter = express.Router()
booksRouter.use(bodyParser.json())

booksRouter.get('/', (req, res) => {
  const { books } = stor;
  res.json(books);
})
booksRouter.get('/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    error404(req, res)
  }
})
booksRouter.post('/', fileStor.single('img-upload'), (req, res) => {
  const { books } = stor;
  const { title, description, authors, favorite, fileCover } = req.body
  const fileName = req.file.filename
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
});
booksRouter.put('/:id', (req, res) => {
  const { books } = stor;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    books[id] = {
      ...books[idx], title, description, authors, favorite, fileCover, fileName
    }
    res.json(books[id])
  } else {
    error404(req, res)
  }
});
booksRouter.delete('/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx !== -1) {
    books.splice(idx, 1)
    res.json({ status: 200, msg: "ok" })
  } else {
    error404(req, res)
  }
});

