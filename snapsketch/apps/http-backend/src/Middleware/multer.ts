import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
