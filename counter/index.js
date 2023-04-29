import express from 'express';
import { indexRouter } from "./routes/index.js";

const app = express();

app.use('/counter', indexRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT);