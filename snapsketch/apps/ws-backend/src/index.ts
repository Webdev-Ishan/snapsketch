import { WebSocketServer } from "ws";
import { JWT_SECRET } from "@repo/backend-common/config";
import { checkUser } from "./utils/checkuser.js";
import WebSocket from "ws";
import { prisma } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8000 });

type User = {
  userID: string;
  ws: WebSocket;
  rooms: string[];
};

type wsinterface = {
  type: "join_room" | "leave_room" | "create";
  roomID: string;
  message?: {
    type: "Rectangle" | "Circle";
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
  };
};

const users: User[] = [];

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);

  const url = request.url;
  if (!url) {
    ws.close();
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";

  const decode = checkUser(token);

  if (!decode || typeof decode !== "string") {
    ws.close();
    return;
  }

  const currentUser: User = {
    rooms: [],
    userID: decode,
    ws: ws,
  };

  users.push(currentUser);

  ws.on("message", async function message(data) {
    let parsedData: wsinterface;
    try {
      parsedData = JSON.parse(data.toString()) as wsinterface;
    } catch (e) {
      console.error("Invalid JSON received:", data.toString());
      return;
    }

    if (parsedData.type === "join_room") {
      if (currentUser.rooms.includes(parsedData.roomID)) {
        ws.send(JSON.stringify({ error: "Already in room" }));
        return;
      }
      currentUser.rooms.push(parsedData.roomID);
      const shapes = await prisma.shapes.findMany({
        where: {
          roomId: parsedData.roomID,
        },
      });
      ws.send(
        JSON.stringify({
          type: "history",
          shapes,
        })
      );
    }

    if (parsedData.type === "leave_room") {
      currentUser.rooms = currentUser.rooms.filter(
        (x) => x !== parsedData.roomID
      );
    }

    if (parsedData.type === "create") {
      if (!currentUser.rooms.includes(parsedData.roomID)) {
        ws.send(JSON.stringify({ error: "Not in room" }));
        return;
      }
      if (parsedData.message) {
        const roomId = parsedData.roomID;
        const type = parsedData.message.type;
        const x = parsedData.message.x;
        const y = parsedData.message.y;
        let width;
        let height;
        let radius;
        if (parsedData.message.width) {
          width = parsedData.message.width;
        }

        if (parsedData.message.height) {
          height = parsedData.message.height;
        }

        if (parsedData.message.radius) {
          radius = parsedData.message.radius;
        }

        await prisma.shapes.create({
          data: {
            roomId: roomId,
            type: type,
            x: x,
            y: y,
            width: width,
            height: height,
            radius: radius,
            senderId: currentUser.userID,
          },
        });

        users.forEach((user) => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(
              JSON.stringify({
                type: "create",
                message: parsedData.message,
                roomId,
              })
            );
          }
        });
      }
    }
  });

  ws.on("close", () => {
    // Remove user on disconnect
    const index = users.findIndex((u) => u.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
