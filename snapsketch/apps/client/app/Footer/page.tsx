import { Github, MessageSquare, Sparkles, Twitter } from 'lucide-react'
import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-12 bg-black pt-10 pb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:gap-4 pt-10 justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    SnapSketch
                  </span>
                </div>

                <div className="flex items-center gap-6 space-x-6">
                  <a
                    href="https://github.com/Webdev-Ishan/snapsketch"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://x.com/saini_isha57790"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/10 text-center text-gray-400">
                <p>&copy; 2025 SnapSketch. All rights reserved.</p>
              </div>
            </div>
          </footer>
  )
}

