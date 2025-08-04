"use client";
import { initDraw } from "@/app/Drawlogic";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Circle, Slash, Square, Triangle, Plus, Minus } from "lucide-react";
import { zoomLogic } from "@/app/Drawlogic/zoomLogic";
export default function Canvas() {
  const router = useRouter();
  const params = useParams();
  const canvasRef = useRef(null);

  const [token, setToken] = useState<string | null>(null);
  const [shape, setShape] = useState("Rectangle");
  const shapeRef = useRef("Rectangle");
  const [zoom, setZoom] = useState(1);
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

  const handleZoomChange = () => {
    if (zoom < 5) {
      setZoom((prev) => Math.min(prev + 0.25, 5));
      if (canvasRef.current && roomID && token) {
        zoomLogic(canvasRef.current, zoom);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current && roomID && token) {
      initDraw(canvasRef.current, () => shapeRef.current, token, roomID, zoom);
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
        <button
          onClick={() => handleZoomChange()}
          className="text-white ml-12 bg-transparent border-white hover:border-green-400  font-extralight rounded-lg text-sm px-5 py-2.5 border-1"
        >
          <Plus />
        </button>
        {/* <button
          onClick={() => handleZoomChange()}
          className="text-white   bg-transparent border-white hover:border-green-400  font-extralight rounded-lg text-sm px-5 py-2.5 border-1"
        >
          <Minus />
        </button> */}
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
