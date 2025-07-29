type Shapes =
  | {
      type: "rectangle";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export function initDraw(canvas: HTMLCanvasElement) {
  const allShapes: Shapes[] = [];
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

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

    allShapes.push({
      type: "rectangle",
      x: startX,
      y: startY,
      width,
      height,
    });

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
    ctx.strokeStyle = "blue";
    ctx.strokeRect(startX, startY, width, height);
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

    if (shape.type === "rectangle") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  });
}
