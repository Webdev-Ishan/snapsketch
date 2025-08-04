"use client";
import React, { useEffect, useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
type backendresponse = {
  success: boolean;
  message: string;
};

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function CanvasPage() {
  const router = useRouter();
  const [token, settoken] = useState<string | null>("");

  useEffect(() => {
    const yourtoken = localStorage.getItem("token");
    const expireTime = Number(localStorage.getItem("expireTime"));
    if (!token || Date.now() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      router.push("/Signin");
    } else {
      settoken(yourtoken);
    }
  }, [router, token]);

  const [roomname, setroomname] = useState("");
  const [slug, setslug] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<backendresponse>(
        `${URL}/api/room/createRoom`,
        { roomname, slug },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.data && response.data.success) {
        toast.success("Canvas is ready!");
        router.push("/Profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 400) {
          toast.error("Invalid Inputs");
          console.log(error);
        } else if (status === 403) {
          toast.error("Please login first");
          localStorage.removeItem("token");
          router.push("/Signin");
          console.log(error);
        } else if (status === 500) {
          toast.error(error.message);
          console.log(error);
        }
      } else {
        if (error instanceof Error) {
          toast.error(error.message);
          console.log(error);
        }
      }
    } finally {
      setroomname("");
      setslug("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full  relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Create Canvas
              </h2>
              <p className="text-gray-400">Start your creative journey today</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* roomname Field */}
              <div>
                <label
                  htmlFor="roomname"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Room Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="roomname"
                    id="roomname"
                    name="roomname"
                    value={roomname}
                    onChange={(e) => setroomname(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your roomname"
                    required
                  />
                </div>
              </div>

              {/* slug Field */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Slug
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="slug"
                    name="slug"
                    value={slug}
                    type="text"
                    onChange={(e) => setslug(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create slug"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>Submit</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
