import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaGavel, FaHandsHelping, FaUserPlus, FaSignInAlt, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Awaaz gave me the courage to speak up when I needed it most.",
      author: "Sarah M.",
      role: "Community Member"
    },
    {
      text: "The legal support I received changed everything for my family.",
      author: "Ahmed K.",
      role: "User"
    },
    {
      text: "Finally, a platform that truly listens and takes action.",
      author: "Priya R.",
      role: "Advocate"
    }
  ];

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure & Confidential",
      description: "Your privacy is our priority. Share your story safely."
    },
    {
      icon: FaGavel,
      title: "Expert Legal Aid",
      description: "Connect with qualified legal professionals instantly."
    },
    {
      icon: FaHandsHelping,
      title: "Community Support",
      description: "Join a network of people who understand your journey."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0b0c] via-[#181516] to-[#23171b] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 flex justify-between items-center px-8 py-8">
        <div className="text-5xl font-black text-[#C6A3B5] tracking-wide">
          Awaaz
        </div>
        <div className="flex gap-4">
          <Link 
            to="/login" 
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#C6A3B5] text-[#C6A3B5] font-semibold hover:bg-[#C6A3B5] hover:text-[#181516] transition-all duration-300 overflow-hidden"
          >
            <FaSignInAlt className="text-sm" />
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C6A3B5] to-[#9E6263] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link 
            to="/signup" 
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] text-white font-semibold hover:shadow-2xl hover:shadow-[#9E6263]/30 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <FaUserPlus className="text-sm" />
            <span className="relative z-10">Get Started</span>
            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#C6A3B5] to-[#f4e4ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 py-20 text-center">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#9E6263]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#C6A3B5]/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className={`relative z-10 max-w-4xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#C6A3B5] via-[#9E6263] to-[#f4e4ec] bg-clip-text text-transparent animate-shimmer">
              Your Voice
            </span>
            <br />
            <span className="text-[#C6A3B5]/90">
              Your Power
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#C6A3B5]/80 mb-4 max-w-2xl mx-auto leading-relaxed">
            Empowering communities through secure reporting, expert legal support, and collective action.
          </p>
          
          <p className="text-lg text-[#643E43] mb-12 font-medium">
            Join thousands who've found their voice and secured their futures
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/signup"
              className="group relative px-8 py-4 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] rounded-full font-bold text-lg shadow-2xl hover:shadow-[#9E6263]/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C6A3B5] to-[#f4e4ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              to="/about"
              className="group px-8 py-4 border-2 border-[#C6A3B5] text-[#C6A3B5] rounded-full font-bold text-lg hover:bg-[#C6A3B5] hover:text-[#181516] transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C6A3B5] mb-2">10,000+</div>
              <div className="text-[#643E43] font-medium">Voices Heard</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C6A3B5] mb-2">98%</div>
              <div className="text-[#643E43] font-medium">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C6A3B5] mb-2">24/7</div>
              <div className="text-[#643E43] font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-gradient-to-b from-transparent to-[#23171b]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#C6A3B5]">
            Why Choose Awaaz?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-[#23171b]/80 to-[#2a1d22]/60 border border-[#643E43]/30 backdrop-blur-sm hover:border-[#9E6263]/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-4xl mb-6 text-[#9E6263] transform group-hover:scale-110 transition-transform duration-300">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-[#C6A3B5] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#C6A3B5]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16 text-[#C6A3B5]">
            Stories of Change
          </h2>
          
          <div className="relative h-40 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === currentTestimonial 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex justify-center mb-4">
                  <FaQuoteLeft className="text-2xl text-[#9E6263]" />
                </div>
                <blockquote className="text-2xl text-[#C6A3B5]/90 mb-6 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="text-[#643E43] font-semibold">
                  — {testimonial.author}, {testimonial.role}
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-[#9E6263]' 
                    : 'bg-[#643E43] hover:bg-[#9E6263]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20 bg-gradient-to-r from-[#23171b] via-[#2a1d22] to-[#23171b]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#C6A3B5]">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-xl text-[#C6A3B5]/80 mb-12 max-w-2xl mx-auto">
            Join our community today and take the first step towards justice and empowerment.
          </p>
          
          <Link
            to="/signup"
            className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] rounded-full font-bold text-xl shadow-2xl hover:shadow-[#9E6263]/30 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          >
            <FaUserPlus />
            <span>Get Started Now</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}