import { Link, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Home,
  MessageCircle,
  HeartHandshake,
  User,
  Menu,
  X,
  LogIn,
  LogOut,
  Heart,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/bible", label: "Bible", icon: BookOpen },
    { href: "/prayers", label: "Prayers", icon: HeartHandshake },
    { href: "/chat", label: "Community Chat", icon: MessageCircle },
    ...(isAuthenticated
      ? [
          { href: "/favorites", label: "My Favorites", icon: Heart },
          { href: "/profile", label: "Profile", icon: User },
        ]
      : []),
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-900/95 to-amber-800/95 backdrop-blur-sm border-b border-amber-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg hidden sm:inline">
              Holy Bible
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-amber-700/60 text-white"
                    : "text-amber-100 hover:bg-amber-700/40 hover:text-white"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name || ""}
                    className="w-8 h-8 rounded-full border border-amber-400"
                  />
                )}
                <span className="text-amber-100 text-sm">
                  {user?.name || "User"}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-amber-100 hover:bg-amber-700/40 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-500 text-white"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-amber-900/95 border-t border-amber-700/50 px-4 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-amber-700/60 text-white"
                  : "text-amber-100 hover:bg-amber-700/40"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-amber-700/50">
            {isAuthenticated ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {user?.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name || ""}
                      className="w-8 h-8 rounded-full border border-amber-400"
                    />
                  )}
                  <span className="text-amber-100 text-sm">
                    {user?.name || "User"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-amber-100 hover:bg-amber-700/40"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white"
                >
                  <LogIn className="w-4 h-4 mr-1" />
                  Sign In to Chat & Save Favorites
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
