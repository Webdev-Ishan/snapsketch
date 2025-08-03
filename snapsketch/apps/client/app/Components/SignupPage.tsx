"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
type backendresponse = {
  success: boolean;
  message: string;
  token: string;
};

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignupPage() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  useEffect(() => {
     const token = localStorage.getItem("token");
     const expireTime = Number(localStorage.getItem("expireTime"));
     if (!token || Date.now() > expireTime) {
       localStorage.removeItem("token");
       localStorage.removeItem("expireTime");
       router.push("/Signin");
     } else {
       router.push("/Profile")
     }
   }, [token, router]);

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [DP, setDP] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", username);
    formdata.append("email", email);
    formdata.append("password", password);
    if (DP) {
      formdata.append("profilepic", DP);
    }

    try {
      const response = await axios.post<backendresponse>(
        `${URL}/api/auth/signup`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Explicitly set Content-Type
          },
        }
      );

      if (response.data && response.data.success) {
        const now = new Date().getTime();
        const expireTime = (now + 86400000).toString();
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expireTime", expireTime);
        toast.success("Registration Successfull!");
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 400) {
          toast.error("Invalid Inputs");
        } else if (status === 409) {
          toast.error("User already exists");
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
      setusername("");
      setemail("");
      setpassword("");
      setDP(null);
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
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SnapSketch
            </span>
          </div>

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
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              SnapSketch
            </span>
          </div>

          {/* Form Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-gray-400">Start your creative journey today</p>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    value={password}
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              {/* Profile pic */}

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  ProfliePic
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    id="DP"
                    accept="image/*"
                    name="profilepic" // This must match the backend field name
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDP(e.target.files[0]);
                      }
                    }}
                    className="w-full pl-10 pr-12 py-3 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              {/* Terms and Privacy */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 w-4 h-4 text-purple-600 bg-transparent border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span>Create Account</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href={"/Signin"}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Protected by enterprise-grade encryption and security measures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
