"use client";
import React, { useEffect, useState } from "react";
import { Mail, Edit3, Plus, Crown, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

const URL = process.env.NEXT_PUBLIC_API_URL;

type roomcreated = {
  id: string;
  roomname: string;
  slug: string;
  createdAt: string;
};

type backendresponse = {
  success: boolean;
  userinfo: {
    username: string;
    email: string;
    id: string;
    dp: string;
    rooms: roomcreated[];
  };
};

type backendresponse2 = {
  success: boolean;
  message: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [dp, setdp] = useState("");
  const [rooms, setrooms] = useState<roomcreated[]>([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  const [token, settoken] = useState<string | null>(null);

  useEffect(() => {
    const yourtoken = localStorage.getItem("token");
    const expireTime = Number(localStorage.getItem("expireTime"));

    if (!token || Date.now() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      router.push("/Signin");
    } else {
      settoken(yourtoken);
      fetchProfile(token);
    }
  }, [router,token]);

  const fetchProfile = async (token: string) => {
    try {
      const response = await axios.get<backendresponse>(
        `${URL}/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        const user = response.data.userinfo;
        setname(user.username);
        setemail(user.email);
        setdp(user.dp);
        setrooms(user.rooms);
      } else {
        seterror("Unable to fetch user data.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/Signin");
        } else {
          seterror(error.message || "Failed to fetch profile.");
          console.log(error);
        }
      } else {
        seterror("Unexpected error occurred.");
        console.log(error);
      }
    } finally {
      setloading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expireTime");
    router.push("/Signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p className="animate-pulse text-lg">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const handledelete = async (roomid: string) => {
    try {
      const response = await axios.delete<backendresponse2>(
        `${URL}/api/room/deleteRoom/${roomid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.success) {
        toast.success("Canvas is deleted");
        if (token) {
          fetchProfile(token);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          router.push("/Signin");
        } else {
          seterror(error.message || "Failed to fetch profile.");
          console.log(error);
        }
      } else {
        seterror("Unexpected error occurred.");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Profile Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* DP */}
              <div className="relative">
                <Image
                  src={dp}
                  alt={name}
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-purple-500/50 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                  <Crown className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {name}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-300 mb-4">
                      <Mail className="w-4 h-4" />
                      <span>{email}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4 md:mt-0">
                    <button className="backdrop-blur-sm bg-white/10 border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                      <Edit3 className="w-4 h-4" />
                      <span onClick={() => router.push("/EditProfile")}>
                        Edit Profile
                      </span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="backdrop-blur-sm bg-white/10 border border-white/20 px-4 py-3 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Create Room */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-left gap-6 mb-8">
            <button
              onClick={() => router.push("/Createcanvas")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New Canvas</span>
            </button>
            <button
              onClick={() => router.push("/Search")}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>

          {rooms.length === 0 ? (
            <p className="text-gray-400">You haven’t created any rooms yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room, idx) => (
                <div
                  key={idx}
                  className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
                >
                  {/* Room Info */}
                  <div
                    onClick={() => router.push(`/Canvas/${room.id}`)}
                    className="p-6"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
                      {room.roomname}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {room.slug}
                    </p>
                    <button
                      onClick={() => handledelete(room.id)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
