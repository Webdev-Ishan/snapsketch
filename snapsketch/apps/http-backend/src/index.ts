import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import  {JWT_SECRET}  from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import { signupSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt, { genSalt } from "bcrypt";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req: Request, res: Response) => {
  const parsedBody = signupSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: "Not valid input",
    });
    return;
  }

  const { name, email, password } = parsedBody.data;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return res.status(403).json({
        success: false,
        message: "something wnet wrong",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration Successfull!!",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
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
