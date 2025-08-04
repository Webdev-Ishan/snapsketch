import { allShapes } from ".";
import { drawAllShapes } from "./drawallshapes";

export function zoomLogic(canvas: HTMLCanvasElement, zoom: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("❌ Cannot get canvas 2D context for zoom.");
    return;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  // Clear old drawing
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Actual zooming
  ctx.scale(zoom, zoom);

  drawAllShapes(ctx, canvas, allShapes, zoom);
}
