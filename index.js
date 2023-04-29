import express from 'express';
import { booksRouter } from "./src/routes/books.js";
import { userRouter } from "./src/routes/user.js";
import { indexRouter } from "./src/routes/index.js";
import { publicRouter } from "./src/routes/public.js";

const app = express();

app.use('/', indexRouter);
app.use('/books', booksRouter)
app.use('/user', userRouter)
app.use('/public', publicRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT);