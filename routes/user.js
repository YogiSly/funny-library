import express from "express";
import { stor } from "../storage/user.js";

export const userRouter = express.Router()

userRouter.get('/login', (req, res) => {
  const { user } = stor;
  res.json(user);
})