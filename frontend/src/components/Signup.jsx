import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock} from 'react-icons/fa';

export default function SignUpModern() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message || "Registration successful! Redirecting to login...");
      
      // Redirect to login page after successful signup
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const errData = error.response.data.message;
        if (typeof errData === "string") {
          setMessage(errData);
        } else if (typeof errData === "object") {
          const allErrors = Object.values(errData).flat().join(" ");
          setMessage(allErrors);
        } else {
          setMessage("An error occurred. Please try again.");
        }
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0b0c] via-[#181516] to-[#23171b] flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#9E6263]/10 to-transparent rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-[#C6A3B5]/8 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-[#643E43]/12 to-transparent rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-gradient-to-l from-[#9E6263]/15 to-transparent rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#C6A3B5] rounded-full opacity-20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main card with enhanced effects */}
      <div
        className={`relative z-10 max-w-md w-full mx-4 rounded-3xl shadow-2xl p-8 backdrop-blur-xl transition-all duration-1000 transform ${
          mounted ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-8'
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(35, 23, 27, 0.9) 0%, rgba(42, 29, 34, 0.8) 100%)",
          border: "1px solid rgba(158, 98, 99, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(35, 23, 27, 0.8), 0 0 0 1px rgba(198, 163, 181, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >


        {/* Header with animation */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#9E6263]/20 to-[#C6A3B5]/20 mb-4 transform transition-all duration-500 hover:scale-110">
            <FaUser className="text-3xl text-[#C6A3B5]" />
          </div>
          <h2 className="text-3xl font-bold text-[#C6A3B5] mb-2 tracking-tight">
            Join Awaaz
          </h2>
          <p className="text-[#C6A3B5]/70 text-sm">
            Your voice matters. Create your account securely.
          </p>
        </div>

        {/* Form with enhanced styling */}
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <EnhancedInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={FaEnvelope}
            focused={focusedField === "email"}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
          />
          
          <EnhancedInput
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            icon={FaUser}
            focused={focusedField === "username"}
            onFocus={() => setFocusedField("username")}
            onBlur={() => setFocusedField("")}
          />

          {/* Password fields with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              focused={focusedField === "password"}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField("")}
            />
            
            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              focused={focusedField === "confirmPassword"}
              onFocus={() => setFocusedField("confirmPassword")}
              onBlur={() => setFocusedField("")}
            />
          </div>

          {/* Enhanced Submit Button */}
          <button
            type="submit"
            className="group relative w-full py-4 rounded-2xl font-bold text-lg text-white overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#9E6263]/25"
            style={{
              background: "linear-gradient(135deg, #9E6263 0%, #C6A3B5 50%, #643E43 100%)",
            }}
          >
            <span className="relative z-10">Create Your Account</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C6A3B5] to-[#f4e4ec] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {/* Divider with animation */}
       
        </form>

        {/* Enhanced message display */}
        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ${
            message.includes('successful') 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message}
          </div>
        )}

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-[#C6A3B5]/60 text-sm">
            Already have an account?{' '}
            <a href="/login" className="text-[#C6A3B5] font-semibold hover:text-white transition-colors duration-300">
              Log in here
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Enhanced Input Component
function EnhancedInput({ label, name, type, value, onChange, icon: Icon, focused, onFocus, onBlur }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-[#C6A3B5]/80 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Icon className={`text-lg transition-colors duration-300 ${
            focused ? 'text-[#C6A3B5]' : 'text-[#C6A3B5]/50'
          }`} />
        </div>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required
          className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 bg-[#23171b]/80 text-[#C6A3B5] placeholder-[#C6A3B5]/40 font-medium transition-all duration-300 focus:outline-none ${
            focused 
              ? 'border-[#9E6263] shadow-lg shadow-[#9E6263]/20' 
              : 'border-[#643E43]/30 hover:border-[#643E43]/50'
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}

// Enhanced Password Input Component
function PasswordInput({ label, name, value, onChange, showPassword, setShowPassword, focused, onFocus, onBlur }) {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-[#C6A3B5]/80 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <FaLock className={`text-lg transition-colors duration-300 ${
            focused ? 'text-[#C6A3B5]' : 'text-[#C6A3B5]/50'
          }`} />
        </div>
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required
          className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 bg-[#23171b]/80 text-[#C6A3B5] placeholder-[#C6A3B5]/40 font-medium transition-all duration-300 focus:outline-none ${
            focused 
              ? 'border-[#9E6263] shadow-lg shadow-[#9E6263]/20' 
              : 'border-[#643E43]/30 hover:border-[#643E43]/50'
          }`}
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C6A3B5]/50 hover:text-[#C6A3B5] transition-colors duration-300"
        >
          {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
        </button>
      </div>
    </div>
  );
}