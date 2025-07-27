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
    let parsedData: any;
    try {
      parsedData = JSON.parse(data.toString());
    } catch (e) {
      console.error("Invalid JSON received:", data.toString());
      return;
    }

    if (parsedData.type === "join_room") {
      currentUser.rooms.push(parsedData.roomID);
    }

    if (parsedData.type === "leave_room") {
      currentUser.rooms = currentUser.rooms.filter(
        (x) => x !== parsedData.roomID
      );
    }

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomID;
      const message = parsedData.message;

      await prisma.messages.create({
        data: {
          roomId: roomId,
          message: message,
          senderId: currentUser.userID,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
        }
      });
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
