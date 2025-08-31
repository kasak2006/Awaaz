import { FaHeart, FaShareAlt, FaRegHandshake, FaChevronUp, FaUser, FaTags, FaMapMarkerAlt, FaFileAlt, FaSearch, FaLock, FaGlobe } from "react-icons/fa";
import { FaHome, FaShieldAlt } from 'react-icons/fa';
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Dashboard() {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchType, setSearchType] = useState("all");
  
  const POSTS_PER_LOAD = 3; // Number of posts to load each time

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts/');
      setAllPosts(response.data);
      setFilteredPosts(response.data);
      // Initially show first batch of posts
      setDisplayedPosts(response.data.slice(0, POSTS_PER_LOAD));
      setHasMore(response.data.length > POSTS_PER_LOAD);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle search type change
  useEffect(() => {
    if (searchQuery) {
      const filtered = filterPosts(allPosts, searchQuery);
      setFilteredPosts(filtered);
      setDisplayedPosts(filtered.slice(0, POSTS_PER_LOAD));
      setHasMore(filtered.length > POSTS_PER_LOAD);
    }
  }, [searchType, allPosts, searchQuery]);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePostSuccess = (newPost) => {
    const updatedPosts = [newPost, ...allPosts];
    setAllPosts(updatedPosts);
    
    // Update filtered posts based on current search
    if (searchQuery) {
      const filtered = filterPosts(updatedPosts, searchQuery);
      setFilteredPosts(filtered);
      setDisplayedPosts(filtered.slice(0, displayedPosts.length + 1));
    } else {
      setFilteredPosts(updatedPosts);
      setDisplayedPosts([newPost, ...displayedPosts]);
    }
  };

  const filterPosts = (posts, query) => {
    if (!query) return posts;
    
    const lowercaseQuery = query.toLowerCase();
    return posts.filter(post => {
      const isAnonymous = post.username === "Anonymous" || post.anonymous === true;
      
      switch (searchType) {
        case 'user':
          // For username search, exclude anonymous posts
          return !isAnonymous && post.username?.toLowerCase().includes(lowercaseQuery);
        
        case 'category':
          return post.tag?.toLowerCase().includes(lowercaseQuery) ||
                 post.category?.toLowerCase().includes(lowercaseQuery) ||
                 post.custom_category?.toLowerCase().includes(lowercaseQuery);
        
        case 'location':
          return post.location?.toLowerCase().includes(lowercaseQuery);
        
        case 'content':
          return post.message?.toLowerCase().includes(lowercaseQuery);
        
        case 'all':
        default:
          // For username search in 'all', exclude anonymous posts
          const usernameMatch = !isAnonymous && post.username?.toLowerCase().includes(lowercaseQuery);
          
          // For other fields, include all posts (including anonymous)
          const messageMatch = post.message?.toLowerCase().includes(lowercaseQuery);
          const tagMatch = post.tag?.toLowerCase().includes(lowercaseQuery);
          const categoryMatch = post.category?.toLowerCase().includes(lowercaseQuery);
          const customCategoryMatch = post.custom_category?.toLowerCase().includes(lowercaseQuery);
          const locationMatch = post.location?.toLowerCase().includes(lowercaseQuery);
          
          return messageMatch || tagMatch || categoryMatch || customCategoryMatch || locationMatch || usernameMatch;
      }
    });
  };

  const getSearchPlaceholder = () => {
    switch (searchType) {
      case 'user':
        return 'Search by username...';
      case 'category':
        return 'Search by category or tag...';
      case 'location':
        return 'Search by location...';
      case 'content':
        return 'Search story content...';
      case 'all':
      default:
        return 'Search stories, categories, users, or locations...';
    }
  };

  const getSearchTypeText = () => {
    switch (searchType) {
      case 'user':
        return 'by username';
      case 'category':
        return 'by category';
      case 'location':
        return 'by location';
      case 'content':
        return 'by content';
      case 'all':
      default:
        return 'matching your search';
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const filtered = filterPosts(allPosts, query);
    setFilteredPosts(filtered);
    setDisplayedPosts(filtered.slice(0, POSTS_PER_LOAD));
    setHasMore(filtered.length > POSTS_PER_LOAD);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchType("all");
    setFilteredPosts(allPosts);
    setDisplayedPosts(allPosts.slice(0, POSTS_PER_LOAD));
    setHasMore(allPosts.length > POSTS_PER_LOAD);
  };

  const loadMorePosts = () => {
    setLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      const currentLength = displayedPosts.length;
      const postsToUse = searchQuery ? filteredPosts : allPosts;
      const nextBatch = postsToUse.slice(currentLength, currentLength + POSTS_PER_LOAD);
      
      setDisplayedPosts(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + POSTS_PER_LOAD < postsToUse.length);
      setLoading(false);
    }, 800);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex bg-[#181516] font-sans">
      {/* Sidebar */}
      <aside className="sticky top-0 w-64 h-screen bg-[#23171b] flex flex-col justify-between px-4 border-r border-[#643E43]">
        <div>
          <h2 className="text-2xl font-bold text-[#C6A3B5] mb-8 tracking-wider">Awaaz</h2>
          <nav className="flex flex-col gap-2">
            <SidebarItem text="Home" Icon={FaHome} active />
            <SidebarItem text="Legal Aid" Icon={FaShieldAlt} to="/legalaid" />
            <SidebarItem text="Profile" Icon={FaUser} to="/profile" />
          </nav>
        </div>        
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#181516] px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#C6A3B5]">Your Feed</h1>
            <button
              className="px-6 py-2 rounded-xl font-bold text-white bg-[#9E6263] shadow-lg hover:bg-[#643E43] transition"
              onClick={() => setModalOpen(true)}
            >
              + Post
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            {/* Search Type Filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => setSearchType('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  searchType === 'all'
                    ? 'bg-[#9E6263] text-white shadow-lg'
                    : 'bg-[#23171b] text-[#C6A3B5] border border-[#643E43] hover:border-[#9E6263]'
                }`}
              >
                <FaSearch className="text-xs" />
                All
              </button>
              <button
                onClick={() => setSearchType('user')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  searchType === 'user'
                    ? 'bg-[#9E6263] text-white shadow-lg'
                    : 'bg-[#23171b] text-[#C6A3B5] border border-[#643E43] hover:border-[#9E6263]'
                }`}
              >
                <FaUser className="text-xs" />
                User
              </button>
              <button
                onClick={() => setSearchType('category')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  searchType === 'category'
                    ? 'bg-[#9E6263] text-white shadow-lg'
                    : 'bg-[#23171b] text-[#C6A3B5] border border-[#643E43] hover:border-[#9E6263]'
                }`}
              >
                <FaTags className="text-xs" />
                Category
              </button>
              <button
                onClick={() => setSearchType('location')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  searchType === 'location'
                    ? 'bg-[#9E6263] text-white shadow-lg'
                    : 'bg-[#23171b] text-[#C6A3B5] border border-[#643E43] hover:border-[#9E6263]'
                }`}
              >
                <FaMapMarkerAlt className="text-xs" />
                Location
              </button>
              <button
                onClick={() => setSearchType('content')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  searchType === 'content'
                    ? 'bg-[#9E6263] text-white shadow-lg'
                    : 'bg-[#23171b] text-[#C6A3B5] border border-[#643E43] hover:border-[#9E6263]'
                }`}
              >
                <FaFileAlt className="text-xs" />
                Content
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={getSearchPlaceholder()}
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 pl-12 pr-4 rounded-xl border-2 border-[#643E43] bg-[#23171b] text-[#C6A3B5] placeholder-[#C6A3B5]/60 focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-[#C6A3B5]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#C6A3B5]/60 hover:text-[#9E6263] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Search Results Count */}
            {searchQuery && (
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-[#C6A3B5]/70">
                  {filteredPosts.length === 0 ? (
                    `No stories found ${getSearchTypeText()}`
                  ) : filteredPosts.length === 1 ? (
                    `1 story found ${getSearchTypeText()}`
                  ) : (
                    `${filteredPosts.length} stories found ${getSearchTypeText()}`
                  )}
                </div>
                {searchType === 'user' && (
                  <div className="text-xs text-[#C6A3B5]/50 bg-[#23171b] px-3 py-1 rounded-full">
                    Anonymous posts excluded
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Posts Container */}
          <div className="flex flex-col gap-6">
          {displayedPosts.map((post, idx) => (
            <FeedCard key={post.id || idx} post={post} />
          ))}

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMorePosts}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] text-white rounded-xl font-semibold text-lg hover:from-[#C6A3B5] hover:to-[#9E6263] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Loading Stories...
                  </div>
                ) : (
                  'Load More Stories'
                )}
              </button>
            </div>
          )}

          {/* End of Posts Message */}
          {!hasMore && (searchQuery ? filteredPosts.length > 0 : allPosts.length > 0) && (
            <div className="text-center py-8">
              <div className="inline-block px-6 py-3 bg-[#23171b] rounded-xl border border-[#643E43]/30">
                <p className="text-[#C6A3B5] font-medium"> You've reached the end!</p>
                <p className="text-[#C6A3B5]/70 text-sm mt-1">That's all the stories for now. Check back later for more.</p>
              </div>
            </div>
          )}

          {/* No Posts Message */}
          {(searchQuery ? filteredPosts.length === 0 : allPosts.length === 0) && (
            <div className="text-center py-16">
              {searchQuery ? (
                <>
                  <div className="text-6xl mb-6 opacity-30">🔍</div>
                  <p className="text-[#C6A3B5] text-xl font-medium">No stories found</p>
                  <p className="text-[#C6A3B5]/60 text-lg mt-2">Try adjusting your search terms</p>
                  <button
                    onClick={clearSearch}
                    className="mt-4 px-6 py-2 bg-[#9E6263] text-white rounded-lg hover:bg-[#643E43] transition"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-6 opacity-30">📝</div>
                  <p className="text-[#C6A3B5] text-xl font-medium">No stories yet</p>
                  <p className="text-[#C6A3B5]/60 text-lg mt-2">Be the first to share your story!</p>
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-lg" />
        </button>
      )}

      {modalOpen && (
        <ShareWhisperModal
          onClose={() => setModalOpen(false)}
          onPostSuccess={handlePostSuccess}
        />
      )}
    </div>
  );
}

function SidebarItem({ text, Icon, active, to }) {
  const content = (
    <div
      className={`flex items-center px-4 py-3 rounded-lg transition font-semibold text-lg 
        ${active ? "bg-[#9E6263] text-white" : "text-[#C6A3B5] opacity-90 hover:bg-[#643E43] hover:text-white"}`}
    >
      <Icon className="mr-3 text-xl" />
      {text}
    </div>
  );
  if (to) {
    return (
      <Link to={to} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }
  return content;
}

function FeedCard({ post }) {
  const [likes, setLikes] = useState(Number(post.likes) || 0);
  const [relate, setRelate] = useState(Number(post.relate) || 0);

  // Track if user has clicked the buttons
  const [liked, setLiked] = useState(false);
  const [related, setRelated] = useState(false);

  const token = localStorage.getItem('authToken');

  const onLike = async () => {
    if (!token) {
      alert('You must be logged in to like posts');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post.id}/toggle_like/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setLiked(response.data.liked);
      setLikes(response.data.likes);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const onRelate = async () => {
    if (!token) {
      alert('You must be logged in to relate to posts');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${post.id}/toggle_relate/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setRelated(response.data.related);
      setRelate(response.data.relate);
    } catch (error) {
      console.error('Error toggling relate:', error);
    }
  };

  // Determine if the post is anonymous either by username or explicit flag
  const isAnonymous = post.username === "Anonymous" || post.anonymous === true;

  // For avatar display: show '?' for anonymous, else first letter of username or a fallback
  const avatarContent = isAnonymous
    ? "?"
    : (post.username && post.username[0].toUpperCase()) || "";

  // For username display: show "Anonymous" if anonymous, else actual username
  const displayName = isAnonymous ? "Anonymous" : post.username;

  return (
    <div
      className="rounded-2xl bg-[#23171b] shadow-xl p-7 transition hover:ring-2 hover:ring-[#C6A3B5] hover:shadow-2xl"
      style={{ border: `1.5px solid ${post.tagColor || "#9E6263"}` }}
    >
      <div className="flex items-center mb-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: post.tagColor || "#9E6263", color: "#23171b" }}
        >
          {avatarContent}
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#C6A3B5]">{displayName}</span>
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
        <ActionButton icon={<FaHeart />} value={likes} label="Support" color="#9E6263" onClick={onLike} />
        <ActionButton icon={<FaRegHandshake />} value={relate} label="I relate" color="#C6A3B5" onClick={onRelate} />
        <ActionButton icon={<FaShareAlt />} value={post.shares} label="Share" color="#643E43" />
      </div>
    </div>
  );
}

function ActionButton({ icon, value, label, color, onClick }) {
  return (
    <button
      className="flex items-center gap-2 group text-[#C6A3B5] hover:text-white hover:bg-opacity-20 px-3 py-2 rounded-lg transition"
      style={{ backgroundColor: "#181516" }}
      onClick={onClick}
      type="button"
    >
      <span className="text-xl" style={{ color }}>{icon}</span>
      {value !== '' && <span className="font-bold">{value}</span>}
      <span className="text-xs font-semibold ml-1 group-hover:inline hidden">{label}</span>
    </button>
  );
}

function ShareWhisperModal({ onClose, onPostSuccess }) {
  const [formData, setFormData] = React.useState({
    message: "",
    anonymous: false,
    category: "",
    customCategory: "",
    location: "",
    date: ""
  });

  const [categoryOther, setCategoryOther] = React.useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxWords = 500;
  const maxChars = 2000;

  const categories = [
    'Safety Tips',
    'Workplace Issues', 
    'Legal Help',
    'Personal Story',
    'Community Support',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "message") {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      
      if (words.length > maxWords || value.length > maxChars) {
        return; // Don't update if exceeding limits
      }
    }
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You must be logged in to post.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formPayload = new FormData();

      formPayload.append('message', formData.message);
      formPayload.append('anonymous', formData.anonymous);
      formPayload.append('category', formData.category);
      if (formData.category === 'Other') {
        formPayload.append('custom_category', formData.customCategory);
      }
      formPayload.append('location', formData.location);
      if (formData.date) {
        formPayload.append('date', formData.date);
      }

      const response = await axios.post(
        'http://localhost:8000/api/posts/',
        formPayload,
        {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Story shared successfully!');
      if (onPostSuccess) onPostSuccess(response.data);
      onClose();

    } catch (error) {
      alert('Failed to share story. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-[#23171b] rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#643E43]/30 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#C6A3B5] mb-1">Share Your Story</h2>
              <p className="text-[#C6A3B5]/70 text-sm">Your voice matters. Share safely and anonymously.</p>
            </div>
            <button
              className="text-2xl text-[#C6A3B5] hover:text-[#9E6263] transition-colors p-2 hover:bg-[#643E43]/20 rounded-full"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Privacy Toggle */}
            <div className="bg-[#181516] p-4 rounded-xl border border-[#643E43]/30">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition-colors duration-200 ${
                    formData.anonymous ? 'bg-[#9E6263]' : 'bg-[#643E43]'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                      formData.anonymous ? 'translate-x-6' : 'translate-x-0.5'
                    } translate-y-0.5`}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {formData.anonymous ? <FaLock className="text-[#9E6263]" /> : <FaGlobe className="text-[#C6A3B5]" />}
                  <span className="text-[#C6A3B5] font-medium">
                    {formData.anonymous ? 'Post Anonymously' : 'Post with Username'}
                  </span>
                </div>
                <div className="text-xs text-[#C6A3B5]/60 mt-1">
                  {formData.anonymous 
                    ? 'Your identity will be completely hidden' 
                    : 'Your username will be visible to others'}
                </div>
              </label>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="block text-[#C6A3B5] font-semibold">Your Story</label>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Share your story, experience, or thoughts. What's important to you right now?"
                  className="w-full px-4 py-4 rounded-xl border-2 border-[#643E43] bg-[#181516] text-[#C6A3B5] placeholder-[#C6A3B5]/50 resize-none focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
                <div className="absolute bottom-3 right-3 text-xs text-[#C6A3B5]/60">
                  {wordCount}/{maxWords} words • {formData.message.length}/{maxChars} chars
                </div>
              </div>
              {wordCount > maxWords * 0.8 && (
                <div className="text-xs text-[#9E6263] flex items-center gap-1">
                  <span>⚠️</span>
                  Approaching word limit
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <label className="block text-[#C6A3B5] font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#643E43] bg-[#181516] text-[#C6A3B5] focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {categoryOther && (
                <div className="mt-3">
                  <input
                    name="customCategory"
                    type="text"
                    placeholder="Please specify your category..."
                    value={formData.customCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#643E43] bg-[#181516] text-[#C6A3B5] placeholder-[#C6A3B5]/50 focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
                    required
                  />
                </div>
              )}
            </div>

            {/* Location and Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[#C6A3B5] font-semibold">
                  Location <span className="text-xs font-normal text-[#C6A3B5]/60">(optional)</span>
                </label>
                <input
                  name="location"
                  type="text"
                  placeholder="City, State or Region"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#643E43] bg-[#181516] text-[#C6A3B5] placeholder-[#C6A3B5]/50 focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#C6A3B5] font-semibold">
                  Date <span className="text-xs font-normal text-[#C6A3B5]/60">(optional)</span>
                </label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#643E43] bg-[#181516] text-[#C6A3B5] focus:outline-none focus:border-[#9E6263] focus:ring-2 focus:ring-[#9E6263]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.message.trim() || !formData.category}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#9E6263] to-[#C6A3B5] hover:from-[#C6A3B5] hover:to-[#9E6263] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Sharing Your Story...
                </div>
              ) : (
                'Share Story'
              )}
            </button>

            {/* Help Text */}
            <div className="text-center text-xs text-[#C6A3B5]/60 bg-[#181516] p-3 rounded-lg border border-[#643E43]/30">
              <strong>Tip:</strong> Your story can help others feel less alone. 
              All posts are reviewed to ensure a safe community space.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}