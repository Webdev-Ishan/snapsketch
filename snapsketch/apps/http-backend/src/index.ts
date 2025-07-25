import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { signupSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req: Request, res: Response) => {
  const parsedBody = signupSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.json({
      message: "Not valid input",
    });
    return;
  }
  return res.json({
    userId: "123",
  });
});

app.post("/signin", (req: Request, res: Response) => {
  const token = jwt.sign("123", JWT_SECRET);
  return res.json({
    token,
  });
});

app.post("/createRoom", middleware, (req: Request, res: Response) => {
  return res.json({
    roomID: "123",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
