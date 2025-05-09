import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User,Briefcase, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isLoggedIn = !!user;
  const isAdmin = user?.role === "admin";

  const navLinkClass = (path) =>
    location.pathname === path
      ? "text-blue-600 dark:text-blue-400 font-medium"
      : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors";

  return (
    <header className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Left side - Logo */}
        <Link 
          to="/" 
          className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
        >
          <Briefcase className="text-blue-600 h-6 w-6" />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            JobConnect
          </span>
        </Link>

        {/* Center - Home Link */}
        {/* <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-1 ${navLinkClass("/")}`}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </nav> */}

        {/* Right side - Auth/Admin controls */}
        <div className="flex items-center gap-4">
          {/* Admin Dashboard Button */}
          {isLoggedIn && isAdmin && (
            <Button
              variant="outline"
              onClick={() => navigate("/admin-dashboard")}
              className="border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
            >
              Admin Dashboard
            </Button>
          )}

          {/* Login Button */}
          {!isLoggedIn && (
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
            >
              Login
            </Button>
          )}

          {/* Profile/User Icon */}
          {isLoggedIn && !isAdmin && (
            <Link 
              to="/profile" 
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${navLinkClass("/profile")}`}
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          {/* Signup Icon */}
          {!isLoggedIn && (
            <Link 
              to="/signup" 
              className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${navLinkClass("/signup")}`}
            >
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}