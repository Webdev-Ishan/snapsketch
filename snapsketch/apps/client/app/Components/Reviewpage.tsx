"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

type review = {
  id: string;
  Title: string;
  message: string;
  sender: {
    name: string;
    email: string;
    profilepic: string;
    createdAT: string;
  };
};

type backendresponse = {
  success: boolean;
  allreview: review[];
};

const URL = process.env.NEXT_PUBLIC_API_URL;
export default function ReviewsPage() {
  const [reviews, setreviews] = useState<review[]>();

  const fetchReviews = async () => {
    try {
      const response = await axios.get<backendresponse>(
        `${URL}/api/review/allReviews`
      );

      if (response.data && response.data.success) {
        setreviews(response.data.allreview);
        console.log(response.data.allreview);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Unable to fetch data");
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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
            {reviews &&
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 transform hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={review.sender.profilepic}
                        alt={review.sender.name}
                        className="w-12 h-12 rounded-full o border-2 border-purple-500/50"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-white">
                            {review.sender.name}
                          </h4>
                        </div>
                        <p className="text-purple-400 text-sm m-2">
                          {review.sender.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-purple-400 leading-relaxed mb-4">
                    {review.Title}
                  </p>

                  <div className="flex items-center justify-between text-md text-white">
                    <span>{review.message}</span>
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
