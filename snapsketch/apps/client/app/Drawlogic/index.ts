import {
  convertServerShapeToClient,
  creatCircle,
  createLine,
  createText,
  createTriangle,
  creatRectangle,
} from "../helpers/ws.helper";
import { drawAllShapes } from "./drawallshapes";
type Shapes =
  | {
      type: "Rectangle";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "Circle";
      x: number;
      y: number;
      radius: number;
    }
  | {
      type: "Text";
      message: string;
      x: number;
      y: number;
    }
  | {
      type: "Line";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "Triangle";
      x: number;
      y: number;
      x2: number;
      y2: number;
      width: number;
      height: number;
    };

let socket: WebSocket | null = null;
const URL = process.env.NEXT_PUBLIC_WS_URL!;
export const allShapes: Shapes[] = [];

export function initDraw(
  canvas: HTMLCanvasElement,
  shape: () => string,
  token: string,
  roomID: string,
  zoom:number
) {
  

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("❌ Cannot get canvas 2D context");
    return;
  }

  if (!socket) {
    socket = new WebSocket(`${URL}?token=${token}`);

    socket.onopen = () => {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "join_room",
            roomID: roomID,
          })
        );
      }
    };
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === "history") {
      data.shapes.forEach((shape: Shapes) => {
        allShapes.push(convertServerShapeToClient(shape));
      });
      drawAllShapes(ctx, canvas, allShapes,zoom);
    }

    if (data.type === "create") {
      allShapes.push(convertServerShapeToClient(data.message));
      drawAllShapes(ctx, canvas, allShapes,zoom);
    }
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
  };

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let clicked = false;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;

    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;

    const rect = canvas.getBoundingClientRect();
    endX = e.clientX - rect.left;
    endY = e.clientY - rect.top;

    const width = endX - startX;
    const height = endY - startY;

    if (shape() === "Rectangle") {
      creatRectangle(socket, roomID, startX, startY, width, height);
      allShapes.push({
        type: "Rectangle",
        x: startX,
        y: startY,
        width,
        height,
      });
    } else if (shape() === "Circle") {
      const radius = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );
      creatCircle(socket, roomID, startX, startY, radius);
      allShapes.push({
        type: "Circle",
        x: startX,
        y: startY,
        radius: radius,
      });
    } else if (shape() === "Text") {
      const message = prompt();
      const textX = startX;
      const textY = startY;

      createText(socket, roomID, message, textX, textY);

      allShapes.push({
        type: "Text",
        message: message ?? "",
        x: textX,
        y: textY,
      });
    } else if (shape() === "Line") {
      createLine(socket, roomID, startX, startY, endX, endY);
    } else if (shape() === "Triangle") {
      const sidelength = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
      );

      const height = (Math.sqrt(3) / 2) * sidelength;

      const x1 = startX;
      const y1 = startY;

      const x2 = startX - sidelength / 2;
      const y2 = startY + height;

      const x3 = startX + sidelength / 2;
      const y3 = startY + height;

      createTriangle(socket, roomID, x1, y1, x2, y2, x3, y3);
    }

    // drawAllShapes(ctx, canvas, allShapes);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    const width = currX - startX;
    const height = currY - startY;

    drawAllShapes(ctx, canvas, allShapes,zoom); // Clear and redraw everything

    ctx.strokeStyle = "blue";
    ctx.beginPath();

    if (shape() === "Rectangle") {
      ctx.strokeRect(startX, startY, width, height);
    } else if (shape() === "Circle") {
      const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (shape() === "Text") {
      ctx.font = "20px Arial";
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("", startX, startY);
    } else if (shape() === "Line") {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currX, currY); // ← use live current position here
      ctx.stroke();
    } else if (shape() === "Triangle") {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(currX, currY); // ← use live current position here
      ctx.lineTo(currX, currY); // ← use live current position here
      ctx.closePath();
      ctx.stroke();
    }
  });
}
