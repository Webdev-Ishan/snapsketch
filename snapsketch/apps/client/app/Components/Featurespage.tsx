"use client";
import React from "react";
import {
  Users,
  Zap,
  DollarSign,
  Infinity,
  Shield,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle,
  Clock,
  Globe,
  Layers,
  Palette,
  Download,
  Cloud,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function FeaturesPage() {
  const router = useRouter();
  const mainFeatures = [
    {
      id: "collaboration",
      icon: <Users className="w-12 h-12" />,
      title: "Real-Time Collaboration",
      subtitle: "Work together seamlessly",
      description:
        "Experience true real-time collaboration with live cursors, instant updates, and synchronized editing. See your team's changes as they happen, with zero lag and perfect synchronization.",
      gradient: "from-blue-600 to-purple-600",
      features: [
        "Live cursors and user presence",
        "Instant synchronization across all devices",
        "Voice and video chat integration",
        "Comment and annotation system",
        "Version history and conflict resolution",
        "Multi-user selection and editing",
      ],
      demoImage:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "teamwork",
      icon: <Zap className="w-12 h-12" />,
      title: "Advanced Team-Work",
      subtitle: "Supercharge your team productivity",
      description:
        "Built-in tools and workflows designed specifically for teams. From project management to role-based permissions, everything you need to work efficiently together.",
      gradient: "from-purple-600 to-pink-600",
      features: [
        "Role-based access control",
        "Team templates and libraries",
        "Project organization and folders",
        "Activity feeds and notifications",
        "Integration with popular tools",
        "Advanced sharing permissions",
      ],
      demoImage:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "affordable",
      icon: <DollarSign className="w-12 h-12" />,
      title: "Affordable Premium",
      subtitle: "Enterprise features at startup prices",
      description:
        "Get access to professional-grade features without breaking the bank. Our pricing is designed to scale with your team, from solo creators to large enterprises.",
      gradient: "from-green-600 to-teal-600",
      features: [
        "Transparent, predictable pricing",
        "No hidden fees or surprise charges",
        "Free tier with generous limits",
        "Educational and non-profit discounts",
        "Flexible billing options",
        "Cancel anytime, no contracts",
      ],
      demoImage:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "infinite",
      icon: <Infinity className="w-12 h-12" />,
      title: "Infinite Canvas",
      subtitle: "Limitless creative space",
      description:
        "Break free from traditional constraints with our infinite canvas. Zoom, pan, and create without boundaries. Your imagination is the only limit.",
      gradient: "from-orange-600 to-red-600",
      features: [
        "Unlimited canvas size",
        "Smooth zooming and panning",
        "Performance optimized for large projects",
        "Smart viewport management",
        "Minimap navigation",
        "Infinite undo/redo history",
      ],
      demoImage:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: "encryption",
      icon: <Shield className="w-12 h-12" />,
      title: "Enterprise Level Encryption",
      subtitle: "Bank-grade security for your data",
      description:
        "Your data is protected with military-grade encryption, both in transit and at rest. SOC 2 compliant with enterprise-level security controls and monitoring.",
      gradient: "from-cyan-600 to-blue-600",
      features: [
        "End-to-end encryption",
        "SOC 2 Type II compliance",
        "GDPR and CCPA compliant",
        "Regular security audits",
        "Single Sign-On (SSO) support",
        "Advanced threat protection",
      ],
      demoImage:
        "https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Advanced Drawing Tools",
      description: "Professional-grade brushes, shapes, and design tools",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Export Anywhere",
      description: "Export to PNG, SVG, PDF, or share with custom links",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Sync",
      description: "Access your work from anywhere with automatic sync",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Smart Layers",
      description: "Organize complex projects with intelligent layering",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global CDN",
      description: "Lightning-fast performance worldwide",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Version History",
      description: "Never lose work with comprehensive version control",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-18">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Powerful Features
            <br />
            Built for Teams
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover the advanced capabilities that make SnapSketch the ultimate
            choice for creative professionals and teams worldwide.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-32">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-16`}
            >
              {/* Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {feature.title}
                  </h2>
                  <p className="text-xl text-purple-400 font-semibold">
                    {feature.subtitle}
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                    {feature.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {feature.features.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Try This Feature</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <div className="relative">
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="aspect-video bg-gray-800/50 rounded-xl overflow-hidden relative">
                      <img
                        width={400}
                        height={400}
                        src={feature.demoImage}
                        alt={feature.title}
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="backdrop-blur-sm bg-white/10 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-300">
                              Live Demo
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {feature.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 backdrop-blur-sm bg-purple-500/20 rounded-full p-3">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              And Much More
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover additional features that make NeoCanvas the complete
              solution for your creative workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <p className="text-gray-300">Uptime</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <p className="text-gray-300">Active Users</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  1M+
                </div>
                <p className="text-gray-300">Canvases Created</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  24/7
                </div>
                <p className="text-gray-300">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Experience All Features
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to unlock the full potential of collaborative canvas
              creation? Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/Signup")}
                className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group backdrop-blur-sm bg-white/10 border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Ask From Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
