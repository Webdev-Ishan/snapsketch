import { signupSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response } from "express";

export const signUpcontroller = async (req: Request, res: Response) => {
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

    let token = jwt.sign({ id: newUser.id.toString() }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Registration Successfull!!",
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};
