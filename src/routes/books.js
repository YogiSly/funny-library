import express from "express";
import { stor } from "../storage/books.js";
import { Book } from "../classes/book.js";
import bodyParser from "body-parser";
import { fileStor } from "../middleware/file.js";
import path from "node:path";
import axios from "axios";

export const booksRouter = express.Router()
booksRouter.use(bodyParser.json())
booksRouter.use(bodyParser.urlencoded({ extended: true }));

booksRouter.get('/', (req, res) => {
  const { books } = stor;
  res.render("../src/views/books/index.ejs", {
    title: "Books",
    books: books
  })
})

booksRouter.get('/create', (req, res) => {
  const { books } = stor;
  res.render("../src/views/books/create.ejs", {
    title: "Books | create",
    books: books,
  });
});

booksRouter.post('/create', fileStor.fields([{ name: 'fileCover', maxCount: 1 }, { name: 'fileBook', maxCount: 1 }])
  , (req, res) => {
    const { books } = stor;
    const { title, description, authors, favorite, fileName } = req.body;
    const fileCover = path.join('..', req.files['fileCover'][0]?.path)
    const fileBook = path.join('..', req.files['fileBook'][0]?.path)
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);
    res.redirect('/books')
  });

booksRouter.get('/:id', async (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx === -1) {
    res.redirect('/404');
  }
  await axios.post(`http://counter:3001/counter/${id}/incr`,{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      data:{
      id
      }
    });
  await axios.get(`http://counter:3001/counter/${id}`)
  .then((resp)=>{
    books[idx].views = resp.data;
    return resp.data
  })
  res.render("../src/views/books/view.ejs", {
    title: "Books | view",
    books: books[idx],
  });
})

booksRouter.get('/update/:id',  (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx === -1) {
    res.redirect('/404');
  }
  res.render("../src/views/books/update.ejs", {
    title: "Books | view",
    books: books[idx],
  });
});

booksRouter.post('/update/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName, fileBook } = req.body;
  const idx = books.findIndex(el => el.id === id);
  if (idx === -1) {
    res.redirect('/404');
  }
  books[idx] = {
    ...books[idx],
    title, description, authors, favorite, fileCover, fileName, fileBook
  };
  res.redirect(`/books/${id}`);
});


booksRouter.post('/delete/:id', (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex(el => el.id === id);
  if (idx === -1) {
    res.redirect('/404');
  }
  books.splice(idx, 1);
  res.redirect(`/books`);
});