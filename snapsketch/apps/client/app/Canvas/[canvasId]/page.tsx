"use client";
import { initDraw } from "@/app/Drawlogic";
import React, { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasref.current) {
      initDraw(canvasref.current);
    }
  }, [canvasref]);

  return (
    <div>
      <canvas ref={canvasref} width={1100} height={1100}></canvas>
    </div>
  );
}
