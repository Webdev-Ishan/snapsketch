import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./Middleware/middleware.js";
import { signupSchema } from "@repo/common/types";
import { signinSchema } from "@repo/common/types";
import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import bcrypt, { genSalt } from "bcrypt";
import authRouter from "./Routes/auth.Routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);

app.post("/createRoom", middleware, async (req: Request, res: Response) => {
  const parsedBody = CreateRoomSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: parsedBody.error,
    });
    return;
  }

  const { roomname, slug } = parsedBody.data;
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

    const existroom = await prisma.room.findFirst({
      where: {
        creatorId: userid,
        roomname: roomname,
      },
    });

    if (existroom) {
      res.status(404).json({
        success: false,
        message: "Room already exist",
      });
      return;
    }

    const newRoom = await prisma.room.create({
      data: {
        roomname,
        slug,
        creatorId: userid,
      },
    });

    return res.status(200).json({
      success: true,
      newRoom,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
});

app.get(
  "/messages/:roomID",
  middleware,
  async (req: Request, res: Response) => {
    const roomID = req.params.roomID;
    const userid = req.userid;
    if (!roomID) {
      return res.status(400).json({
        success: false,
        message: "roomID not found",
      });
    }
    try {
      const room = await prisma.room.findUnique({
        where: {
          id: roomID,
        },
      });

      if (!room) {
        return res.status(404).json({
          success: false,
          message: "room not exist",
        });
      }

      const messages = await prisma.messages.findMany({
        where: {
          roomId: roomID,
        },
        include: {
          sender: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
        take: 50,
      });

      if (!messages) {
        return res.status(409).json({
          success: false,
          message: "Something went wrong",
        });
      }

      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }
  }
);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
