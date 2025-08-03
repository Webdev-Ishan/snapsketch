"use client";
import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
const URL = process.env.NEXT_PUBLIC_API_URL;

type room = {
  id: string;
  roomname: string;
};

type backendresponse = {
  success: boolean;
  message?: string;
  result?: room[];
};

export default function Searchpage() {
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

  const [rooms, setrooms] = useState<room[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<backendresponse>(
        `${URL}/api/room/findRoom`,
        { roomname: searchQuery },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.success) {
        if (response.data.result) {
          setrooms(response.data.result);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/Signin");
        } else {
          toast.error(error.message || "Failed to fetch Result.");
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
      <div className="w-full max-w-xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
            Search
          </h1>
          <p className="text-xl text-gray-300">Find what you are looking for</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative group">
            <Search
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors z-10"
              size={24}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your search here..."
              className="w-full bg-gray-900/50 backdrop-blur-sm border-2 border-gray-700 focus:border-blue-500 focus:bg-gray-900/70 rounded-2xl pl-16 pr-6 py-6 text-md transition-all duration-300 outline-none"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Search
          </button>
        </form>

        <section className="relative z-10 px-6 py-12">
          {rooms.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">No Rooms found.</p>
          ) : (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4">
              {rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="group bg-gray-900/60 border border-blue-500/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:border-blue-500 hover:scale-[1.03]"
                >
                  {/* Room Info */}
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-4">
                    {room.roomname}
                  </h3>

                  <button
                    onClick={() => router.push(`/SlugChecker/${room.id}`)}
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-light py-2.5 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]  px-2 focus:outline-none"
                  >
                    Visit Room
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
