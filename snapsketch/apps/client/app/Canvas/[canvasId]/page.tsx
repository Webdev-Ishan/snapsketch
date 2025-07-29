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
      <div className="w-full mt-4 mb-4 p-6 flex justify-center gap-4 items-center">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Rectangle
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Circle
        </button>
      </div>
      <canvas ref={canvasref} width={1100} height={1100}></canvas>
    </div>
  );
}
