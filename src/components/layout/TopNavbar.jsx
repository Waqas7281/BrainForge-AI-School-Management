// src/components/layout/TopNavbar.jsx

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Bell,
  User,
  Menu,
  ShoppingCart,
  MessageSquare,
  Building2,
  ChevronDown,
  X,
  LogOut,
  Settings,
  UserCircle,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

export function TopNavbar({ setIsOpen }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInstituteOpen, setIsInstituteOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Student Admission",
      message: "Alice Johnson has been admitted",
      time: "5 min ago",
      read: false,
      type: "student",
    },
    {
      id: 2,
      title: "Fee Payment Received",
      message: "Fee payment of ₹5000 received",
      time: "1 hour ago",
      read: false,
      type: "fee",
    },
    {
      id: 3,
      title: "Exam Schedule Updated",
      message: "Mid-term exams schedule has been published",
      time: "2 hours ago",
      read: true,
      type: "exam",
    },
    {
      id: 4,
      title: "Staff Leave Request",
      message: "John Smith requested leave for 3 days",
      time: "1 day ago",
      read: true,
      type: "leave",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [cartCount] = useState(2);
  const [messageCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);
  const instituteRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (
        instituteRef.current &&
        !instituteRef.current.contains(event.target)
      ) {
        setIsInstituteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    setNotificationCount(notifications.filter((n) => !n.read).length - 1);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "student":
        return "👨‍🎓";
      case "fee":
        return "💰";
      case "exam":
        return "📝";
      case "leave":
        return "🏖️";
      default:
        return "🔔";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:block w-80">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search students, teachers, classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Search Icon - Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {!isFullscreen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 9L4 4m0 0v4m0-4h4m7 0l5-5m0 0v4m0-4h-4m-4 15l5 5m0 0v-4m0 4h-4m-7 0l-5 5m0 0v-4m0 4h4"
                />
              )}
            </svg>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isDarkMode ? "Light Mode" : "Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Institute Name Dropdown */}
          <div className="relative" ref={instituteRef}>
            <button
              onClick={() => setIsInstituteOpen(!isInstituteOpen)}
              className="hidden md:flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  BrainForge School
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform ${isInstituteOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isInstituteOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500">
                    INSTITUTES
                  </p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">BrainForge School (Main)</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">BrainForge Junior Wing</span>
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2 text-blue-600 text-sm hover:bg-gray-50">
                    + Switch Institute
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Messages */}
          <div className="relative" ref={messagesRef}>
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="flex justify-between items-center p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Messages</h3>
                  <button className="text-xs text-blue-600">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        👩
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          Dr. Sarah Wilson
                        </p>
                        <p className="text-xs text-gray-500">
                          New assignment submitted
                        </p>
                        <p className="text-xs text-gray-400 mt-1">2 min ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        👨
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">
                          John Johnson
                        </p>
                        <p className="text-xs text-gray-500">
                          Fee payment query
                        </p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600">
                    View all messages
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="flex justify-between items-center p-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 ${!notif.read ? "bg-blue-50" : ""}`}
                    >
                      <div className="flex gap-3">
                        <div className="text-xl">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100 text-center">
                  <button className="text-sm text-blue-600">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-gray-200 ml-1 sm:ml-2"
            >
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Administrator</p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-blue-100">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 transition-transform hidden sm:block ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@brainforge.edu</p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">My Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Account Settings</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Help & Support</span>
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="bg-white p-4">
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 w-full"
                    autoFocus
                  />
                </div>
              </form>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
