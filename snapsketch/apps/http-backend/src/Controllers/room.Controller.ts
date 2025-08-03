import {
  CreateRoomSchema,
  SearchRoomSchema,
  SlugCheckSchema,
} from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { Request, Response } from "express";

export const createRoomController = async (req: Request, res: Response) => {
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
};

export const getRoomcontroller = async (req: Request, res: Response) => {
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
        creatorId: userid,
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "room not exist",
      });
    }

    const messages = await prisma.shapes.findMany({
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
};

export const deleteRoomcontroller = async (req: Request, res: Response) => {
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
        creatorId: userid,
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "room not exist",
      });
    }

    await prisma.shapes.deleteMany({
      where: {
        roomId: roomID,
      },
    });

    await prisma.room.delete({
      where: {
        id: roomID,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Deletion successfull",
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

export const searchRoomController = async (req: Request, res: Response) => {
  const userid = req.userid;
  const parsedBody = SearchRoomSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: parsedBody.error,
    });
    return;
  }

  const { roomname } = parsedBody.data;

  if (!userid) {
    res.status(401).json({
      success: false,
      message: "User id not found",
    });
  }

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

    const result = await prisma.room.findMany({
      where: {
        roomname: {
          contains: roomname,
          mode: "insensitive",
        },
      },
    });

    return res.status(200).json({
      success: true,
      result,
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

export const slugController = async (req: Request, res: Response) => {
  const userid = req.userid;
  const parsedBody = SlugCheckSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      success: false,
      message: parsedBody.error,
    });
    return;
  }

  const { roomId, slug } = parsedBody.data;

  if (!userid) {
    res.status(401).json({
      success: false,
      message: "User id not found",
    });
  }

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

    const result = await prisma.room.findUnique({
      where: {
        id: roomId,
        slug: slug,
      },
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wrong Slug",
      });
    }

    return res.status(200).json({
      success: true,
      result,
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
