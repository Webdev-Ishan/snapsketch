import React, { useState } from "react";
import {
  Star,
  Users,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function ReviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const stats = [
    {
      number: "4.9/5",
      label: "Average Rating",
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: "12,000+",
      label: "Happy Customers",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Would Recommend",
      icon: <Heart className="w-6 h-6" />,
    },
    { number: "50+", label: "Countries", icon: <Award className="w-6 h-6" /> },
  ];

  const reviews = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Product Manager",
      company: "StartupXYZ",
      image:
        "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      category: "team",
      text: "SnapSketch has transformed our product planning sessions. The infinite canvas lets us map out complex user journeys, and the real-time collaboration means everyone stays in sync.",
      date: "2 weeks ago",
      verified: true,
    },
    {
      id: 2,
      name: "Lisa Park",
      role: "UX Designer",
      company: "DesignCorp",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      category: "freelancer",
      text: "The drawing tools are incredibly responsive and the export options are perfect for client presentations. Love the professional templates!",
      date: "1 month ago",
      verified: true,
    },
    {
      id: 3,
      name: "David Kim",
      role: "Engineering Manager",
      company: "TechGiant Corp",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      category: "enterprise",
      text: "The enterprise security features give us peace of mind, and the SSO integration made rollout seamless across our 500+ person team.",
      date: "3 weeks ago",
      verified: true,
    },
    {
      id: 4,
      name: "Maria Gonzalez",
      role: "Art Teacher",
      company: "Lincoln High School",
      image:
        "https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      category: "education",
      text: "My students love using SnapSketch for their digital art projects. The interface is intuitive and the collaborative features help them learn from each other.",
      date: "2 months ago",
      verified: true,
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Creative Director",
      company: "BrandStudio",
      image:
        "https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4,
      category: "team",
      text: "Great tool for brainstorming and ideation. The version history feature has saved us multiple times when we needed to revert changes.",
      date: "1 week ago",
      verified: true,
    },
    {
      id: 6,
      name: "Rachel Adams",
      role: "Graphic Designer",
      company: "Freelance",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 5,
      category: "freelancer",
      text: "The affordable pricing and professional features make this perfect for freelancers. Client collaboration has never been easier!",
      date: "3 weeks ago",
      verified: true,
    },
  ];

  const filteredReviews =
    selectedFilter === "all"
      ? reviews
      : reviews.filter((review) => review.category === selectedFilter);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Reviews Filter and Grid */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Real feedback from real users across different industries and use
              cases.
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-purple-400 text-sm">{review.role}</p>
                      <p className="text-gray-400 text-xs">{review.company}</p>
                    </div>
                  </div>
                  <div className="flex">{renderStars(review.rating)}</div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {review.text}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{review.date}</span>
                  <span className="capitalize bg-purple-500/20 px-2 py-1 rounded-full text-purple-300">
                    {review.category}
                  </span>
                </div>
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
              Join Our Happy Users
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to experience what thousands of creators are raving about?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-purple-600 to-cyan-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Give Review</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
