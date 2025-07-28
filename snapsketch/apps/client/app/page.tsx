"use client";
import React, { useState, useEffect } from "react";
import {
  Zap,
  Palette,
  Users,
  Layers,
  Download,
  Share2,
  ArrowRight,
  Play,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Real-time collaboration with zero latency. Draw, edit, and share instantly.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Infinite Canvas",
      description:
        "Unlimited space for your creativity. Zoom, pan, and create without boundaries.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with live cursors and real-time updates.",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Smart Layers",
      description:
        "Organize your work with intelligent layer management and grouping.",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Export Anywhere",
      description:
        "Export to PNG, SVG, PDF, or share directly with custom links.",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Instant Sharing",
      description:
        "Share your creations with a single click. Anywhere and anytime.",
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              The Future of
              <br />
              Digital Creation
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the next generation of collaborative canvas tools.
              Create, collaborate, and share your ideas with unprecedented speed
              and precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group backdrop-blur-sm bg-white/10 border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Canvas Preview */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Glassmorphism Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="bg-gray-800/50 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
                {/* Simulated Canvas Interface */}
                <div className="absolute inset-4 border-2 border-dashed border-gray-600 rounded-lg"></div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">
                    Interactive Canvas
                  </h3>
                  <p className="text-gray-400">
                    Start drawing to see the magic happen
                  </p>
                </div>

                {/* Floating UI Elements */}
                <div className="absolute top-4 left-4 backdrop-blur-sm bg-white/10 rounded-lg px-3 py-2 text-sm">
                  Toolbar
                </div>
                <div className="absolute top-4 right-4 backdrop-blur-sm bg-white/10 rounded-lg px-3 py-2 text-sm flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>3 users online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to bring your ideas to life, packed into a
              beautiful and intuitive interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Create?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using SnapSketch to
              bring their ideas to life.
            </p>
            <button
              onClick={() => router.push("/Signup")}
              className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-12 py-4 rounded-xl text-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
