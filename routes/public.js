import express from "express";
import path from "node:path";
import { URL } from 'url';

export const publicRouter = express.Router();

publicRouter.get('/:filename', (req, res) => {
  const __dirname = new URL('..', import.meta.url).pathname;
  const filename = req.params.filename;
  const file = path.join(__dirname.slice(1), 'public', filename);
  res.sendFile(file);
});
