"use client";
import React from "react";
import {
  Check,
  Zap,
  Crown,
  Rocket,
  Users,
  Cloud,
  Shield,
  Infinity,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for individuals and small projects",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Up to 3 canvases",
        "Basic drawing tools",
        "PNG/JPG export",
        "Community support",
        "1GB storage",
        "Basic templates",
      ],
      buttonText: "Get Started",
      popular: false,
      gradient: "from-gray-600 to-gray-700",
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Ideal for professionals and growing teams",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Unlimited canvases",
        "Advanced drawing tools",
        "All export formats (PNG, SVG, PDF)",
        "Priority support",
        "50GB storage",
        "Premium templates",
        "Real-time collaboration",
        "Version history",
        "Custom branding",
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      gradient: "from-purple-600 to-cyan-600",
    },
    {
      name: "Enterprise",
      price: "$49",
      period: "per month",
      description: "For large teams and organizations",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Advanced admin controls",
        "SSO integration",
        "Unlimited storage",
        "Custom integrations",
        "24/7 phone support",
        "On-premise deployment",
        "Custom training",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
      popular: false,
      gradient: "from-orange-600 to-red-600",
    },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description:
        "Work together in real-time with live cursors and instant updates",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Reasonable-Price",
      description:
        "Access all the tools in a very reasonable price and for longer durations.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security for your sensitive projects",
    },
    {
      icon: <Infinity className="w-8 h-8" />,
      title: "Unlimited Canvas",
      description:
        "No limits on canvas size or complexity - create without boundaries",
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
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Choose Your
            <br />
            Creative Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            From individual creators to enterprise teams, we have the perfect
            plan to unlock your creative potential.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105 ${
                  plan.popular ? "ring-2 ring-purple-500/50 bg-white/10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4`}
                  >
                    <div className="text-white">{plan.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <div className="flex-shrink-0">
                        <Check className="w-5 h-5 text-green-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-2xl hover:shadow-purple-500/25"
                      : "backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20"
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose SnapSketch?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the most advanced canvas platform with features
              designed for modern creators and teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan at any time?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
              },
              {
                question: "Is there a free trial for paid plans?",
                answer:
                  "Absolutely! We offer a 14-day free trial for both Pro and Enterprise plans. No credit card required to start.",
              },
              {
                question: "What happens to my data if I cancel?",
                answer:
                  "Your data remains accessible for 30 days after cancellation. You can export all your canvases and continue with the free plan if desired.",
              },
              {
                question: "Do you offer educational discounts?",
                answer:
                  "Yes! We provide 50% discounts for students and educators. Contact our support team with your educational email for verification.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 hover:scale-105 transition duration-300 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold mb-3 text-purple-400">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and teams who trust SnapSketch for
              their most important projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={()=>router.push("/Signup")} className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group backdrop-blur-sm bg-white/10 border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Review Us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
