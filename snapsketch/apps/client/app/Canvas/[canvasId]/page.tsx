"use client";
import { initDraw } from "@/app/Drawlogic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Canvas() {
  const router = useRouter();
  const params = useParams();
  const canvasRef = useRef(null);

  const [token, setToken] = useState<string | null>(null);
  const [shape, setShape] = useState("Rectangle");
  const shapeRef = useRef("Rectangle");
  const roomID = params.canvasId as string;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);
  }, [roomID, router]);

  const handleShapeChange = (newShape: string) => {
    shapeRef.current = newShape;
    setShape(newShape); // only for button UI update
  };

  useEffect(() => {
    if (canvasRef.current && roomID && token) {
      initDraw(canvasRef.current, () => shapeRef.current, token, roomID);
    }
  }, [canvasRef, roomID, token]);

  return (
    <div>
      <div className="w-full mt-4 mb-4 p-6 flex justify-center gap-4 items-center">
        <button
          onClick={() => handleShapeChange("Rectangle")}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Rectangle
        </button>
        <button
          onClick={() => handleShapeChange("Circle")}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Circle
        </button>
      </div>

      <div className="p-4">
        <canvas
          className="p-8 border border-gray-400"
          ref={canvasRef}
          width={1100}
          height={1100}
        ></canvas>
      </div>
    </div>
  );
}
