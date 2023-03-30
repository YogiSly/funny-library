import express from 'express';
import { booksRouter } from "./routes/books.js";
import { userRouter } from "./routes/user.js";

const app = express();

app.use('/api/books', booksRouter)
app.use('/api/user', userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT);