import { signinSchema, signupSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, RESEND_API_KEY } from "@repo/backend-common/config";
import { Request, Response } from "express";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";

const resend = new Resend(RESEND_API_KEY?.toString());

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

    const imageupload = await cloudinary.uploader.upload(req.body.profilepic, {
      resource_type: "image",
    });

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        profilepic: imageupload.url,
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

    await resend.emails.send({
      from: "SnapSketch <onboarding@resend.dev>",
      to: newUser.email,
      subject: "<strong>Registartion successfull!!</strong>",
      text: "Welcome to the Snapsketch tour journey in the limitless world of art starts today!!",
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

export const signinController = async (req: Request, res: Response) => {
  const parsedBody = signinSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: "Not valid input",
    });
    return;
  }

  const { email, password } = parsedBody.data;

  try {
    const exist = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!exist) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const decrypted = await bcrypt.compare(password, exist.password);

    if (!decrypted) {
      res.status(409).json({
        success: false,
        message: "Email or password is wrong",
      });
      return;
    }

    let token = jwt.sign({ id: exist.id.toString() }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfull",
      token,
    });
    return;
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export const ProfileController = async (req: Request, res: Response) => {
  const userid = req.userid;
  if (!userid) {
    return res.status(400).json({
      success: false,
      message: "Id not found",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(400).json({
      success: true,
      userinfo: {
        username: user.name,
        email: user.email,
        id: user.id,
        dp: user.profilepic,
      },
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
