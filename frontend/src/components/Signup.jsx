import React, { useState } from "react";

export default function SignUpModern() {
  const [formData, setFormData] = useState({
    gmail: "",
    username: "",
    password: "",
    confirmPassword: "",
    // phone: ""
  });

  // For a subtle panel reveal on mount
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-[#181516] flex items-center justify-center">
      {/* Layered, offset background panels for visual interest */}
      {/* <div className="absolute z-0 w-full h-full flex flex-col items-center">
        <div className="absolute top-16 left-12 w-52 h-52 rounded-3xl" style={{background:'#C6A3B5', opacity:0.12}}/>
        <div className="absolute top-20 right-14 w-40 h-40 rounded-2xl" style={{background:'#9E6263', opacity:0.13}}/>
        <div className="absolute bottom-16 left-28 w-36 h-24 rounded-lg" style={{background:'#fff', opacity:0.07}}/>
        <div className="absolute bottom-10 right-20 w-36 h-28 rounded-lg" style={{background:'#643E43', opacity:0.12}}/>
      </div> */}

      {/* Main card */}
      <div
        className={`relative z-10 max-w-md w-full rounded-2xl shadow-xl p-9 backdrop-blur-2xl transition-all duration-700 ${
          mounted ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          background: "linear-gradient(120deg, #23171b 60%)",
          border: "1.5px solid #9E6263",
          boxShadow: "0 4px 24px 0 #23171b80, 0 1.5px 12px #C6A3B533"
        }}
      >
        <h2
          className="text-3xl font-extrabold tracking-tight text-center mb-2"
          style={{ color: "#C6A3B5", letterSpacing: ".02em" }}
        >
          Sign Up for Awaaz
        </h2>
        <p className="text-center mb-6 text-[#C6A3B5] opacity-80 text-base">
          Secure, private, and stylish onboarding.
        </p>
        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <UIInput label="Gmail" name="gmail" type="email" value={formData.gmail} onChange={e => setFormData({...formData, gmail: e.target.value})}/>
          <UIInput label="Username" name="username" type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})}/>
          {/* <UIInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}/> */}

          {/* Passwords Row */}
          <div className="flex gap-2">
            <UIInput small label="Password" name="password" type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}/>
            <UIInput small label="Confirm" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})}/>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-xl 
            bg-gradient-to-r from-[#9E6263] via-[#C6A3B5] to-[#643E43] 
            text-[#fff] font-bold text-lg shadow-lg
            hover:shadow-xl hover:from-[#643E43] hover:to-[#C6A3B5] transition"
            style={{
              boxShadow: "0 2px 12px #643e439c"
            }}
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-[#C6A3B5] opacity-30"></div>
            <span className="mx-3 text-[#C6A3B5] text-sm opacity-60 font-semibold">OR</span>
            <div className="flex-grow border-t border-[#C6A3B5] opacity-30"></div>
          </div>

          {/* Google Sign-up */}
          <button
            type="button"
            className="w-full flex items-center gap-2 justify-center rounded-xl py-2 border border-[#9E6263] font-bold text-[#C6A3B5] shadow hover:bg-[#23171b] hover:text-[#fff] transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
}

// Animated, visually styled input
function UIInput({ label, name, type, value, onChange, small }) {
  return (
    <div className={small ? "flex-1" : "w-full"}>
      <label
        className="block text-xs tracking-wide mb-1 font-semibold"
        style={{ color: "#C6A3B5", opacity: 0.87, letterSpacing: ".01em" }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 rounded-xl border border-[#3D292B] bg-[#23171b] text-[#C6A3B5] placeholder-[#C6A3B597] font-medium focus:outline-none focus:ring-2 focus:ring-[#9E6263] focus:border-[#9E6263] transition shadow-sm"
      />
    </div>
  );
}

