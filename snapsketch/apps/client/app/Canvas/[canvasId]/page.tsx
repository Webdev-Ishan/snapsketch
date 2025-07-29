"use client";
import React, { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      let startX = 0;
      let startY = 0;
      let clicked = false;

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientX;
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientX;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.strokeStyle = "blue";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(startX, startY, width, height);
          }
        }
      });
    }
  }, [canvasref]);
  return (
    <div>
      <canvas ref={canvasref} width={1200} height={500}></canvas>
    </div>
  );
}
