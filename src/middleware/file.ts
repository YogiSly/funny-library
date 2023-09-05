import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req: Request, file, cb) {
    cb(null, "src/public");
  },
  filename(req: Request, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

export const fileStor = multer({ storage });
