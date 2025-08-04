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

export function drawAllShapes(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  shapes: Shapes[],
  zoom: number
) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  ctx.scale(zoom, zoom); // Apply zoom

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
    } else if (shape.type === "Triangle") {
      ctx.beginPath(); // Start a new path
      ctx.moveTo(shape.x, shape.y); // Move to the first vertex
      ctx.lineTo(shape.x2, shape.y2); // Draw a line to the second vertex
      ctx.lineTo(shape.width, shape.height); // Draw a line to the third vertex
      ctx.closePath(); // Close the path (draws a line back to the starting point)
      ctx.stroke();
    }
  });
}
