import {
  convertServerShapeToClient,
  creatCircle,
  createLine,
  createText,
  creatRectangle,
} from "../helpers/ws.helper";

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
    };

let socket: WebSocket | null = null;
const URL = process.env.NEXT_PUBLIC_WS_URL!;

export function initDraw(
  canvas: HTMLCanvasElement,
  shape: () => string,
  token: string,
  roomID: string
) {
  
  const allShapes: Shapes[] = [];
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
      drawAllShapes(ctx, canvas, allShapes);
    }

    if (data.type === "create") {
      allShapes.push(convertServerShapeToClient(data.message));
      drawAllShapes(ctx, canvas, allShapes);
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

    drawAllShapes(ctx, canvas, allShapes); // Clear and redraw everything

    ctx.strokeStyle = "blue";
    ctx.beginPath();

    if (shape() === "Rectangle") {
      ctx.strokeRect(startX, startY, width, height);
    } else if (shape() === "Circle") {
      const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
    } else if (shape() === "Text") {
      ctx.font = "30px Arial";
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
    }
  });

  function drawAllShapes(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    shapes: Shapes[]
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      ctx.beginPath();
      ctx.strokeStyle = "blue";

      if (shape.type === "Rectangle") {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "Circle") {
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (shape.type === "Text") {
        ctx.font = "30px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(shape.message, shape.x, shape.y);
      } else if (shape.type === "Line") {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y); // Start point
        ctx.lineTo(shape.width, shape.height); // End point
        ctx.stroke();
      }
    });
  }
}
