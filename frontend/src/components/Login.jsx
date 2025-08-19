import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181516] px-4">
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-10"
        style={{
          backgroundColor: "#23171b", // solid dark background, no gradient
          border: "1.5px solid #9E6263",
          boxShadow: "0 4px 24px 0 #23171b80, 0 1.5px 12px #C6A3B533"
        }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: "#C6A3B5" }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          {/* Email or Username */}
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block mb-1 font-semibold"
              style={{ color: "#C6A3B5", opacity: 0.8 }}
            >
              Email or Username
            </label>
            <input
              id="emailOrUsername"
              type="text"
              name="emailOrUsername"
              placeholder="Enter your email or username"
              value={formData.emailOrUsername}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#3D292B] bg-[#23171b] text-[#C6A3B5] placeholder-[#C6A3B597] focus:outline-none focus:ring-2 focus:ring-[#9E6263] focus:border-[#9E6263] transition shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold"
              style={{ color: "#C6A3B5", opacity: 0.8 }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-[#3D292B] bg-[#23171b] text-[#C6A3B5] placeholder-[#C6A3B597] focus:outline-none focus:ring-2 focus:ring-[#9E6263] focus:border-[#9E6263] transition shadow-sm"
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="text-sm font-semibold"
              style={{ color: "#9E6263" }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
         {/* Login Button with gradient */}
<button
  type="submit"
  className="w-full py-3 rounded-xl font-bold text-white text-lg shadow-md transition
    bg-gradient-to-r from-[#9E6263] via-[#C6A3B5] to-[#643E43] 
    hover:from-[#643E43] hover:to-[#C6A3B5]"
>
  Login
</button>

        </form>
      </div>
    </div>
  );
}
