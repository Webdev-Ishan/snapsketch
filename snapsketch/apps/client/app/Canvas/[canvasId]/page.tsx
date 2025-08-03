"use client";
import { initDraw } from "@/app/Drawlogic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Circle, Slash, Square, Triangle } from "lucide-react";
export default function Canvas() {
  const router = useRouter();
  const params = useParams();
  const canvasRef = useRef(null);

  const [token, setToken] = useState<string | null>(null);
  const [shape, setShape] = useState("Rectangle");
  const shapeRef = useRef("Rectangle");
  const roomID = params.canvasId as string;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expireTime = Number(localStorage.getItem("expireTime"));
    if (!token || Date.now() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      router.push("/Signin");
    } else {
      setToken(token);
    }
  }, [token, router]);

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
          className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <Square />
        </button>
        <button
          onClick={() => handleShapeChange("Circle")}
          className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <Circle className="text-white" />
        </button>
        <button
          onClick={() => handleShapeChange("Text")}
          className="text-white font-bold bg-blue-700 hover:bg-blue-900  rounded-lg text-sm px-5 py-2.5"
        >
          Aa
        </button>
        <button
          onClick={() => handleShapeChange("Line")}
          className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <Slash />
        </button>
        <button
          onClick={() => handleShapeChange("Triangle")}
          className="text-white bg-blue-700 hover:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <Triangle />
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
