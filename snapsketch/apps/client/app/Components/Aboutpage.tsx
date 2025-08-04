"use client";
import React from "react";
import {
  Users,
  Target,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "2021", label: "Founded" },
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Sketches Created" },
    { number: "150+", label: "Countries" },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description:
        "We constantly push the boundaries of what's possible in digital creativity, bringing cutting-edge technology to artists and teams worldwide.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Our users are at the heart of everything we do. We listen, learn, and build features that truly matter to creative professionals.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy & Security",
      description:
        "Your creative work deserves the highest level of protection. We implement enterprise-grade security without compromising usability.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Accessibility",
      description:
        "Great ideas come from everywhere. We're committed to making SnapSketch accessible to creators across all cultures and abilities.",
    },
  ];

  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      bio: "Former design lead at major tech companies, passionate about democratizing creative tools.",
      image:
        "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Sarah Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Full-stack engineer with expertise in real-time collaboration and scalable systems.",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Marcus Johnson",
      role: "Head of Design",
      bio: "Award-winning designer focused on creating intuitive and beautiful user experiences.",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Emma Thompson",
      role: "VP of Engineering",
      bio: "Infrastructure expert ensuring SnapSketch scales seamlessly for millions of users.",
      image:
        "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const milestones = [
    {
      year: "2021",
      title: "The Beginning",
      description:
        "SnapSketch was founded with a vision to revolutionize digital sketching and collaboration.",
    },
    {
      year: "2022",
      title: "First 10K Users",
      description:
        "Reached our first major milestone with 10,000 active users and launched real-time collaboration.",
    },
    {
      year: "2023",
      title: "Enterprise Launch",
      description:
        "Introduced enterprise features and security, serving Fortune 500 companies worldwide.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description:
        "Expanded to 150+ countries with multi-language support and local data centers.",
    },
    {
      year: "2025",
      title: "AI Integration",
      description:
        "Launched AI-powered features for smart suggestions and automated design assistance.",
    },
  ];

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            About SnapSketch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            We are on a mission to empower creators worldwide with the most
            intuitive and powerful digital sketching platform ever built.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-12">
            <div className="text-center mb-12">
              <Target className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Our Mission
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  At SnapSketch, we believe that great ideas should not be
                  limited by the tools available to express them. That is why we
                  have built a platform that combines the simplicity of
                  traditional sketching with the power of modern technology.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our goal is to break down barriers between imagination and
                  creation, enabling individuals and teams to collaborate
                  seamlessly, iterate quickly, and bring their visions to life
                  with unprecedented ease.
                </p>
              </div>
              <div className="relative">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="aspect-square bg-gray-800/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Built with Passion
                      </h3>
                      <p className="text-gray-400">
                        Every feature crafted with love
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-300 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at SnapSketch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300">
              From a simple idea to a global platform used by millions.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The passionate individuals behind SnapSketch success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-purple-500/50"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 rounded-2xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Join Our Story
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to be part of the future of digital creativity? Start your
              journey with SnapSketch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group backdrop-blur-sm bg-white/10 border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                <span onClick={() => router.push("/Signup")}>Free Trial</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
