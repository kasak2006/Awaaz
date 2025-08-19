import { FaHeart, FaShareAlt, FaFlag, FaRegHandshake } from "react-icons/fa";
import { FaHome, FaSearch, FaShieldAlt, FaUser } from 'react-icons/fa';
import React, { useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";


const posts = [
  {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  },
  {
    username: "Anonymous",
    time: "4h",
    tag: "Safety Tips",
    tagColor: "#C6A3B5",
    message:
      "Safety tip: Always trust your instincts. If something feels wrong, it probably is. I wish I had listened to mine sooner. Share your location with trusted friends when going out.",
    likes: 56,
    relate: 23,
    shares: 12
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }, {
    username: "Sarah M.",
    time: "2h",
    tag: "Workplace Issues",
    tagColor: "#9E6263",
    message:
      "I finally found the courage to report the harassment at my workplace. To anyone going through this - you're not alone, and your voice matters. HR took it seriously and action was taken.",
    likes: 24,
    relate: 8,
    shares: 3
  }
];


export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-[#181516] font-sans">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-[#23171b] flex flex-col justify-between  px-4 border-r border-[#643E43]  sticky top-0 h-screen"> */}
      <aside className="sticky top-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43]">
        <div>
          <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">Awaaz</h2>
          {/* <nav className="flex flex-col gap-2">
            <SidebarItem text="Home" icon="🏠" active color="#C6A3B5" />
            <SidebarItem text="Search" icon="🔍" color="#C6A3B5" />
            <SidebarItem text="Legal Aid" icon="🛡️" color="#C6A3B5" />
            <SidebarItem text="Profile" icon="👤" color="#C6A3B5" />
          </nav> */}
          <nav className="flex flex-col gap-2">
            <SidebarItem text="Home" Icon={FaHome} active />
            <SidebarItem text="Search" Icon={FaSearch} />
            <SidebarItem text="Legal Aid" Icon={FaShieldAlt}  />
            <SidebarItem text="Profile" Icon={FaUser} />
          </nav>

        </div>
        <div className="text-[#C6A3B5] text-sm opacity-75 mt-8">Share your story safely</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#181516] px-8 py-10">
        <div className="flex flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#C6A3B5]">Your Feed</h1>
          {/* <button
            className="px-6 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-[#9E6263] via-[#C6A3B5] to-[#643E43] shadow-lg hover:from-[#643E43] hover:to-[#C6A3B5] transition"
          >
            + Post
          </button> */}
        

          <button
            className="px-6 py-2 rounded-xl font-bold text-white bg-[#9E6263] shadow-lg hover:bg-[#643E43] transition"
            onClick={() => setModalOpen(true)}
          >
            + Post
          </button>


        </div>
        <div className="flex flex-col gap-6">
          {posts.map((post, idx) => (
            <FeedCard key={idx} post={post} />
          ))}
        </div>
      </main>

  {modalOpen && (
        <ShareWhisperModal onClose={() => setModalOpen(false)} />
      )}


    </div>
  );
  
  
}

// function SidebarItem({ text, icon, active, color }) {
//   return (
//     <div
//       className={`flex items-center px-4 py-3 rounded-lg transition font-semibold text-lg 
//         ${active ? "bg-[#9E6263] text-white" : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"}`}
//       style={{ color: active ? "#fff" : color }}
//     >
//       <span className="mr-3 text-xl">{icon}</span>
//       {text}
//     </div>
//   );
// }

function SidebarItem({ text, Icon, active }) {
  return (
    <div
      className={`flex items-center px-4 py-3 rounded-lg transition font-semibold text-lg 
        ${active ? "bg-[#9E6263] text-white" : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"}`}
    >
      <Icon className="mr-3 text-xl" />
      {text}
    </div>
  );
}


