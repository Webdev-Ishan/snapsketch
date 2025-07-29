import { CreateReviewSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const createReviewController = async (req: Request, res: Response) => {
  const parsedBody = CreateReviewSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: parsedBody.error,
    });
    return;
  }

  const { Title, message } = parsedBody.data;
  const userid = req.userid;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userid,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const existreview = await prisma.reviews.findFirst({
      where: {
        senderId: userid,
      },
    });

    if (existreview) {
      res.status(404).json({
        success: false,
        message: "Room already exist",
      });
      return;
    }

    const newRoom = await prisma.reviews.create({
      data: {
        Title,
        message,
        senderId: userid,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Review Successfull",
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

export const allReviewController = async (req: Request, res: Response) => {
  try {
    const allreview = await prisma.reviews.findMany({
      include: {
        sender: {
          select: {
            name: true,
            email: true,
            profilepic: true,
          },
        },
      },
    });

    

    return res.status(200).json({
      success: true,
      allreview,
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
