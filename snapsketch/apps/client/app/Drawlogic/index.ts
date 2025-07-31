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
      centerX: number;
      centerY: number;
      radius: number;
    };

let socket: WebSocket | null = null;
const URL = process.env.NEXT_PUBLIC_WS_URL!;
export function initDraw(canvas: HTMLCanvasElement, shape: string) {
  const allShapes: Shapes[] = [];
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (!socket) {
    socket = new WebSocket(URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };
  }

  let startX = 0;
  let startY = 0;
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
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const width = endX - startX;
    const height = endY - startY;

    if (shape === "Rectangle") {
      allShapes.push({
        type: "Rectangle",
        x: startX,
        y: startY,
        width,
        height,
      });
    } else {
      allShapes.push({
        type: "Circle",
        centerX: startX,
        centerY: startY,
        radius: endX,
      });
    }
    drawAllShapes(ctx, canvas, allShapes);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const rect = canvas.getBoundingClientRect();
    const currX = e.clientX - rect.left;
    const currY = e.clientY - rect.top;

    const width = currX - startX;
    const height = currY - startY;

    drawAllShapes(ctx, canvas, allShapes);

    // Draw current rectangle
    if (shape === "Rectangle") {
      ctx.strokeStyle = "blue";
      ctx.strokeRect(startX, startY, width, height);
    } else {
      ctx.strokeStyle = "blue";
      ctx.arc(startX, startY, currX, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });
}

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
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });
}