function FeedCard({ post }) {
  return (
    <div
      className="rounded-2xl bg-[#23171b] shadow-xl p-7 transition hover:ring-2 hover:ring-[#C6A3B5]"
      style={{ border: `1.5px solid ${post.tagColor}` }}
    >
      <div className="flex items-center mb-3">
        {/* Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: post.tagColor, color: "#23171b" }}>
          {post.username === "Anonymous" ? "?" : post.username[0]}
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#C6A3B5]">{post.username}</span>
            <span className="text-xs text-[#9E6263] font-semibold px-3 py-1 rounded-full bg-[#C6A3B5] bg-opacity-10">
              {post.tag}
            </span>
            <span className="text-xs text-gray-400 ml-2">{post.time}</span>
          </div>
        </div>
      </div>
      <div className="text-[#C6A3B5] mb-5 text-base" style={{ lineHeight: "1.7" }}>
        {post.message}
      </div>
      <div className="flex gap-8 items-center mt-3">
        {/* Reactions */}
        <ActionButton icon={<FaHeart />} value={post.likes} label="Support" color="#9E6263" />
        <ActionButton icon={<FaRegHandshake />} value={post.relate} label="I relate" color="#C6A3B5" />
        <ActionButton icon={<FaShareAlt />} value={post.shares} label="Share" color="#643E43" />
        <ActionButton icon={<FaFlag />} value={''} label="Report" color="#C6A3B5" />
      </div>
    </div>
  );
}

function ActionButton({ icon, value, label, color }) {
  return (
    <button className="flex items-center gap-2 group text-[#C6A3B5] hover:text-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
      style={{ backgroundColor: "#181516" }}>
      <span className="text-xl" style={{ color }}>{icon}</span>
      {value !== '' && <span className="font-bold">{value}</span>}
      <span className="text-xs font-semibold ml-1 group-hover:inline hidden">{label}</span>
    </button>
  );
}

function ShareWhisperModal({ onClose }) {
  const [formData, setFormData] = React.useState({
    message: "",
    anonymous: false,
    category: "",
    customCategory: "",
    photo: null,
    location: "",
    date: ""
  });

  const [categoryOther, setCategoryOther] = React.useState(false);
  const photoInputRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (name === "category") {
      setCategoryOther(value === "Other");
      if (value !== "Other") {
        setFormData((prev) => ({ ...prev, customCategory: "" }));
      }
    }
  };

  const triggerPhotoUpload = () => {
    photoInputRef.current.click();
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photo: e.target.files }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log("Submitting:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-[#23171b] rounded-2xl p-8 shadow-xl w-full max-w-lg relative">
        {/* Close button */}
        <button
          className="absolute right-5 top-5 text-2xl text-[#C6A3B5] hover:text-[#9E6263]"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#C6A3B5] mb-6">Share Your Whisper</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            name="message"
            placeholder="What's on your mind? Share your story safely..."
            className="w-full px-4 py-3 rounded-xl border-2 border-[#9E6263] bg-[#181516] text-[#C6A3B5] resize-none focus:outline-none focus:ring-2 focus:ring-[#9E6263]"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
          />

          <label className="flex items-center gap-2 text-[#C6A3B5]">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="accent-[#9E6263]"
            />
            Post anonymously
          </label>

          <div>
            <label className="block mb-2 text-[#C6A3B5] font-semibold">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#3D292B] bg-[#23171b] text-[#C6A3B5] focus:outline-none focus:ring-2 focus:ring-[#9E6263]"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option>Safety Tips</option>
              <option>Workplace Issues</option>
              <option>Legal Help</option>
              <option>Other</option>
            </select>

            {categoryOther && (
              <input
                name="customCategory"
                type="text"
                placeholder="Enter your category"
                value={formData.customCategory}
                onChange={handleChange}
                className="mt-3 w-full px-4 py-2 rounded-xl border border-[#3D292B] bg-[#23171b] text-[#C6A3B5] focus:outline-none focus:ring-2 focus:ring-[#9E6263]"
                required
              />
            )}
          </div>

          <div className="flex justify-between text-[#C6A3B5] text-center">
            <button
              type="button"
              onClick={triggerPhotoUpload}
              className="flex flex-col items-center cursor-pointer hover:text-[#9E6263]"
              aria-label="Upload photo"
            >
              <FaCamera className="text-2xl mb-1" />
              <span className="text-xs select-none">Photo</span>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </button>

            <div className="flex flex-col items-center cursor-text hover:text-[#9E6263]">
              <FaMapMarkerAlt className="text-2xl mb-1" />
              <input
                name="location"
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-24 bg-[#181516] text-[#C6A3B5] border border-transparent border-b-[#9E6263] focus:outline-none focus:border-[#9E6263] text-xs px-1"
              />
            </div>

            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-[#181516] text-[#C6A3B5] border border-[#9E6263] rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#9E6263]"
              aria-label="Select date"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-[#9E6263] hover:bg-[#643E43] transition"
          >
            Share Whisper
          </button>
        </form>
      </div>
    </div>
  );
}

