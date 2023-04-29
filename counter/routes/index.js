import express from "express";
import bodyParser from "body-parser";
import redis from "redis";

export const indexRouter = express.Router()
indexRouter.use(bodyParser.json())
indexRouter.use(bodyParser.urlencoded({ extended: true }));

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost'

const client = redis.createClient({url: REDIS_URL});
(async ()=> {
  await client.connect();
})()

indexRouter.post('/:bookId/incr', async (req, res) => {
  const bookId = req.body.data.id;
  try {
    const cnt = await client.incr(bookId);
    res.json({message: 'Successful',cnt:cnt})      
    } catch (error) {
      res.json({errcode: 500, errmsg: `Error: ${error}`})
    }
});

indexRouter.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId
  const cnt = await client.get(bookId)
  res.json(cnt)
});