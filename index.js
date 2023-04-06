import express from 'express';
import { booksRouter } from "./routes/books.js";
import { userRouter } from "./routes/user.js";
import { indexRouter } from "./routes/index.js";
import { publicRouter } from "./routes/public.js";

const app = express();

app.use('/', indexRouter);
app.use('/books', booksRouter)
app.use('/user', userRouter)
app.use('/public', publicRouter)
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT);