"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
const URL = process.env.NEXT_PUBLIC_API_URL;

type backendresponse = {
  success: boolean;
  message?: string;
  result?: {
    id: string;
    roomname: string;
    slug: string;
  };
};

export default function SlugChecker() {
  const router = useRouter();
  const [token, settoken] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expireTime = Number(localStorage.getItem("expireTime"));

    if (!token || Date.now() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      router.push("/Signin");
    } else {
      settoken(token);
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const params = useParams();
  const roomId = params.roomId as string;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<backendresponse>(
        `${URL}/api/room/slugCheck`,
        { slug: searchQuery, roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        if (response.data.result) {
          toast.info("Valid Slug");
          router.push(`/Canvas/${roomId}`);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/Signin");
        } else {
          toast.error(error.message || "Failed to match the Slug.");
          console.log(error);
        }
      } else {
        toast.error("Unexpected error occurred.");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Search
          </h1>
          <p className="text-xl text-gray-300">
            Confirm the Authorization by providing the Slug
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <Search
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-pink-400 transition-colors z-10"
              size={24}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your slug here..."
              className="w-full bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 focus:border-pink-500 focus:bg-gray-900/70 rounded-2xl pl-16 pr-6 py-6 text-lg transition-all duration-300 outline-none"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
