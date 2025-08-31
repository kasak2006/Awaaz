import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTimes, FaHome, FaShieldAlt, FaUser, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sidebar Component (unchanged as requested)
function Sidebar({ active }) {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43] z-20">
      <div>
        <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">
          Awaaz
        </h2>
        <nav className="flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center px-4 py-3 rounded-lg font-semibold text-lg ${
              active === "Home"
                ? "bg-[#9E6263] text-white"
                : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"
            }`}
          >
            <FaHome className="mr-3 text-xl" /> Home
          </Link>
          <Link
            to="/legalaid"
            className={`flex items-center px-4 py-3 rounded-lg font-semibold text-lg ${
              active === "Legal Aid"
                ? "bg-[#9E6263] text-white"
                : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"
            }`}
          >
            <FaShieldAlt className="mr-3 text-xl" /> Legal Aid
          </Link>
          <Link
            to="/profile"
            className={`flex items-center px-4 py-3 rounded-lg font-semibold text-lg ${
              active === "Profile"
                ? "bg-[#9E6263] text-white"
                : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"
            }`}
          >
            <FaUser className="mr-3 text-xl" /> Profile
          </Link>
        </nav>
      </div>
    </aside>
  );
}

// Profile Page Component
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    avatar_letter: "",
    date_joined: "",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [message, setMessage] = useState("");

  // New state for user posts
  const [userPosts, setUserPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8000/api/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setProfile({
          username: response.data.username,
          bio: response.data.bio || "",
          avatar_letter: response.data.avatar_letter || "",
          date_joined: response.data.date_joined || "",
        });
        setEditBio(response.data.bio || "");
        setEditAvatar(response.data.avatar_letter || "");
      })
      .catch((error) => {
        console.error(
          "Failed to update profile:",
          error.response ? error.response.data : error
        );
        setMessage("Failed to update profile.");
      });
  }, []);

  // Fetch user's posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setPostsError("You must be logged in to see your stories.");
        setPostsLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:8000/api/posts/user/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setUserPosts(response.data);
        setPostsLoading(false);
      } catch (error) {
        setPostsError("Failed to fetch your stories.");
        setPostsLoading(false);
        console.error(error);
      }
    };
    fetchUserPosts();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("authToken");

    axios
      .patch(
        "http://localhost:8000/api/profile/",
        {
          bio: editBio,
          avatar_letter: editAvatar,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        setProfile(response.data);
        setShowEdit(false);
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        setMessage("Failed to update profile.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181516] via-[#1a1418] to-[#23171b] flex font-sans">
      <Sidebar active="Profile" />
      <main className="ml-64 flex-1 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section with Animation */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#C6A3B5]">Your Profile</h1>
          </div>

          {/* Profile Card without Glowing Effects */}
          <div className="rounded-2xl bg-gradient-to-br from-[#23171b]/80 to-[#1a1418]/80 backdrop-blur-lg border border-[#C6A3B5]/20 p-6 shadow-xl mb-8 transition-all duration-300">
            {/* Profile Header */}
            <div className="flex items-start gap-6 mb-6">
              {/* Avatar without Glow Effect */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#9E6263] to-[#C6A3B5] flex items-center justify-center text-4xl font-bold text-white shadow-lg transition-all duration-300 hover:scale-105">
                {profile.avatar_letter ||
                  (profile.username && profile.username.charAt(0).toUpperCase())}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#C6A3B5] to-[#9E6263] bg-clip-text mb-3">
                  {profile.username}
                </h2>
                <div className="flex items-center gap-2 text-[#C6A3B5]/80 mb-4">
                  <FaCalendarAlt className="text-sm text-[#9E6263]" />
                  <span className="text-sm font-medium">
                    Member since{" "}
                    {profile.date_joined
                      ? new Date(profile.date_joined).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : ""}
                  </span>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setShowEdit(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] text-white rounded-lg font-semibold text-sm hover:from-[#C6A3B5] hover:to-[#9E6263] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaEdit className="text-sm" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Bio Section with Enhanced Styling */}
            <div className="bg-gradient-to-r from-[#1a1418]/60 to-[#23171b]/60 backdrop-blur-sm rounded-xl p-6 border border-[#643E43]/30 shadow-inner">
              <h3 className="text-lg font-bold text-[#C6A3B5] mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#9E6263] to-[#C6A3B5] rounded-full"></div>
                About Me
              </h3>
              <p className="text-[#C6A3B5]/90 leading-relaxed whitespace-pre-wrap text-sm">
                {profile.bio || "Tell us something about yourself..."}
              </p>
            </div>
          </div>

          {/* Your Stories Section - Individual Cards */}
          <section className="rounded-2xl bg-gradient-to-br from-[#23171b]/80 to-[#1a1418]/80 backdrop-blur-lg border border-[#C6A3B5]/20 p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-6 bg-gradient-to-b from-[#9E6263] to-[#C6A3B5] rounded-full"></div>
              <h2 className="text-3xl font-bold text-[#C6A3B5]">Your Stories</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#9E6263]/50 to-transparent"></div>
            </div>

            {postsLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#C6A3B5] border-t-transparent"></div>
                <p className="text-[#C6A3B5] text-lg ml-4">Loading your stories...</p>
              </div>
            ) : postsError ? (
              <div className="text-center py-16">
                <p className="text-red-400 text-lg bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/20">
                  {postsError}
                </p>
              </div>
            ) : userPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-4 opacity-30">📝</div>
                <p className="text-[#C6A3B5] text-lg font-medium">You haven't shared any stories yet.</p>
                <p className="text-[#C6A3B5]/60 text-sm mt-1">Start sharing your experiences with the community!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {userPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="group bg-gradient-to-br from-[#1a1418] to-[#23171b] rounded-xl p-5 border border-[#643E43]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#9E6263]/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-transparent bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] bg-clip-text uppercase tracking-wider">
                          {post.category === "Other" && post.custom_category
                            ? post.custom_category
                            : post.category}
                        </span>
                      </div>
                      <span className="text-xs text-[#C6A3B5]/60 bg-[#23171b]/50 px-2 py-1 rounded-full">
                        {post.created_at
                          ? new Date(post.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : ""}
                      </span>
                    </div>

                    {/* Story Content */}
                    <div className="mb-4">
                      <p className="text-[#C6A3B5] leading-relaxed whitespace-pre-wrap group-hover:text-white transition-colors duration-300 text-sm">
                        {post.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Edit Modal with Enhanced Design */}
        {showEdit && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-gradient-to-br from-[#23171b] to-[#1a1418] rounded-2xl p-8 border border-[#C6A3B5]/30 shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300">
              {/* Close button */}
              <button
                onClick={() => setShowEdit(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#C6A3B5] hover:text-white hover:bg-[#9E6263] rounded-full transition-all duration-200"
              >
                <FaTimes />
              </button>

              <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-[#C6A3B5] to-[#9E6263] bg-clip-text mb-6">
                Edit Profile
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                {/* Bio Field */}
                <div>
                  <label className="block text-[#C6A3B5] font-semibold mb-3 text-sm">Bio</label>
                  <textarea
                    rows={4}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full p-4 rounded-lg bg-[#181516] text-[#C6A3B5] border border-[#643E43] focus:border-[#9E6263] focus:outline-none resize-none transition-colors duration-200 text-sm"
                  />
                </div>

                {/* Avatar Letter Field */}
                <div>
                  <label className="block text-[#C6A3B5] font-semibold mb-3 text-sm">Avatar Letter</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      maxLength={1}
                      value={editAvatar}
                      onChange={(e) => setEditAvatar(e.target.value.toUpperCase())}
                      className="w-16 h-16 text-center text-xl font-bold rounded-full bg-gradient-to-br from-[#9E6263] to-[#C6A3B5] text-white border-2 border-[#643E43] focus:border-[#C6A3B5] focus:outline-none transition-colors duration-200"
                    />
                    <div className="text-[#C6A3B5]/80 flex-1">
                      <p className="font-medium text-sm">Choose a single letter for your avatar</p>
                      <p className="text-xs text-[#C6A3B5]/60 mt-1">This will be displayed as your profile picture</p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] text-white rounded-lg font-semibold text-sm hover:from-[#C6A3B5] hover:to-[#9E6263] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="flex-1 py-3 px-6 bg-transparent text-[#C6A3B5] rounded-lg font-semibold text-sm border-2 border-[#C6A3B5] hover:bg-[#C6A3B5] hover:text-[#23171b] transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Success/Error Message */}
              {message && (
                <div
                  className={`mt-6 p-3 rounded-lg text-center font-semibold text-sm transition-all duration-300 ${
                    message.includes("success")
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30"
                      : "bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}