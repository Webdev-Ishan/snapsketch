"use client"
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Navbar() {
  const router = useRouter();
  return (
    <div>
    <nav className="relative z-10 px-6 py-4 bg-black backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span onClick={()=>router.push("/")} className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            SnapSketch
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
          onClick={() => router.push("/Features")}
            
            className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent transition-colors hover:text-pink-400"
          >
            Features
          </a>
          <a
            onClick={() => router.push("/Profile")}
            className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent transition-colors hover:text-pink-400"
          >
            Profile
          </a>
          <a
            onClick={() => router.push("/Pricing")}
    
            className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent transition-colors hover:text-pink-400"
          >
            Pricing
          </a>
          <button className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
            Start Creating
          </button>
        </div>
      </div>
    </nav>
    </div>
  );
}
