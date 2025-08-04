"use client";
import React, { useEffect, useState } from "react";
import { Mail, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
type backendresponse = {
  success: boolean;
  message: string;
};

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function EnquiryPage() {
  const router = useRouter();
  const [token, settoken] = useState<string | null>(null);

  useEffect(() => {
    const yourtoken = localStorage.getItem("token");
    settoken(yourtoken);
  }, [token]);

  const [Title, setTitle] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post<backendresponse>(
        `${URL}/api/enquiry/ask`,
        { Title, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.data && response.data.success) {
        toast.success("Question Submitted!");
        router.push("/");
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
      setTitle("");
      setmessage("");
    }
  };

  const benefits = [
    "Unlimited canvases and projects",
    "Real-time collaboration with teams",
    "Advanced drawing and design tools",
    "Export to multiple formats",
    "Cloud sync across all devices",
    "Priority customer support",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Left Side - Branding & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center px-12">
        <div className="max-w-md">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Create Without
            <br />
            Limits
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of creators and teams who trust NeoCanvas for their
            most important projects.
          </p>

          {/* Benefits List */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Let US Help You
              </h2>
              <p className="text-gray-400">Start your creative journey today</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div>
                <label
                  htmlFor="Title"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="Title"
                    id="Title"
                    name="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your Title"
                    required
                  />
                </div>
              </div>

              {/* message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="message"
                    name="message"
                    value={message}
                    type="text"
                    onChange={(e) => setmessage(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create message"
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
